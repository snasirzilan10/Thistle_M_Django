# backend/orders/models.py
from django.db import models
from django.contrib.auth.models import User
from products.models import Product
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_id = models.CharField(max_length=20, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
    phone = models.CharField(max_length=15)
    shipping_address = models.TextField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = "TH" + get_random_string(length=8).upper()
        super().save(*args, **kwargs)

    @property
    def can_be_cancelled(self):
        """Returns True only if order is within 30 minutes and still pending"""
        if self.status != 'pending':
            return False
        time_limit = self.created_at + timedelta(minutes=30)
        return timezone.now() < time_limit

    def __str__(self):
        return f"Order #{self.order_id} - {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    selected_size = models.CharField(max_length=20, blank=True, null=True)
    selected_color = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def subtotal(self):
        if self.price is None:
            return 0
        return self.price * self.quantity

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"