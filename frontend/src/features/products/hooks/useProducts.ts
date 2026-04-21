import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api/client';
import { Product } from '../types';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/api/products/');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductDetail = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/api/products/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};