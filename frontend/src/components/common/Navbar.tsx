import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../features/cart/hooks/useCart';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: cart } = useCart();   // live cart count

  const cartItemCount = cart?.items?.length || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-tighter text-black f-mont-eb">
            THISTLE
          </Link>

          {/* Main Category Navigation */}
          <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
            <Link to="/shop?category=topwear" className="hover:text-black transition-colors">Topwear</Link>
            <Link to="/shop?category=bottomwear" className="hover:text-black transition-colors">Bottomwear</Link>
            <Link to="/shop?category=shoes" className="hover:text-black transition-colors">Shoes</Link>
            <Link to="/shop?category=backpack" className="hover:text-black transition-colors">Backpack &amp; Luggages</Link>
            <Link to="/shop?category=accessories" className="hover:text-black transition-colors">Accessories</Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search premium gear..."
                className="w-full bg-gray-100 border border-transparent focus:border-black rounded-3xl py-3 px-6 text-sm outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                🔎
              </button>
            </div>
          </form>

          {/* Right side icons — fully functional */}
          <div className="flex items-center gap-x-6">
            <Link to="/wishlist" className="text-2xl hover:text-black transition-colors">♡</Link>
            
            <Link to="/cart" className="relative text-2xl hover:text-black transition-colors">
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link to="/account" className="text-2xl hover:text-black transition-colors">👤</Link>
          </div>

          {/* Mobile menu (future-proof) */}
          <button className="md:hidden text-3xl">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;