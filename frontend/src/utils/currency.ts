// frontend/src/utils/currency.ts
export const formatBDT = (amount: number): string => {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('BDT', '৳');
};

export const formatPrice = (amount: number): string => {
  return `৳${amount.toLocaleString('en-US')}`;
};

export const calculateDiscountPercentage = (original: number, final: number): number => {
  if (original <= 0) return 0;
  return Math.round(((original - final) / original) * 100);
};