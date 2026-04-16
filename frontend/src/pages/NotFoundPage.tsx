import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-bold text-black mb-4">404</h1>
      <p className="text-2xl mb-12">Page not found</p>
      <Link to="/" className="bg-black text-white px-10 py-5 rounded-3xl text-lg font-medium">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;