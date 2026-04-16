import { useWishlist } from '../features/wishlist/hooks/useWishlist';
import ProductCard from '../features/products/components/ProductCard';
import { Product } from '../features/products/types';
import { useAddToCart } from '../features/cart/hooks/useCart';

const WishlistPage = () => {
  const { data: wishlist = [] } = useWishlist();
  const addToCart = useAddToCart();

  const handleAddToCart = (product: Product) => {
    addToCart.mutate({ product, quantity: 1, size: 'M', color: 'Black' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map(item => (
            <ProductCard key={item.id} product={item.product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;