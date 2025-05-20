
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, Save, Upload } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();

  // New product state
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    features: [""],
    specifications: {
      material: "",
      weight: "",
      dimensions: ""
    },
    status: "Draft",
    image: null
  });

  // Handle form field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  // Handle select field change
  const handleSelectChange = (name: string, value: string) => {
    setProduct({
      ...product,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would send data to API in a real app
    toast({
      title: "Product created",
      description: `${product.name} has been successfully added to inventory.`,
    });
    
    // Navigate back to admin products
    navigate('/admin');
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
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product in your inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" form="add-product-form">
              <Plus className="h-4 w-4 mr-2" />
              Create Product
            </Button>
          </div>
        </div>

        <form id="add-product-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={product.name} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={product.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Eyeglasses">Eyeglasses</SelectItem>
                          <SelectItem value="Sunglasses">Sunglasses</SelectItem>
                          <SelectItem value="Contact Lenses">Contact Lenses</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={product.status} 
                        onValueChange={(value) => handleSelectChange('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={product.description} 
                      onChange={handleInputChange} 
                      rows={4} 
                      required
                      placeholder="Enter detailed product description"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (RWF) *</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        value={product.price || ''} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input 
                        id="stock" 
                        name="stock" 
                        type="number" 
                        value={product.stock || ''} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Input 
                        id="material" 
                        name="specifications.material" 
                        value={product.specifications.material} 
                        onChange={(e) => setProduct({
                          ...product,
                          specifications: {
                            ...product.specifications,
                            material: e.target.value
                          }
                        })} 
                        placeholder="e.g., Acetate, Metal, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input 
                        id="weight" 
                        name="specifications.weight" 
                        value={product.specifications.weight} 
                        onChange={(e) => setProduct({
                          ...product,
                          specifications: {
                            ...product.specifications,
                            weight: e.target.value
                          }
                        })} 
                        placeholder="e.g., 15g"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input 
                      id="dimensions" 
                      name="specifications.dimensions" 
                      value={product.specifications.dimensions} 
                      onChange={(e) => setProduct({
                        ...product,
                        specifications: {
                          ...product.specifications,
                          dimensions: e.target.value
                        }
                      })} 
                      placeholder="e.g., 142mm x 18mm x 49mm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4">
                      <Upload className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-gray-700 font-medium mb-1">Drag and drop an image</h3>
                    <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">PNG, JPG or WEBP up to 5MB</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={feature} 
                        placeholder="Enter product feature"
                        onChange={(e) => {
                          const newFeatures = [...product.features];
                          newFeatures[index] = e.target.value;
                          setProduct({
                            ...product,
                            features: newFeatures
                          });
                        }} 
                      />
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            const newFeatures = product.features.filter((_, i) => i !== index);
                            setProduct({
                              ...product,
                              features: newFeatures
                            });
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setProduct({
                        ...product,
                        features: [...product.features, ""]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
