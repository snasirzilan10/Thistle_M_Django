// frontend/src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../features/cart/hooks/useCart';
import { useCheckout } from '../features/checkout/hooks/useCheckout';
import { formatCurrency } from '../utils/currency';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading: cartLoading } = useCart();
  const checkoutMutation = useCheckout();

  // Form state for required fields
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handlePlaceOrder = () => {
    if (!cart || cart.items.length === 0) return;
    if (!phone || !shippingAddress) {
      alert('Shipping address and phone are required');
      return;
    }

    checkoutMutation.mutate(
      {
        payment_method: 'cod',
        phone: phone,
        shipping_address: shippingAddress,
      },
      {
        onSuccess: () => {
          alert(`✅ Order placed successfully!\nCash on Delivery • Thank you!`);
          navigate('/orders');
        },
        onError: (err: any) => {
          alert(err?.response?.data?.error || 'Failed to place order. Please try again.');
        },
      }
    );
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl font-medium">Loading checkout...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center min-h-screen bg-black text-white">
        <p className="text-3xl font-medium mb-8">Your cart is empty</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-4 bg-white text-black rounded-3xl font-medium hover:bg-gray-200 transition-colors"
        >
          ← Back to Shop
        </button>
      </div>
    );
  }

  const total = cart.items.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.product.final_price) * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
      {/* Header - matches your screenshot */}
      <div className="flex justify-between items-center mb-12">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-2xl font-semibold text-2xl">
          Checkout
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Order Summary */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-10">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          {cart.items.map((item: any) => (
            <div key={item.id} className="flex justify-between py-4 border-b border-zinc-800 last:border-0">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-400">
                  {item.selected_size && `Size: ${item.selected_size}`} • 
                  {item.selected_color && ` Color: ${item.selected_color}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ৳{parseFloat(item.product.final_price) * item.quantity}
                </p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-2xl font-semibold mt-8 pt-6 border-t border-zinc-700">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Shipping Details - NEW */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-10">
          <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-400">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full bg-transparent border border-gray-700 rounded-3xl px-6 py-4 text-white focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Shipping Address</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="House no, Road no, Area, City"
              rows={3}
              className="w-full bg-transparent border border-gray-700 rounded-3xl px-6 py-4 text-white focus:border-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Place Order Button - exactly matches your screenshot */}
        <button
          onClick={handlePlaceOrder}
          disabled={checkoutMutation.isPending || !phone || !shippingAddress}
          className="w-full py-6 text-2xl font-semibold bg-black text-white border-2 border-white rounded-3xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {checkoutMutation.isPending ? (
            'Placing Order...'
          ) : (
            <>
              Place Order <span className="text-blue-400">• Cash on Delivery</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          You will pay when the product is delivered • Free shipping on orders over ৳2000
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;