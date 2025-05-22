
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productService, Product } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch products with React Query
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', searchQuery, categoryFilter, sortOption],
    queryFn: () => productService.getProducts(searchQuery, categoryFilter, sortOption),
  });

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle add to cart with login check
  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  if (error) {
    console.error("Error loading products:", error);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Bright Optical Products</h1>
        
        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10"
              placeholder="Search products, categories..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Eyeglasses">Eyeglasses</SelectItem>
                <SelectItem value="Sunglasses">Sunglasses</SelectItem>
                <SelectItem value="Contact Lenses">Contact Lenses</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products count */}
        <p className="text-gray-600 mb-6">
          {isLoading ? "Loading products..." : `Showing ${products.length} products`}
        </p>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="overflow-hidden rounded-t-lg">
                  <AspectRatio ratio={4/3} className="bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </AspectRatio>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-primary font-medium mb-1">{product.category}</div>
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    <Link to={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">By {product.pharmacy || 'Bright Optical'}</p>
                  
                  <div className="flex items-center mt-2 mb-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      product.stock > 10 ? "bg-green-100 text-green-800" : 
                      product.stock > 5 ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {product.stock > 10 ? "In Stock" : 
                       product.stock > 5 ? "Low Stock" : 
                       "Very Low Stock"} ({product.stock})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* No results message */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Prescription reminder */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Need Prescription Eyewear?</h3>
          <p className="text-blue-700 mb-4">Upload your prescription and get customized eyewear recommendations.</p>
          <Button asChild>
            <Link to="/upload-prescription">Upload Your Prescription</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
