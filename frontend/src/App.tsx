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
      {/* Public landing page (no navbar/footer for clean hero) */}
      <Route path="/" element={<HomePage />} />

      {/* All other pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Protected routes */}
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

        {/* Auth pages (public) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;