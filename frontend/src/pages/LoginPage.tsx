import { useLogin } from '../features/auth/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, { onSuccess: () => navigate('/') });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-5 rounded-2xl border mb-4" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-6 py-5 rounded-2xl border mb-8" />
        <button type="submit" className="w-full bg-black text-white py-5 rounded-3xl text-lg font-semibold">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;