import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { QuantitySelector } from './QuantitySelector';
import { ProductCard } from './ProductCard';
import { PriceDisplay } from './PriceDisplay';
import { CategoryTags } from './CategoryTags';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  similarProducts: Product[];
  categoryData: Array<{ id: string; name: string }>;
}

export function ProductDetails({ 
  product, 
  onClose, 
  onAddToCart, 
  similarProducts,
  categoryData 
}: ProductDetailsProps) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onClose}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square">
            <ImageCarousel images={product.images} alt={product.name} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="mb-4">
              <CategoryTags categories={product.categories} categoryData={categoryData} />
            </div>

            <div className="mb-4">
              <PriceDisplay price={product.price} mrp={product.mrp} />
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Age Range</h3>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                {product.age}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Quantity</h3>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={10}
              />
            </div>

            <button
              onClick={() => onAddToCart(product, quantity)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      window.location.hash = product.id;
                    }, 100);
                  }}
                >
                  <ProductCard
                    {...product}
                    categoryData={categoryData}
                    onAddToCart={() => onAddToCart(product, 1)}
                    onClick={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}