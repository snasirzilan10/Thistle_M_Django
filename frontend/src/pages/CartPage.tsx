import { useCart } from '../features/cart/hooks/useCart';
import CartItemComponent from '../features/cart/components/CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { data: cart, isLoading } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
        
        <div className="bg-white rounded-3xl shadow-sm p-8">
          {cart?.items.map(item => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={() => {}} // connect later
              onRemove={() => {}} // connect later
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center text-2xl font-semibold">
          <span>Total</span>
          <span>৳{cart?.total_price || 0}</span>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="mt-10 w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;