import type { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}
const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute top-3 right-3 bg-white text-xs font-semibold px-2.5 py-1 rounded-xl shadow">
          ৳{product.final_price}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
        <h3 className="font-semibold text-lg leading-tight mt-1 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white text-sm font-medium px-6 py-3 rounded-2xl hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
          <div className="text-yellow-400 text-xl">★★★★☆</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;