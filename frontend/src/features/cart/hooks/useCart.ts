import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { Cart, CartItem } from '../types';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await apiClient.get<Cart>('/cart/');
      return data;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<CartItem, 'id'>) => {
      const { data } = await apiClient.post('/cart/', item);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
};