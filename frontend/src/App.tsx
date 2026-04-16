import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  ShopPage,
  ProductDetailPage,
  CartPage,
  WishlistPage,
  CheckoutPage,
  AccountPage,
  OrdersPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
} from './pages';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* === PUBLIC LANDING PAGE (NO NAVBAR, NO REDIRECT) === */}
      <Route path="/" element={<HomePage />} />

      {/* === ALL OTHER PAGES use MainLayout (Navbar + Footer) === */}
      <Route element={<MainLayout />}>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Protected routes only */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Public auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;