import { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

const EmailVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const { verifyEmail } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmail.mutate({ email, token }, { onSuccess: () => alert('Email verified!') });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Verify Email</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <input type="text" placeholder="Verification Token" value={token} onChange={e => setToken(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <button type="submit" className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl">Verify Email</button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;