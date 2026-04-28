// frontend/src/features/cart/hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { Cart } from '../types';

// FAANG-level query key
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

  const cartCount = query.data?.items?.length || 0;

  return {
    ...query,
    cartCount,
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
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

// NEW: Remove from cart hook (required by the unified modal)
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: number) => {
      const { data } = await apiClient.delete('/api/cart/', {
        data: { item_id: itemId }
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};