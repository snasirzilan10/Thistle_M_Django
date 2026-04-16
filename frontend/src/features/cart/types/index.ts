import { Product } from '../../products/types';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}