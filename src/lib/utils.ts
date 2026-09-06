export const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export const formatCurrency = (amount: number) => currency.format(amount);
export const rentalDays = (pickupAt: Date, returnAt: Date) => Math.ceil((returnAt.getTime() - pickupAt.getTime()) / 86400000);
