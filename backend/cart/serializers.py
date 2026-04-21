from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer  # reuse existing (cleaner than manual fields)

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)   # full product data (price, images, discount, etc.)
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'quantity', 
            'selected_size', 'selected_color', 
            'subtotal', 'added_at'
        ]

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_items', 'total_price', 'created_at', 'updated_at']