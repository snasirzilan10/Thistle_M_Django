import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useCart } from '../../features/cart/hooks/useCart';
import { useWishlist } from '../../features/wishlist/hooks/useWishlist';
import { Link } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const { data: wishlist = [] } = useWishlist();

  const cartCount = cart?.items?.length || 0;
  const wishlistCount = wishlist.length;

  return (
    <div className="bg-black text-white text-[13px] py-2.5 font-medium border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Free Shipping */}
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-emerald-400">🚚</span>
          <span>Free shipping on orders over <span className="font-semibold text-white">৳5,000</span></span>
        </div>

        {/* Center: Premium tagline / location */}
        <div className="hidden md:flex items-center gap-1.5 text-white/80 text-xs tracking-widest">
          <span className="f-mont-m">THISTLE • DHAKA, BANGLADESH</span>
        </div>

        {/* Right: Account + Wishlist + Cart */}
        <div className="flex items-center gap-6">
          
          {/* Account */}
          <Link 
            to={isAuthenticated ? "/account" : "/login"}
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <span className="text-lg">👤</span>
            <span className="hidden sm:inline text-white/90 group-hover:text-white">
              {isAuthenticated ? 'Account' : 'Sign in'}
            </span>
          </Link>

          {/* Wishlist */}
          <Link 
            to="/wishlist"
            className="flex items-center gap-1.5 hover:text-white transition-colors relative group"
          >
            <span className="text-xl">♡</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link 
            to="/cart"
            className="flex items-center gap-1.5 hover:text-white transition-colors relative group"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;