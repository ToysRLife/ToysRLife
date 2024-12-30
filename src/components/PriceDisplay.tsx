import React from 'react';

interface PriceDisplayProps {
  price: number;
  mrp: number;
}

export function PriceDisplay({ price, mrp }: PriceDisplayProps) {
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        INR {price.toFixed(2)}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
        INR {mrp.toFixed(2)}
      </span>
      <span className="text-sm text-green-600 dark:text-green-400">
        {discount}% off
      </span>
    </div>
  );
}