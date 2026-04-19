import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate({ username, email, password }, {
      onSuccess: () => {
        alert('✅ Registration successful! Please login now.');
        navigate('/login');
      },
    });
  };

  // Safe error handling - fixes TS2339
  let errorMessage = 'Registration failed';
  if (register.error) {
    const err = register.error as any;
    errorMessage = err?.response?.data?.error 
      || err?.message 
      || 'Something went wrong';
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Create Account</h1>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={register.isPending}
            className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl hover:bg-gray-800"
          >
            {register.isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {register.isError && (
          <p className="text-red-500 text-center mt-4 font-medium">
            ❌ {errorMessage}
          </p>
        )}

        <p className="text-center mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-medium underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;