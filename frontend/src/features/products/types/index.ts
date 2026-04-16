export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  final_price: number;
  image: string;
  category: string;
  available_sizes: string[];
  available_colors: string[];
  stock: number;
  rating: number;
  review_count: number;
}

export interface ProductFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  size?: string;
  color?: string;
}