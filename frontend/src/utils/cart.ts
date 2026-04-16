// frontend/src/utils/cart.ts
import type { CartItem } from '../features/cart/types';

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.product.final_price * item.quantity;
  }, 0);
};

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const getCartSummary = (items: CartItem[]) => {
  const subtotal = calculateCartSubtotal(items);
  const totalItems = calculateTotalItems(items);
  return {
    subtotal,
    totalItems,
    total: subtotal, // shipping / tax logic can be added later
  };
};