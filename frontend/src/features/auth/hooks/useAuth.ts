import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { LoginCredentials, RegisterData, User } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post('/auth/token/', credentials);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const { data: response } = await apiClient.post<User>('/auth/register/', data);
      return response;
    },
  });
};