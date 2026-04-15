from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Root health-check endpoint
def root_view(request):
    return JsonResponse({
        "status": "ok",
        "message": "Thistle_M Backend Root - Server is running successfully",
        "endpoint": "root",
        "version": "1.0"
    })

# Test connection endpoint
def test_connection(request):
    return JsonResponse({
        "status": "success",
        "message": "Hello from Django - Test Endpoint Working",
        "endpoint": "api/test",
        "version": "1.0"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/test/', test_connection, name='test-connection'),
    
    # JWT Authentication Endpoints (new)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('', root_view, name='root'),   # MUST be last
]