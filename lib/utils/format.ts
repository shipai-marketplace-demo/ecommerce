export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal * taxRate;
};

export const calculateShipping = (subtotal: number): number => {
  if (subtotal >= 100) return 0; // Free shipping over $100
  if (subtotal >= 50) return 5.99;
  return 9.99;
};

export const calculateTotal = (subtotal: number): { tax: number; shipping: number; total: number } => {
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return { tax, shipping, total };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
