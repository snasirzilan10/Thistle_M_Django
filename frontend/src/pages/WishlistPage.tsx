import React from 'react';
import { useWishlist } from '../features/wishlist/hooks/useWishlist';
import ProductCard from '../features/products/components/ProductCard';

const WishlistPage: React.FC = () => {
  const { data: wishlist = [] } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">Your wishlist is empty</p>
            <p className="text-gray-500 mt-2">Start adding premium items you love</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;