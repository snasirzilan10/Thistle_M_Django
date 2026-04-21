# backend/orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'selected_size', 'selected_color', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    can_be_cancelled = serializers.BooleanField(read_only=True)   # ← new field

    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'status', 'payment_status',
            'phone', 'shipping_address', 'total',
            'created_at', 'updated_at', 'items', 'can_be_cancelled'
        ]
        read_only_fields = ['order_id', 'status', 'payment_status', 'total', 'created_at', 'updated_at', 'can_be_cancelled']