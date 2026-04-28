from django.core.exceptions import ValidationError
from PIL import Image

def validate_product_image(image):
    """Shows clear red warning messages in Django Admin"""
    if image.size > 5 * 1024 * 1024:  # 5 MB
        raise ValidationError("❌ Image is too large. Maximum allowed size is 5 MB.")

    try:
        img = Image.open(image)
        width, height = img.size

        if width < 800 or height < 800:
            raise ValidationError("❌ Image is too small. Minimum size required is 800×800 pixels.")

        allowed_formats = {'JPEG', 'PNG', 'WEBP'}
        if img.format not in allowed_formats:
            raise ValidationError(f"❌ Unsupported format: {img.format}. Only JPEG, PNG, and WebP are allowed.")

        if abs(width - height) > 200:
            raise ValidationError("⚠️ Warning: Image is not square. Square (1:1) images look best on the website.")

    except Exception:
        raise ValidationError("❌ Invalid image file. Please upload a valid JPEG, PNG or WebP image.")