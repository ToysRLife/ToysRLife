export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  images: string[];
  categories: string[];
  age: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}