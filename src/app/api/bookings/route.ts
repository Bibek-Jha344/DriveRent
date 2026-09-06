import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { createBooking } from '@/services/bookingService';

const bookingSchema = z.object({ vehicleId: z.string().uuid(), driverId: z.string().uuid().optional(), pickupLocation: z.string().min(2).max(100), returnLocation: z.string().min(2).max(100), pickupAt: z.coerce.date(), returnAt: z.coerce.date() });
export async function POST(request: Request) { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); const parsed = bookingSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: 'Please check the booking details.', details: parsed.error.flatten() }, { status: 400 }); try { const booking = await createBooking({ ...parsed.data, userId: user.id }); return NextResponse.json({ data: booking }, { status: 201 }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create booking.' }, { status: 409 }); } }
export async function GET() { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); const { prisma } = await import('@/lib/prisma'); const bookings = await prisma.booking.findMany({ where: { userId: user.id }, include: { vehicle: true, payment: true }, orderBy: { createdAt: 'desc' } }); return NextResponse.json({ data: bookings }); }
