import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }: Props) => {
  const base = 'font-semibold rounded-3xl transition-all active:scale-95';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-black hover:bg-gray-100',
    outline: 'border border-gray-300 hover:border-black',
  };
  const sizes = {
    sm: 'px-5 py-3 text-sm',
    md: 'px-8 py-4',
    lg: 'px-10 py-5 text-lg',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;