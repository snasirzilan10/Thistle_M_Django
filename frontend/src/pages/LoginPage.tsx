import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ username, password }, {
      onSuccess: () => navigate('/shop'),
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl hover:bg-gray-800"
          >
            {login.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-black font-medium underline">Register here</Link>
        </p>
        {login.isError && <p className="text-red-500 text-center mt-4">Invalid credentials</p>}
      </div>
    </div>
  );
};

export default LoginPage;