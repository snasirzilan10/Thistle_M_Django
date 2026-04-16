import { InputHTMLAttributes } from 'react';

const Input = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full px-6 py-5 bg-white border border-gray-300 rounded-3xl focus:border-black focus:outline-none transition-colors ${className}`}
      {...props}
    />
  );
};

export default Input;