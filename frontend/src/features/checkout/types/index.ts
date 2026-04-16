import { Cart } from '../../cart/types';

export interface ShippingAddress {
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  phone: string;
}

export interface CheckoutData {
  cart: Cart;
  shipping_address: ShippingAddress;
  payment_method: 'cod' | 'card';
}