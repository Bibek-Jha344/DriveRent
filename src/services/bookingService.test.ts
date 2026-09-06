import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrice, canTransition } from './bookingService';

test('calculates rental days, driver fee, tax, and total', () => {
  const pickup = new Date(Date.now() + 86400000);
  const returned = new Date(pickup.getTime() + 4 * 86400000);
  assert.deepEqual(calculatePrice(3000, pickup, returned, true), { rentalDays: 4, baseAmount: 12000, driverFee: 2000, taxAmount: 1680, discountAmount: 0, totalAmount: 15680 });
});

test('rejects invalid booking status transitions', () => {
  assert.equal(canTransition('PENDING', 'CONFIRMED'), true);
  assert.equal(canTransition('PENDING', 'COMPLETED'), false);
  assert.equal(canTransition('COMPLETED', 'CANCELLED'), false);
});
