import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import type { ShippingAddress } from '../types';

const CheckoutForm = () => {
  const checkoutMutation = useCheckout();

  // _setAddress = unused for now (real form fields coming in next steps)
  const [address, _setAddress] = useState<ShippingAddress>({
    full_name: '',
    address_line1: '',
    city: '',
    postal_code: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fixed: Construct EXACT payload shape that useCheckout mutation expects
    const payload = {
      payment_method: 'cod' as const,
      phone: address.phone,
      shipping_address: `${address.full_name}, ${address.address_line1}, ${address.city} - ${address.postal_code}`,
    };

    checkoutMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Real form fields (full_name, address, city, etc.) will be added in next steps */}
      <button 
        type="submit" 
        className="w-full bg-black text-white py-5 rounded-3xl text-lg font-semibold"
        disabled={checkoutMutation.isPending}
      >
        {checkoutMutation.isPending ? 'Processing Order...' : 'Place Order • Cash on Delivery'}
      </button>
    </form>
  );
};

export default CheckoutForm;