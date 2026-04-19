import { Link } from 'react-router-dom';
import { useCart } from '../../features/cart/hooks/useCart';

const Navbar = () => {
  // Single hook call (FAANG best practice + fixes TS6133)
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
            THISTLE
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <Link to="/wishlist" className="hover:text-black transition-colors">Wishlist</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium hover:text-black transition-colors">Login</Link>
            
            <Link 
              to="/cart" 
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              <span>Cart</span>
              <span className="bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
              <span className="text-lg">🛒</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;