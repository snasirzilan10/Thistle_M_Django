// frontend/src/features/cart/hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';   // ← fixed: default import (matches your project)
import { Cart } from '../types';

// FAANG-level query key (used by top e-commerce teams)
export const CART_QUERY_KEY = ['cart'] as const;

export const useCart = () => {
  const query = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async (): Promise<Cart> => {
      const { data } = await apiClient.get('/api/cart/');
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Computed cartCount so Navbar.tsx destructuring works without any change
  const cartCount = query.data?.items?.length || 0;   // ← if your backend returns 'cart_items' instead of 'items', change this line only

  return {
    ...query,
    cartCount,   // ← this fixes the TS2339 error in Navbar.tsx
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      product_id: number;
      quantity: number;
      selected_size?: string;
      selected_color?: string;
    }) => {
      const { data } = await apiClient.post('/api/cart/', payload);
      return data;
    },
    onSuccess: () => {
      // instantly refreshes navbar count + CartPage everywhere
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};