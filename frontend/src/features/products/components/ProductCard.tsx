import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../../../utils/currency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercent = product.discount_price && product.price
    ? Math.round(
        ((parseFloat(product.price) - parseFloat(product.discount_price)) /
          parseFloat(product.price)) * 100
      )
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}
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
            {formatCurrency(parseFloat(product.final_price))}
          </span>
          {parseFloat(product.price) > parseFloat(product.final_price) && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(parseFloat(product.price))}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {product.available_sizes?.slice(0, 4).map((size) => (
            <span
              key={size}
              className="text-[10px] font-medium px-2 py-1 bg-gray-100 rounded-md"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;