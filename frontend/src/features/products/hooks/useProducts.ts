import { useQuery } from '@tanstack/react-query';
import type { Product, ProductFilters } from '../types';
import apiClient from '../../../lib/api/client';


export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>('/products/', { params: filters });
      return data;
    },
  });
};

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(`/products/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};