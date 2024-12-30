import React from 'react';

interface CartSummaryProps {
  items: any[];
  total: number;
}

export function CartSummary({ items, total }: CartSummaryProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {item.name} x {item.quantity}
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t dark:border-gray-700 pt-4 mt-4">
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-blue-500">INR {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}