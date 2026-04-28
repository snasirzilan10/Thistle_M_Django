import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../../../utils/currency';
import { getFullImageUrl } from '../../../utils/image';

interface ProductCardProps {
  product: Product;
  onQuickView?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const discountPercent = product.discount_price && product.price
    ? Math.round(((parseFloat(product.price) - parseFloat(product.discount_price)) / parseFloat(product.price)) * 100)
    : 0;

  const imageUrl = getFullImageUrl(product.image);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product.id);
  };

  return (
    <div 
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer"
      onClick={handleQuickView}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            console.warn(`Failed to load image for product ${product.id}: ${imageUrl}`);
            (e.target as HTMLImageElement).src = 'https://picsum.photos/id/1015/600/600';
          }}
        />
        
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-white/90 text-xs font-medium px-4 py-2 rounded-3xl shadow-sm opacity-0 group-hover:opacity-100 transition-all">
          Quick View
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description?.substring(0, 80)}...
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(parseFloat(product.final_price || product.price || '0'))}
          </span>
          {parseFloat(product.price) > parseFloat(product.final_price || product.price || '0') && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(parseFloat(product.price))}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {product.available_sizes?.slice(0, 4).map((size) => (
            <span key={size} className="text-[10px] font-medium px-2 py-1 bg-gray-100 rounded-md">
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;