import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestPasswordReset.mutate(email, {
      onSuccess: () => {
        alert('Reset token sent to email (check console)');
        navigate('/reset-password');
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <button type="submit" className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl">Send Reset Token</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;