// frontend/src/pages/ProductDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../features/products/hooks/useProducts';
import { useAddToCart } from '../features/cart/hooks/useCart';
import { useCart } from '../features/cart/hooks/useCart';        // ← added for live refetch
import { formatCurrency } from '../utils/currency';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProductDetail(productId);
  const addToCartMutation = useAddToCart();                    // ← your original hook style
  const { refetch: refetchCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.available_sizes?.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.available_colors?.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }

    addToCartMutation.mutate(
      {
        product_id: product.id,
        quantity,
        selected_size: selectedSize || undefined,
        selected_color: selectedColor || undefined,
      },
      {
        onSuccess: () => {
          refetchCart();                                 // ← instantly updates cart count & data
          alert(`${product.name} added to cart successfully!`); // you can replace with toast later
          navigate('/cart');                             // ← redirects to cart page
        },
        onError: (err: any) => {
          alert(err?.response?.data?.error || 'Failed to add to cart. Please try again.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl font-medium">Loading premium product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center min-h-screen bg-black text-white">
        <p className="text-3xl text-red-500 font-medium mb-8">Sorry, product not found</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-4 bg-white text-black rounded-3xl font-medium hover:bg-gray-200 transition-colors"
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-black text-white">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2">{product.name}</h1>
          {product.category_name && (
            <p className="text-gray-400 text-xl mb-6">{product.category_name}</p>
          )}

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-5xl font-semibold">
              {formatCurrency(parseFloat(product.final_price))}
            </span>
            {product.price && parseFloat(product.price) > parseFloat(product.final_price) && (
              <span className="text-3xl text-gray-500 line-through">
                {formatCurrency(parseFloat(product.price))}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              {product.description}
            </p>
          )}

          {/* Sizes */}
          {product.available_sizes?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-medium mb-4 text-lg">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.available_sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border rounded-2xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'border-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.available_colors?.length > 0 && (
            <div className="mb-12">
              <h3 className="font-medium mb-4 text-lg">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.available_colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border rounded-2xl font-medium capitalize transition-all ${
                      selectedColor === color
                        ? 'bg-white text-black border-white'
                        : 'border-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-5">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-24 text-center border border-gray-700 bg-transparent rounded-3xl py-4 text-xl focus:outline-none focus:border-white"
            />
            <button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="flex-1 py-5 text-xl font-semibold bg-white text-black rounded-3xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addToCartMutation.isPending ? 'ADDING TO CART...' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;