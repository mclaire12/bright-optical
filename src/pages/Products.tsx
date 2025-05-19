
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: "Classic Round Frames",
      category: "Eyeglasses",
      price: 25000,
      image: "https://images.unsplash.com/photo-1603178455924-ef38103d2257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Vision Care Kigali"
    },
    {
      id: 2,
      name: "Polarized Sunglasses",
      category: "Sunglasses",
      price: 35000,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Optical Center Rwanda"
    },
    {
      id: 3,
      name: "Monthly Contacts",
      category: "Contact Lenses",
      price: 20000,
      image: "https://images.unsplash.com/photo-1587744495704-7005a72630a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Eye Care Rwanda"
    },
    {
      id: 4,
      name: "Designer Frames",
      category: "Eyeglasses",
      price: 45000,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Vision Care Kigali"
    },
    {
      id: 5,
      name: "Aviator Sunglasses",
      category: "Sunglasses",
      price: 38000,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Kigali Optical"
    },
    {
      id: 6,
      name: "Cat-Eye Frames",
      category: "Eyeglasses",
      price: 32000,
      image: "https://images.unsplash.com/photo-1632178151697-fd971baa906f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Eye Care Rwanda"
    },
    {
      id: 7,
      name: "Daily Disposable Contacts",
      category: "Contact Lenses",
      price: 15000,
      image: "https://images.unsplash.com/photo-1616302450012-6aaee7d51ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Kigali Optical"
    },
    {
      id: 8,
      name: "Premium Reading Glasses",
      category: "Eyeglasses",
      price: 22000,
      image: "https://images.unsplash.com/photo-1633621658785-dd9c2202c04a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      pharmacy: "Vision Center Rwanda"
    }
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.pharmacy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Optical Products</h1>
        
        {/* Search and filter section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10"
              placeholder="Search products, brands, categories..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
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
                <p className="text-gray-600 text-sm mb-2">By {product.pharmacy}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
