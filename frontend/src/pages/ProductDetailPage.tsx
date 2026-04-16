import { useParams } from 'react-router-dom';
import { useProductDetail } from '../features/products/hooks/useProducts';
import { useAddToCart } from '../features/cart/hooks/useCart';
import { useToggleWishlist } from '../features/wishlist/hooks/useWishlist';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail(Number(id));
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();

  if (isLoading || !product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleAddToCart = () => {
    addToCart.mutate({
      product,
      quantity: 1,
      size: product.available_sizes[0] || 'M',
      color: product.available_colors[0] || 'Black',
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <img src={product.image} alt={product.name} className="w-full rounded-3xl shadow-2xl" />
        
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <button onClick={() => toggleWishlist.mutate(product.id)} className="text-3xl">♡</button>
          </div>
          <p className="text-3xl font-semibold text-black mt-2">৳{product.final_price}</p>
          
          <div className="mt-8">
            <h3 className="font-medium mb-3">Available Sizes</h3>
            <div className="flex gap-3">
              {product.available_sizes.map(size => (
                <button key={size} className="border border-black px-6 py-3 rounded-2xl hover:bg-black hover:text-white transition-colors">{size}</button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="flex gap-3">
              {product.available_colors.map(color => (
                <button key={color} className="w-9 h-9 rounded-2xl border-2 border-gray-300" style={{ backgroundColor: color.toLowerCase() }} />
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-12 w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>

          <div className="mt-12 prose">
            <h3 className="font-semibold">Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;