from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from products.models import Product
from .models import Cart, CartItem
from .serializers import CartSerializer

class CartView(APIView):
    permission_classes = [AllowAny]   # ← Guests can now add to cart

    def get(self, request):
        """Get cart (works for both logged-in and guest users)"""
        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
        else:
            # Guest cart - you can later improve with session key if needed
            cart, _ = Cart.objects.get_or_create(user=None)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """Add item to cart (guest friendly)"""
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        selected_size = request.data.get('selected_size')
        selected_color = request.data.get('selected_color')

        product = get_object_or_404(Product, id=product_id)

        # Get or create cart for guest or logged-in user
        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
        else:
            cart, _ = Cart.objects.get_or_create(user=None)

        # Add or update item
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            selected_size=selected_size,
            selected_color=selected_color,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """Remove item or clear cart"""
        if request.user.is_authenticated:
            cart = get_object_or_404(Cart, user=request.user)
        else:
            cart = get_object_or_404(Cart, user=None)
        
        item_id = request.data.get('item_id')
        if item_id:
            CartItem.objects.filter(cart=cart, id=item_id).delete()
        else:
            cart.items.all().delete()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)