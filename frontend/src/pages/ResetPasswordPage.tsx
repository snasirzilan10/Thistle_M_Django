import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { confirmPasswordReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmPasswordReset.mutate({ email, token, new_password: newPassword }, {
      onSuccess: () => {
        alert('Password reset successful! Please login.');
        navigate('/login');
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <input type="text" placeholder="Reset Token" value={token} onChange={e => setToken(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <button type="submit" className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;