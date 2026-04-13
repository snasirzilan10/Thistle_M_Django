from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

# Root health-check endpoint (clean professional root)
def root_view(request):
    return JsonResponse({
        "status": "ok",
        "message": "Thistle_M Backend Root - Server is running successfully",
        "endpoint": "root",
        "version": "1.0"
    })

# Test connection endpoint (distinct from root)
def test_connection(request):
    return JsonResponse({
        "status": "success",
        "message": "Hello from Django - Test Endpoint Working",
        "endpoint": "api/test",
        "version": "1.0"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', test_connection, name='test-connection'),  # Specific path FIRST
    path('', root_view, name='root'),                           # Root path LAST (critical fix)
]