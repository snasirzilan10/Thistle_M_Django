import React, { useEffect, useState } from 'react';
import { useProductDetail } from '../hooks/useProducts';
import { useAddToCart } from '../../cart/hooks/useCart';
import { useCart } from '../../cart/hooks/useCart';
import { formatCurrency } from '../../../utils/currency';
import { getFullImageUrl } from '../../../utils/image';
import QuantitySelector from '../../../components/ui/QuantitySelector';

interface ProductQuickViewModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const { data: product, isLoading, error } = useProductDetail(productId);
  const addToCartMutation = useAddToCart();
  const { refetch: refetchCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Close on ESC + backdrop click
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.available_sizes?.length && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.available_colors?.length && !selectedColor) {
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
          refetchCart();
          alert(`${product.name} added to cart!`);
          onClose();
        },
        onError: (err: any) => {
          alert(err?.response?.data?.error || 'Failed to add to cart');
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white w-[95%] max-w-7xl h-[95vh] mx-auto shadow-2xl flex flex-col overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b bg-white z-10">
          <h2 className="text-2xl font-semibold">Quick View</h2>
          <button
            onClick={onClose}
            className="text-4xl leading-none text-gray-400 hover:text-black transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* LEFT: FULL-SCREEN BACKGROUND IMAGE */}
          <div
            className="flex-1 bg-black relative"
            style={{
              backgroundImage: `url(${getFullImageUrl(product?.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* RIGHT: SCROLLABLE INFO */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col overflow-auto bg-white">
            {isLoading && <p className="text-center py-12">Loading premium product...</p>}
            {error && <p className="text-red-500 py-12">Failed to load product</p>}

            {!isLoading && product && (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>Men&apos;s Apparel</span>
                  <span className="text-gray-300">/</span>
                  <span className="font-medium text-black">{product.category_name || 'Category'}</span>
                </div>

                <h1 className="f-mont-eb text-4xl leading-tight text-black mb-2">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-semibold text-black">
                    {formatCurrency(parseFloat(product.final_price))}
                  </span>
                  {product.price && parseFloat(product.price) > parseFloat(product.final_price) && (
                    <span className="text-3xl text-gray-400 line-through">
                      {formatCurrency(parseFloat(product.price))}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-gray-600 leading-relaxed mb-10">
                    {product.description}
                  </p>
                )}

                {product.available_sizes?.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Size</h3>
                      <a href="#" className="text-sm text-blue-600 hover:underline">Size Guide</a>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.available_sizes.map((size: string) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-sm font-medium transition-all ${
                            selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.available_colors?.length > 0 && (
                  <div className="mb-10">
                    <h3 className="font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.available_colors.map((color: string) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-6 py-3 border rounded-2xl font-medium capitalize transition-all ${
                            selectedColor === color ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-auto">
                  <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
                  <button
                    onClick={handleAddToCart}
                    disabled={addToCartMutation.isPending}
                    className="flex-1 py-5 text-xl font-semibold bg-black text-white rounded-3xl hover:bg-gray-900 transition-colors disabled:opacity-50"
                  >
                    {addToCartMutation.isPending ? 'ADDING...' : 'ADD TO CART'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;