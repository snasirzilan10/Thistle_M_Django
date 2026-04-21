from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import random
import string

# Root + Test (public)
def root_view(request):
    return JsonResponse({"status": "ok", "message": "Thistle_M Backend Root", "version": "1.0"})

def test_connection(request):
    return JsonResponse({"status": "success", "message": "Test Endpoint Working"})

# REGISTER - NOW PUBLIC
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    print(f"🔥 Registration attempt - Username: {username}, Email: {email}")
    
    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        validate_password(password)
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    user.is_active = True
    user.save()
    
    print(f"✅ User created successfully: {username}")
    return Response({
        "message": "User registered successfully",
        "username": user.username,
        "email": user.email
    }, status=status.HTTP_201_CREATED)

# Other public auth endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    try:
        User.objects.get(email=email)
        token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        print(f"🔥 Reset token for {email}: {token}")
        return Response({"message": "Reset token sent (check terminal)", "token": token})
    except User.DoesNotExist:
        return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    email = request.data.get('email')
    token = request.data.get('token')
    new_password = request.data.get('new_password')
    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password reset successful"})
    except:
        return Response({"error": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def email_verify(request):
    email = request.data.get('email')
    token = request.data.get('token')
    try:
        user = User.objects.get(email=email)
        user.is_active = True
        user.save()
        return Response({"message": "Email verified successfully"})
    except:
        return Response({"error": "Invalid verification"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def phone_verify_request(request):
    phone = request.data.get('phone')
    otp = ''.join(random.choices(string.digits, k=6))
    print(f"🔥 PHONE OTP for {phone} → {otp} (copy this)")
    return Response({"message": "OTP sent to phone (check terminal)", "otp": otp})

@api_view(['POST'])
@permission_classes([AllowAny])
def phone_verify_confirm(request):
    return Response({"message": "Phone verified successfully"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/test/', test_connection),
    
    # AUTH ENDPOINTS (now public where needed)
    path('api/auth/token/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/auth/register/', register_view),
    path('api/auth/password-reset/', password_reset_request),
    path('api/auth/password-reset-confirm/', password_reset_confirm),
    path('api/auth/email-verify/', email_verify),
    path('api/auth/phone-verify-request/', phone_verify_request),
    path('api/auth/phone-verify-confirm/', phone_verify_confirm),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    path('', root_view),
]