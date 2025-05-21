
import React, { useState } from 'react';
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

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Updated products data with the new eyewear products
  const products = [
    {
      id: 1,
      name: "Classic Round Frames",
      category: "Eyeglasses",
      price: 25000,
      stock: 12,
      image: "https://images.unsplash.com/photo-1603178455924-ef38103d2257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Polarized Ray-Ban Sunglasses",
      category: "Sunglasses",
      price: 35000,
      stock: 15,
      image: "/lovable-uploads/d5971df2-da25-4257-a3e4-53ca1f8cb166.png",
    },
    {
      id: 3,
      name: "Monthly Contacts",
      category: "Contact Lenses",
      price: 20000,
      stock: 10,
      image: "https://images.unsplash.com/photo-1587744495704-7005a72630a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Designer Frames",
      category: "Eyeglasses",
      price: 45000,
      stock: 8,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Ray-Ban Polarized P Collection",
      category: "Sunglasses",
      price: 38000,
      stock: 5,
      image: "/lovable-uploads/ae661e50-fe67-4e2f-b4f1-0b253eb84750.png",
    },
    {
      id: 6,
      name: "Cat-Eye Frames",
      category: "Eyeglasses",
      price: 32000,
      stock: 7,
      image: "https://images.unsplash.com/photo-1632178151697-fd971baa906f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 7,
      name: "Daily Disposable Contacts",
      category: "Contact Lenses",
      price: 15000,
      stock: 20,
      image: "https://images.unsplash.com/photo-1616302450012-6aaee7d51ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 8,
      name: "Premium Reading Glasses",
      category: "Eyeglasses",
      price: 22000,
      stock: 15,
      image: "https://images.unsplash.com/photo-1633621658785-dd9c2202c04a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 9,
      name: "Ray-Ban Classic Square Sunglasses",
      category: "Sunglasses",
      price: 42000,
      stock: 8,
      image: "/lovable-uploads/add28d92-7f29-4268-81ef-b66b7c708bc9.png",
    },
    {
      id: 10,
      name: "Metallic Silver Frames",
      category: "Eyeglasses",
      price: 28000,
      stock: 10,
      image: "/lovable-uploads/f2d0134e-2d95-4ade-8cdf-fe3c6db685b6.png",
    },
    {
      id: 11,
      name: "Rose Gold Cat-Eye Frames",
      category: "Eyeglasses",
      price: 32000,
      stock: 6,
      image: "/lovable-uploads/c90cd87a-23c9-46e5-b5b2-77bafa3c99e8.png",
    },
    {
      id: 12,
      name: "Designer Pink Round Frames",
      category: "Eyeglasses",
      price: 29000,
      stock: 9,
      image: "/lovable-uploads/f831ffcc-7b30-49e2-8534-2cf91080cd03.png",
    },
    {
      id: 13,
      name: "Kids Blue Frames",
      category: "Eyeglasses",
      price: 18000,
      stock: 12,
      image: "/lovable-uploads/d2b3e900-aa33-4e58-bc2e-0aac7eeb7009.png",
    },
    {
      id: 14,
      name: "Gucci Tortoise Shell Frames",
      category: "Eyeglasses",
      price: 65000,
      stock: 5,
      image: "/lovable-uploads/b629faaa-b3b7-41ec-878b-e65bd8dc9571.png",
    },
    {
      id: 15,
      name: "Gucci Square Frames",
      category: "Eyeglasses",
      price: 72000,
      stock: 4,
      image: "/lovable-uploads/c55b63d8-9165-4993-a5c4-525b5c49eab3.png",
    },
    {
      id: 16,
      name: "Gucci Black Rectangular Frames",
      category: "Eyeglasses",
      price: 68000,
      stock: 6,
      image: "/lovable-uploads/d713aa7c-944c-457c-a6a9-21ae758d8b5f.png",
    },
  ];

  // Apply filters and search
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
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
  const handleAddToCart = (product: any) => {
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
        <p className="text-gray-600 mb-6">Showing {sortedProducts.length} products</p>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-primary font-medium mb-1">{product.category}</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  <Link to={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-2">By Bright Optical</p>
                
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
        
        {/* No results message */}
        {sortedProducts.length === 0 && (
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
