# backend/orders/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer

class CheckoutView(APIView):
    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        if not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user,
            status='pending',
            payment_status='unpaid',
            phone=request.data.get('phone'),
            shipping_address=request.data.get('shipping_address'),
            total=cart.total_price,
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                selected_size=getattr(item, 'selected_size', None),
                selected_color=getattr(item, 'selected_color', None),
                price=item.product.final_price
            )

        cart.items.all().delete()

        serializer = OrderSerializer(order)
        return Response({"message": "Order placed successfully", "order_id": order.order_id, **serializer.data}, status=status.HTTP_201_CREATED)


class CancelOrderView(APIView):
    def post(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        if not order.can_be_cancelled:
            return Response({"error": "Order cannot be cancelled after 30 minutes"}, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'cancelled'
        order.save()
        serializer = OrderSerializer(order)
        return Response({"message": "Order cancelled successfully", **serializer.data}, status=status.HTTP_200_OK)


class UpdateOrderStatusView(APIView):
    def patch(self, request, order_id):
        try:
            order = Order.objects.get(order_id=order_id, user=request.user)
            new_status = request.data.get('status')
            if new_status in ['pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled']:
                order.status = new_status
                if new_status == 'delivered':
                    order.payment_status = 'paid'
                order.save()
                return Response({"message": f"Order status updated to {new_status}", "payment_status": order.payment_status})
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)