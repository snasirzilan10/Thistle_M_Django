import React, { useState } from 'react';
import { useProducts } from '../features/products/hooks/useProducts';
import ProductCard from '../features/products/components/ProductCard';
import ProductQuickViewModal from '../features/products/components/ProductQuickViewModal';

const ShopPage: React.FC = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleQuickView = (id: number) => {
    setSelectedProductId(id);
  };

  const closeModal = () => {
    setSelectedProductId(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-96" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Shop All Premium Apparel</h1>
        <p className="text-gray-500">{products.length} products</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No products found</p>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {selectedProductId && (
        <ProductQuickViewModal
          productId={selectedProductId}
          isOpen={!!selectedProductId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ShopPage;