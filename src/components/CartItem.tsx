import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  images,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src={images[0]} alt={name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-600">INR {price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}