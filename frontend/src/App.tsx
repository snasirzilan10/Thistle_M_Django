import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  ShopPage,
  WishlistPage,
  CheckoutPage,
  AccountPage,
  OrdersPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  EmailVerificationPage,
  PhoneVerificationPage,
} from './pages';

import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* === PURE AUTH PAGES === */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/email-verify" element={<EmailVerificationPage />} />
      <Route path="/phone-verify" element={<PhoneVerificationPage />} />

      {/* === MAIN PAGES (Quick View is the only cart experience) === */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        {/* Protected routes - no dedicated cart page anymore */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;