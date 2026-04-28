import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className = '',
}) => {
  const handleDecrease = () => {
    if (quantity > min) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < max) onQuantityChange(quantity + 1);
  };

  return (
    <div
      className={`inline-flex items-center border border-gray-300 bg-white rounded-3xl overflow-hidden shadow-sm ${className}`}
    >
      {/* Minus Button */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-12 h-12 flex items-center justify-center text-3xl font-light text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>

      {/* Quantity Display */}
      <div className="w-14 text-center font-semibold text-2xl text-gray-900 select-none">
        {quantity}
      </div>

      {/* Plus Button */}
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-12 h-12 flex items-center justify-center text-3xl font-light text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;