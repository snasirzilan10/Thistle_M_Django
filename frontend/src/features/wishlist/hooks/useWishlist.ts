import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { WishlistItem } from '../types';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const { data } = await apiClient.get<WishlistItem[]>('/wishlist/');
      return data;
    },
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await apiClient.post('/wishlist/toggle/', { product_id: productId });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });
};