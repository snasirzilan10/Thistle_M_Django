import CheckoutForm from '../features/checkout/components/CheckoutForm';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;