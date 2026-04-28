import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProducts';
import { useAddToCart } from '../../cart/hooks/useCart';
import { useCart } from '../../cart/hooks/useCart';
import { useRemoveFromCart } from '../../cart/hooks/useCart';
import { formatCurrency } from '../../../utils/currency';
import { getFullImageUrl } from '../../../utils/image';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const navigate = useNavigate();
  const { data: product, isLoading: productLoading } = useProductDetail(productId);
  const addToCartMutation = useAddToCart();
  const { data: cart, isLoading: cartLoading, refetch: refetchCart } = useCart();
  const removeMutation = useRemoveFromCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'product' | 'cart'>('product');
  const [isSliding, setIsSliding] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const prevViewMode = useRef<'product' | 'cart'>('product');

  // Reset to product view when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewMode('product');
      prevViewMode.current = 'product';
    }
  }, [isOpen]);

  // GSAP Slide Animation (runs ONLY when viewMode actually changes)
  useGSAP(() => {
    if (!sliderRef.current || viewMode === prevViewMode.current) return;

    const direction = viewMode === 'cart' ? -100 : 0;

    gsap.to(sliderRef.current, {
      xPercent: direction,
      duration: 1,
      ease: 'power3.out',
      onStart: () => setIsSliding(true),
      onComplete: () => {
        setIsSliding(false);
        prevViewMode.current = viewMode;
      },
    });
  }, [viewMode]);

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
          setViewMode('cart');
        },
        onError: (err: any) => {
          alert(err?.response?.data?.error || 'Failed to add to cart');
        },
      }
    );
  };

  const handleClose = () => {
    setViewMode('product');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        className="bg-white w-[95%] max-w-7xl h-[95vh] mx-auto shadow-2xl flex flex-col overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b bg-white z-10">
          <h2 className="text-2xl font-semibold">
            {viewMode === 'product' ? 'Quick View' : 'Your Cart'}
          </h2>
          <button
            onClick={handleClose}
            className="text-4xl leading-none text-gray-400 hover:text-black transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* LEFT: FIXED IMAGE */}
          <div
            className="flex-1 bg-black relative"
            style={{
              backgroundImage: `url(${getFullImageUrl(product?.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* RIGHT: SLIDABLE PANEL */}
          <div 
            className={`flex-1 flex flex-col overflow-hidden bg-white relative ${isSliding ? 'overflow-hidden' : 'overflow-auto'}`}
          >
            <div 
              ref={sliderRef}
              className="flex h-full w-[200%]"
            >
              {/* PRODUCT VIEW */}
              <div className="w-1/2 flex flex-col overflow-auto p-8 lg:p-12">
                {productLoading && <p className="text-center py-12">Loading product...</p>}
                {!productLoading && product && (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>Men&apos;s Apparel</span>
                      <span className="text-gray-300">/</span>
                      <span className="font-medium text-black">{product.category_name || 'Category'}</span>
                    </div>
                    <h1 className="f-mont-eb text-4xl leading-tight text-black mb-2">{product.name}</h1>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-4xl font-semibold text-black">
                        {formatCurrency(parseFloat(product.final_price))}
                      </span>
                    </div>
                    {product.description && <p className="text-gray-600 leading-relaxed mb-10">{product.description}</p>}

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

              {/* CART VIEW */}
              <div className="w-1/2 flex flex-col overflow-auto p-8">
                {cartLoading && <p className="text-center py-12">Loading cart...</p>}
                {!cart?.items?.length && (
                  <div className="text-center py-20">
                    <p className="text-2xl text-gray-400">Your cart is empty</p>
                  </div>
                )}
                {cart?.items?.map((item: any) => (
                  <div key={item.id} className="flex gap-6 py-6 border-b last:border-none">
                    <div
                      className="w-24 h-24 bg-black rounded-2xl flex-shrink-0"
                      style={{
                        backgroundImage: `url(${getFullImageUrl(item.product.image)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.selected_size && `Size: ${item.selected_size}`} 
                        {item.selected_color && ` • Color: ${item.selected_color}`}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {formatCurrency(item.product.final_price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(item.subtotal)}</p>
                      <button
                        onClick={() => removeMutation.mutate(item.id)}
                        className="text-red-500 text-sm mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t mt-auto pt-8">
                  <div className="flex justify-between text-xl font-semibold mb-6">
                    <span>Total</span>
                    <span>{formatCurrency(cart?.total_price || 0)}</span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setViewMode('product')}
                      className="flex-1 py-5 text-lg font-medium border border-gray-300 rounded-3xl hover:bg-gray-50"
                    >
                      ← Back to Product
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        navigate('/checkout');
                      }}
                      className="flex-1 py-5 text-lg font-semibold bg-black text-white rounded-3xl hover:bg-gray-900"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;