import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/api/client';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const login = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const { data } = await api.post('/api/auth/token/', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const register = useMutation({
    mutationFn: async (userData: { username: string; email: string; password: string }) => {
      const { data } = await api.post('/api/auth/register/', userData);
      return data;
    },
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const requestPasswordReset = useMutation({
    mutationFn: (email: string) => api.post('/api/auth/password-reset/', { email }),
  });

  const confirmPasswordReset = useMutation({
    mutationFn: (data: { email: string; token: string; new_password: string }) =>
      api.post('/api/auth/password-reset-confirm/', data),
  });

  const verifyEmail = useMutation({
    mutationFn: (data: { email: string; token: string }) =>
      api.post('/api/auth/email-verify/', data),
  });

  const requestPhoneOTP = useMutation({
    mutationFn: (phone: string) => api.post('/api/auth/phone-verify-request/', { phone }),
  });

  const verifyPhone = useMutation({
    mutationFn: (data: { phone: string; otp: string }) =>
      api.post('/api/auth/phone-verify-confirm/', data),
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  return {
    isAuthenticated,
    login,
    register,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
    verifyEmail,
    requestPhoneOTP,
    verifyPhone,
  };
};