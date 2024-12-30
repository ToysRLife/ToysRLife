import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { PriceDisplay } from './PriceDisplay';
import { CategoryTags } from './CategoryTags';
import { Product } from '../types';

interface ProductCardProps extends Product {
  onAddToCart: () => void;
  onClick: () => void;
  categoryData: Array<{ id: string; name: string }>;
}

export function ProductCard({
  name,
  price,
  mrp,
  images,
  description,
  age,
  categories,
  categoryData,
  onAddToCart,
  onClick
}: ProductCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <ImageCarousel images={images} alt={name} />
        {/* <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md 
          hover:bg-gray-100 dark:hover:bg-gray-600 z-10 transition-colors">
          <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button> */}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
        <div className="mt-2">
          <CategoryTags categories={categories} categoryData={categoryData} />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        <div className="mt-3 space-y-2">
          <PriceDisplay price={price} mrp={mrp} />
          {/* <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
            px-2 py-1 rounded">Age: {age}</span> */}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white 
            py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}