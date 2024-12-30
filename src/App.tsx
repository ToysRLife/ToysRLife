import React, { useState } from 'react';
import productsData from './data/products.json';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { useCart } from './hooks/useCart';
import { Product } from './types';
import { CheckoutFormData } from './components/Checkout';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotal } = useCart();

  const filteredProducts = productsData.products.filter(product => {
    const matchesCategory = !selectedCategory || product.categories.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <CategoryFilter
          categories={productsData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

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
      </main>

      {/* Modals */}
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