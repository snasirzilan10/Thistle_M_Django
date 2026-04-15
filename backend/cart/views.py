from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """Add item to cart"""
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_id=product_id,
            defaults={'quantity': quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """Remove item or clear cart"""
        cart = get_object_or_404(Cart, user=request.user)
        item_id = request.data.get('item_id')

        if item_id:
            CartItem.objects.filter(cart=cart, id=item_id).delete()
        else:
            cart.items.all().delete()  # clear entire cart

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)