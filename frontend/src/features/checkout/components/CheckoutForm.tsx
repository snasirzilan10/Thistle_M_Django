import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import type { ShippingAddress } from '../types';

const CheckoutForm = () => {
  const checkoutMutation = useCheckout();

  // We keep the state but prefix unused setter with _ (TypeScript convention)
  const [address, _setAddress] = useState<ShippingAddress>({
    full_name: '',
    address_line1: '',
    city: '',
    postal_code: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkoutMutation.mutate({
      cart: { items: [], total_items: 0, total_price: 0 },
      shipping_address: address,
      payment_method: 'cod' as const,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Real form fields will be added in next steps */}
      <button 
        type="submit" 
        className="w-full bg-black text-white py-5 rounded-3xl text-lg font-semibold"
      >
        Place Order • Cash on Delivery
      </button>
    </form>
  );
};

export default CheckoutForm;