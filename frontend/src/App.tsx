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
  ForgotPasswordPage,      // new
  ResetPasswordPage,       // new
  EmailVerificationPage,   // new
  PhoneVerificationPage,   // new
} from './pages';

import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/email-verify" element={<EmailVerificationPage />} />
      <Route path="/phone-verify" element={<PhoneVerificationPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;