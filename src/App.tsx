import React, { useState } from 'react';
import productsData from './data/products.json';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { useCart } from './hooks/useCart';
import { useSearch } from './hooks/useSearch';
import { Product } from './types';
import { CheckoutFormData } from './components/Checkout';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotal } = useCart();
  
  const filteredProducts = useSearch(productsData.products, searchQuery, selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart({ ...product, quantity });
    setSelectedProduct(null);
  };

  const handleCheckout = (formData: CheckoutFormData) => {
    console.log('Order placed:', { formData, items: cartItems, total: getTotal() });
    setIsCheckoutOpen(false);
  };

  const getSimilarProducts = (product: Product) => {
    return productsData.products
      .filter(p => 
        p.id !== product.id && 
        p.categories.some(cat => product.categories.includes(cat))
      )
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemsCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <CategoryFilter
          categories={productsData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No products found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                categoryData={productsData.categories}
                onAddToCart={() => handleAddToCart(product)}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          similarProducts={getSimilarProducts(selectedProduct)}
          categoryData={productsData.categories}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={getTotal()}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={getTotal()}
        onSubmit={handleCheckout}
      />
    </div>
  );
}

export default App;