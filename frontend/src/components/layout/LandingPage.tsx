import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../common/TopBar';
import { useProducts } from '../../features/products/hooks/useProducts';
import ProductCard from '../../features/products/components/ProductCard';

const LandingPage: React.FC = () => {
  const { data: products = [], isLoading } = useProducts();

  const categories = [
    { name: 'T-Shirts', image: 'https://picsum.photos/id/1015/300/300', link: '/shop?category=tshirt' },
    { name: 'Joggers', image: 'https://picsum.photos/id/201/300/300', link: '/shop?category=jogger' },
    { name: 'Shoes', image: 'https://picsum.photos/id/301/300/300', link: '/shop?category=shoe' },
    { name: 'Bags', image: 'https://picsum.photos/id/401/300/300', link: '/shop?category=bag' },
    { name: 'Backpacks', image: 'https://picsum.photos/id/501/300/300', link: '/shop?category=backpack' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <TopBar />

      <div className="bg-[#FAFAFA] text-[#222222] pt-20 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="f-mont-eb text-7xl font-bold tracking-tighter leading-none mb-4">
              Thistle
            </h1>
            <h1 className="f-mont-eb text-7xl font-bold tracking-tighter leading-none mb-8 text-[#222222]">
              MEN'S FASHION
            </h1>
            
            <p className="text-xl text-gray-600 mb-10">
              T-shirts • Joggers • Shoes • Bags • Backpacks
            </p>

            <Link
              to="/shop"
              className="inline-block bg-white text-[#222222] border border-[#222222] px-10 py-4 rounded-3xl text-xl font-semibold hover:bg-[#222222] hover:text-white transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://picsum.photos/id/1015/1200/800"
              alt="Thistle Men's Fashion"
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 bg-[#FAFAFA]">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#222222]">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group block overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all bg-white"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" 
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-xl text-[#222222]">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 bg-[#FAFAFA]">
        <h2 className="text-4xl font-bold mb-12 text-[#222222]">Featured Collection</h2>
        
        {isLoading ? (
          <p className="text-center py-20 text-xl text-[#222222]">Loading premium gear...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;