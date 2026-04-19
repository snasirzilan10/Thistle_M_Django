import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../lib/api/client';
import { Cart, CartItem } from '../types';

// Temporary safe auth check (until useAuth.ts is fully ready)
const getIsAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token'); // matches your JWT setup
};

export const useCart = () => {
  const isAuthenticated = getIsAuthenticated();

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await apiClient.get<Cart>('/cart/');
      return data;
    },
    enabled: isAuthenticated,           // stops 401 spam & redirect loop
    staleTime: 5 * 60 * 1000,
    placeholderData: {
      id: null,
      items: [],
      total_items: 0,
      total_price: 0,
    } as Cart,
  });

  const cart: Cart = query.data || {
    id: null,
    items: [],
    total_items: 0,
    total_price: 0,
  } as Cart;

  const cartCount = cart.items?.length || 0;

  return {
    ...query,
    cart,
    cartCount,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Omit<CartItem, 'id'>) => {
      const { data } = await apiClient.post('/cart/', item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};