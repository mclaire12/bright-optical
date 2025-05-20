
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Box, CheckCircle, Search, Filter } from 'lucide-react';

const LowStockRestock = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample low stock products data
  const [lowStockProducts, setLowStockProducts] = useState([
    { id: 1, name: "Classic Round Frames", category: "Eyeglasses", stock: 3, image: "https://images.unsplash.com/photo-1603178455924-ef38103d2257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", threshold: 5 },
    { id: 2, name: "Polarized Sunglasses", category: "Sunglasses", stock: 2, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", threshold: 5 },
    { id: 3, name: "Monthly Contacts", category: "Contact Lenses", stock: 4, image: "https://images.unsplash.com/photo-1587744495704-7005a72630a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", threshold: 10 },
    { id: 4, name: "Designer Frames", category: "Eyeglasses", stock: 1, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", threshold: 5 },
    { id: 5, name: "Aviator Sunglasses", category: "Sunglasses", stock: 3, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80", threshold: 5 },
  ]);

  // Filter products based on search query
  const filteredProducts = lowStockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle restock product
  const handleRestock = (productId: number, quantity: number) => {
    // In a real app, this would update the inventory via API
    setLowStockProducts(lowStockProducts.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          stock: product.stock + quantity
        };
      }
      return product;
    }));
    
    const product = lowStockProducts.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Product restocked",
        description: `Added ${quantity} units to ${product.name}`,
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link to="/admin" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Low Stock Products</h1>
            <p className="text-gray-600">Manage and restock inventory levels</p>
          </div>
          <div className="flex gap-2">
            <Button>
              Generate Purchase Orders
            </Button>
          </div>
        </div>

        {/* Search and filter section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10"
              placeholder="Search low stock products..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Inventory</CardTitle>
            <CardDescription>Products that need to be restocked soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-32 h-32 overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              {product.stock} left
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              Threshold: {product.threshold}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Input 
                              type="number" 
                              min="1" 
                              defaultValue="10" 
                              className="w-20" 
                              id={`restock-quantity-${product.id}`}
                            />
                            <Button 
                              onClick={() => {
                                const quantity = Number((document.getElementById(`restock-quantity-${product.id}`) as HTMLInputElement).value);
                                handleRestock(product.id, quantity);
                              }}
                              className="flex items-center"
                            >
                              <Box className="h-4 w-4 mr-2" />
                              Restock
                            </Button>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          >
                            View Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">No low stock products found</h3>
                  <p className="text-gray-500 mt-1">
                    {searchQuery ? "Try a different search term" : "All products are well-stocked"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LowStockRestock;
