# backend/orders/urls.py
from django.urls import path
from .views import CheckoutView, CancelOrderView, UpdateOrderStatusView

urlpatterns = [
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('cancel/<str:order_id>/', CancelOrderView.as_view(), name='cancel-order'),
    path('status/<str:order_id>/', UpdateOrderStatusView.as_view(), name='update-order-status'),
]