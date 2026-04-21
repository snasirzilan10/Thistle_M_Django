export interface Product {
  id: number;
  category: number;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  price: string;           // backend sends as string
  discount_price: string;  // ← this is what your API actually returns
  final_price: string;
  stock: number;
  available_sizes: string[];
  available_colors: string[];
  image: string;
  is_active: boolean;
}