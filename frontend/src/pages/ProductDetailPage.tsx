import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProductDetail } from '../features/products/hooks/useProducts';
import { useAddToCart } from '../features/cart/hooks/useCart';
import { useToggleWishlist } from '../features/wishlist/hooks/useWishlist';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetail(Number(id));
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading premium product...</div>;
  if (error || !product) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Sorry, product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color first');
      return;
    }
    addToCart.mutate({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  // Defensive category handling — fixes TS "Property 'name' does not exist on type 'never'"
  const categoryName = product.category
    ? (typeof product.category === 'object' && product.category !== null && 'name' in product.category
        ? (product.category as any).name
        : String(product.category))
    : 'Men’s Apparel';

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          Shop &gt; {categoryName} &gt; {product.name}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-300" 
          />
          
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
              <button 
                onClick={() => toggleWishlist.mutate(product.id)} 
                className="text-3xl hover:scale-110 transition-transform"
              >
                ♡
              </button>
            </div>
            <p className="text-3xl font-semibold text-black mt-2">৳{product.final_price}</p>
            
            <div className="mt-8">
              <h3 className="font-medium mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-3">
                {product.available_sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-6 py-3 rounded-2xl font-medium transition-all ${
                      selectedSize === size ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {product.available_colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-2xl border-2 transition-all ${
                      selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-black rounded-2xl flex items-center justify-center text-xl font-medium hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-black rounded-2xl flex items-center justify-center text-xl font-medium hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-12 w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl hover:bg-gray-800 transition-colors"
            >
              Add to Cart — ৳{(product.final_price * quantity).toFixed(0)}
            </button>

            <div className="mt-12 prose max-w-none">
              <h3 className="font-semibold">Description</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;