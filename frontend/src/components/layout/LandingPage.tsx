import { useProducts } from '../../features/products/hooks/useProducts';
import ProductCard from '../../features/products/components/ProductCard';
import { useAddToCart } from '../../features/cart/hooks/useCart';
import { Product } from '../../features/products/types';

const LandingPage = () => {
  const { data: products = [], isLoading } = useProducts();
  const addToCart = useAddToCart();

  const handleAddToCart = (product: Product) => {
    addToCart.mutate({
      product,
      quantity: 1,
      size: product.available_sizes[0] || 'M',
      color: product.available_colors[0] || 'Black',
    });
  };

  const categories = [
    { name: 'T-Shirts', image: 'https://picsum.photos/id/1015/300/300', link: '/shop?category=tshirt' },
    { name: 'Joggers', image: 'https://picsum.photos/id/201/300/300', link: '/shop?category=jogger' },
    { name: 'Shoes', image: 'https://picsum.photos/id/301/300/300', link: '/shop?category=shoe' },
    { name: 'Bags', image: 'https://picsum.photos/id/401/300/300', link: '/shop?category=bag' },
    { name: 'Backpacks', image: 'https://picsum.photos/id/501/300/300', link: '/shop?category=backpack' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-black text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-7xl font-bold tracking-tighter leading-none mb-6">
              PREMIUM<br />MEN'S APPAREL
            </h1>
            <p className="text-2xl text-gray-400 mb-10">T-shirts • Joggers • Shoes • Bags • Backpacks</p>
            <a
              href="/shop"
              className="inline-block bg-white text-black px-10 py-5 rounded-3xl text-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </a>
          </div>
          <img
            src="https://picsum.photos/id/1015/1200/800"
            alt="Hero"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.link}
              className="group block overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <img src={cat.image} alt={cat.name} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
              <div className="p-6 bg-white text-center">
                <h3 className="font-semibold text-xl">{cat.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold mb-12">Featured Collection</h2>
        {isLoading ? (
          <p className="text-center py-20 text-xl">Loading premium gear...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;