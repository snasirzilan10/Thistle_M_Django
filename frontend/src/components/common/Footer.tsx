const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-4">THISTLE</h3>
          <p className="text-gray-400">Premium Men's Apparel • Dhaka, Bangladesh</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <p className="text-sm text-gray-400 space-y-2">
            <a href="/shop" className="block hover:text-white">T-Shirts</a>
            <a href="/shop" className="block hover:text-white">Joggers</a>
            <a href="/shop" className="block hover:text-white">Shoes</a>
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <p className="text-sm text-gray-400">Cash on Delivery • Free Shipping over ৳3000 • 30-day returns</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <p className="text-sm text-gray-400">Instagram • Facebook • TikTok</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-16">
        © 2026 Thistle. All rights reserved. Made for Bangladesh.
      </div>
    </footer>
  );
};

export default Footer;