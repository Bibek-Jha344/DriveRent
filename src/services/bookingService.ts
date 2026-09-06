import { BookingStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { rentalDays } from '@/lib/utils';

const blockingStatuses: BookingStatus[] = [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.ACTIVE];
export function calculatePrice(dailyPrice: number, pickupAt: Date, returnAt: Date, driver = false) {
  if (pickupAt.getTime() < Date.now()) throw new Error('Pickup date cannot be in the past.');
  const days = rentalDays(pickupAt, returnAt);
  if (days < 1) throw new Error('Return date must be after pickup date.');
  const baseAmount = days * dailyPrice;
  const driverFee = driver ? days * 500 : 0;
  const taxAmount = Math.round((baseAmount + driverFee) * 0.12);
  return { rentalDays: days, baseAmount, driverFee, taxAmount, discountAmount: 0, totalAmount: baseAmount + driverFee + taxAmount };
}
const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
  PENDING: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED, BookingStatus.REJECTED],
  CONFIRMED: [BookingStatus.ACTIVE, BookingStatus.CANCELLED],
  ACTIVE: [BookingStatus.COMPLETED],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: []
};
export function canTransition(from: BookingStatus, to: BookingStatus) { return allowedTransitions[from].includes(to); }
export async function updateBookingStatus(id: string, status: BookingStatus, userId: string, isStaff = false) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking || (!isStaff && booking.userId !== userId)) throw new Error('You do not have permission to modify this booking.');
  if (!canTransition(booking.status, status)) throw new Error(`Cannot move booking from ${booking.status} to ${status}.`);
  return prisma.booking.update({ where: { id }, data: { status }, include: { vehicle: true, payment: true } });
}
export async function createBooking(input: { userId: string; vehicleId: string; driverId?: string; pickupLocation: string; returnLocation: string; pickupAt: Date; returnAt: Date }) {
  return prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({ where: { id: input.vehicleId } });
    if (!vehicle || vehicle.status !== 'AVAILABLE') throw new Error('Vehicle is no longer available.');
    const overlap = await tx.booking.findFirst({ where: { vehicleId: input.vehicleId, status: { in: blockingStatuses }, pickupAt: { lt: input.returnAt }, returnAt: { gt: input.pickupAt } } });
    if (overlap) throw new Error('Selected dates overlap with an existing booking.');
    const maintenance = await tx.maintenance.findFirst({ where: { vehicleId: input.vehicleId, status: { in: ['SCHEDULED', 'IN_PROGRESS'] }, startAt: { lt: input.returnAt }, endAt: { gt: input.pickupAt } } });
    if (maintenance) throw new Error('Vehicle is scheduled for maintenance during these dates.');
    let driverFee = false;
    if (input.driverId) {
      const driver = await tx.driver.findFirst({ where: { id: input.driverId, status: 'AVAILABLE' } });
      if (!driver) throw new Error('Selected driver is unavailable.');
      driverFee = true;
    }
    const price = calculatePrice(vehicle.dailyPrice, input.pickupAt, input.returnAt, driverFee);
    return tx.booking.create({ data: { ...input, ...price, payment: { create: { amount: price.totalAmount, method: 'ONLINE' } } }, include: { vehicle: true, payment: true } });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
