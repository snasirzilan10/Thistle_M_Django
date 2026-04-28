import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  ShopPage,
  CartPage,
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
      {/* === PURE AUTH PAGES (No navbar, no footer) === */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/email-verify" element={<EmailVerificationPage />} />
      <Route path="/phone-verify" element={<PhoneVerificationPage />} />

      {/* === ALL MAIN PAGES WITH NAVBAR + QUICK VIEW ONLY === */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protected sub-routes */}
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