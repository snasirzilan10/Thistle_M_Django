import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { CheckoutData } from '../types';

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (data: CheckoutData) => {
      const { data: response } = await apiClient.post('/orders/create/', data);
      return response;
    },
  });
};