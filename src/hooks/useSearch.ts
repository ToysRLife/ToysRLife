import { useMemo } from 'react';
import { Product } from '../types';

export function useSearch(products: Product[], searchQuery: string, selectedCategory: string | null) {
  return useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      // Category filter
      const matchesCategory = !selectedCategory || product.categories.includes(selectedCategory);
      
      // Search filter
      const matchesSearch = query === '' || 
        product.name.toLowerCase().includes(query) ||
        // product.description.toLowerCase().includes(query) ||
        product.categories.some(cat => cat.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);
}