import { useRegister } from '../features/auth/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData, { onSuccess: () => navigate('/login') });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
        <input type="text" placeholder="Full Name" onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full px-6 py-5 rounded-2xl border mb-4" />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-5 rounded-2xl border mb-4" />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-6 py-5 rounded-2xl border mb-8" />
        <button type="submit" className="w-full bg-black text-white py-5 rounded-3xl text-lg font-semibold">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;