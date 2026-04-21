// frontend/src/pages/OrdersPage.tsx
import React from 'react';
import { useOrders, useCancelOrder } from '../features/orders/hooks/useOrders';
import { formatCurrency } from '../utils/currency';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const OrdersPage: React.FC = () => {
  const { data: orders = [], isLoading } = useOrders();
  const cancelMutation = useCancelOrder();

  const handleCancel = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelMutation.mutate(orderId, {
        onSuccess: () => toast.success('Order cancelled successfully'),
        onError: (err: any) => toast.error(err?.response?.data?.error || 'Cannot cancel order'),
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 text-white">Loading your orders...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-xl">No orders yet.</p>
      ) : (
        orders.map((order: any) => (
          <div key={order.order_id} className="bg-zinc-900 rounded-3xl p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-2xl font-semibold">Order #{order.order_id}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(order.created_at).toLocaleString('en-US')}
                </p>
                <p className="text-emerald-400 font-medium mt-1">
                  Status: <span className="capitalize">{order.status}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold">{formatCurrency(order.total)}</p>
              </div>
            </div>

            {/* Cancel button - only shows within 30 minutes */}
            {order.can_be_cancelled && (
              <Button
                onClick={() => handleCancel(order.order_id)}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-4 text-lg font-semibold"
              >
                Cancel Order (within 30 minutes)
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;