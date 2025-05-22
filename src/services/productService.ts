
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  pharmacy?: string;
}

export const productService = {
  async getProducts(search: string = '', category: string = 'all', sort: string = '') {
    let query = supabase
      .from('products')
      .select('*');

    // Apply search filter if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%`);
    }

    // Apply category filter if provided and not 'all'
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Get the data
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // Apply sorting in JavaScript since we already have the data
    if (sort) {
      const products = [...(data || [])];
      switch (sort) {
        case 'price-asc':
          return products.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return products.sort((a, b) => b.price - a.price);
        case 'name-asc':
          return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
          return products.sort((a, b) => b.name.localeCompare(a.name));
        default:
          return products;
      }
    }

    return data || [];
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  },

  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data || [];
  }
};
