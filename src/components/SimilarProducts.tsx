import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface SimilarProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function SimilarProducts({ products, onProductClick }: SimilarProductsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
}