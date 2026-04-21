// frontend/src/features/checkout/hooks/useCheckout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { CART_QUERY_KEY } from '../../cart/hooks/useCart';

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      payment_method: 'cod';
      phone: string;
      shipping_address: string;
    }) => {
      // This exact payload matches what your Django CheckoutView/serializer now requires
      const { data } = await apiClient.post('/api/orders/checkout/', payload);
      return data;
    },
    onSuccess: () => {
      // Clear cart instantly after successful order
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};