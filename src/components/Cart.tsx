import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from './CartItem';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  total: number;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  total,
  onCheckout,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-lg transition-colors">
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <CartItem
                key={item.id}
                {...item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">INR {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}