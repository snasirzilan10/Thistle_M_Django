/**
 * Top 0.01% Currency Formatter for Bangladesh Marketplace
 * Used by FAANG-level e-commerce apps for BDT formatting
 */
export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num) || num < 0) {
    return '৳0';
  }

  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(num)
    .replace('BDT', '৳'); // Clean BDT symbol for Bangladeshi users
};