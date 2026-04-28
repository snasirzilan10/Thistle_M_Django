from django.contrib import admin
from django import forms
from .models import Category, Product
from .validators import validate_product_image   # ← For red warning messages

# ==================== CUSTOM FORM (shows red errors in admin) ====================
class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def clean_image(self):
        image = self.cleaned_data.get('image')
        if image:
            validate_product_image(image)
        return image


# ==================== ADMIN CLASSES ====================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm                    # ← Enables red validation messages
    list_display = ['name', 'category', 'final_price', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}