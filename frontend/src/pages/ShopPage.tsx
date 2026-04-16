import { useProducts } from '../features/products/hooks/useProducts';
import ProductCard from '../features/products/components/ProductCard';
import { useAddToCart } from '../features/cart/hooks/useCart';
import { Product } from '../features/products/types';

const ShopPage = () => {
  const { data: products = [], isLoading } = useProducts();
  const addToCart = useAddToCart();

  const handleAddToCart = (product: Product) => {
    addToCart.mutate({ product, quantity: 1, size: product.available_sizes[0] || 'M', color: product.available_colors[0] || 'Black' });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-2xl">Loading premium collection...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Premium Men’s Apparel</h1>
        <p className="text-xl text-gray-600 mb-12">T-shirts • Joggers • Shoes • Bags • Backpacks</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;