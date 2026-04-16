import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import { CheckoutData, ShippingAddress } from '../types';

const CheckoutForm = () => {
  const checkoutMutation = useCheckout();
  const [address, setAddress] = useState<ShippingAddress>({
    full_name: '',
    address_line1: '',
    city: '',
    postal_code: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app you would pass full cart data here
    checkoutMutation.mutate({ cart: { items: [], total_items: 0, total_price: 0 }, shipping_address: address, payment_method: 'cod' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Add your form fields here — this is the skeleton */}
      <button type="submit" className="w-full bg-black text-white py-5 rounded-3xl text-lg font-semibold">
        Place Order • Cash on Delivery
      </button>
    </form>
  );
};

export default CheckoutForm;