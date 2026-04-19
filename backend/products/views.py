from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.db.models import Prefetch
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# ===================================================================
# PUBLIC PRODUCT CATALOG VIEWS (No authentication required)
# ===================================================================

class ProductListView(generics.ListAPIView):
    """
    Public endpoint: Returns all premium men's apparel products.
    Used by homepage, shop page, and any public browsing.
    """
    permission_classes = [AllowAny]          # ← THIS IS THE FIX
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Top 0.01% optimization: prefetch related data + only active products
        return Product.objects.filter(is_active=True).select_related('category').prefetch_related(
            Prefetch('category', queryset=Category.objects.all())
        ).order_by('-created_at')


class ProductDetailView(generics.RetrieveAPIView):
    """
    Public endpoint: Single product detail with sizes/colors/images.
    Used by ProductDetailPage.
    """
    permission_classes = [AllowAny]          # ← THIS IS THE FIX
    serializer_class = ProductSerializer
    lookup_field = 'id'                      # matches React route /product/:id

    def get_queryset(self):
        # Same optimization for detail view
        return Product.objects.filter(is_active=True).select_related('category')


# Optional: Category list (public) - useful for filters later
class CategoryListView(generics.ListAPIView):
    """
    Public endpoint: All categories for shop filters.
    """
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('name')