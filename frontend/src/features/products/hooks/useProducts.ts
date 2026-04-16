import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { Product, ProductFilters } from '../types';

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