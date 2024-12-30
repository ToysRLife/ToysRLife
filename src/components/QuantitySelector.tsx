import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({ quantity, onQuantityChange, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
          text-gray-600 dark:text-gray-400 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center text-gray-900 dark:text-white">{quantity}</span>
      <button
        onClick={() => quantity < max && onQuantityChange(quantity + 1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
          text-gray-600 dark:text-gray-400 disabled:opacity-50"
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}