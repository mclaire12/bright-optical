
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Edit, Trash2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";

const ProductEdit = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // Sample product data - would be fetched from API
  const [product, setProduct] = useState({
    id: Number(productId),
    name: "Classic Round Frames",
    category: "Eyeglasses",
    price: 25000,
    stock: 12,
    description: "Elegant round frames made from high-quality materials. Perfect for those looking for a timeless style that complements any face shape.",
    features: [
      "Lightweight acetate frame",
      "Adjustable nose pads",
      "Spring hinges for comfort",
      "Available in various colors"
    ],
    specifications: {
      material: "Acetate",
      weight: "15g",
      dimensions: "142mm temple length, 18mm bridge width, 49mm lens width"
    },
    status: "Active",
    image: "https://images.unsplash.com/photo-1603178455924-ef38103d2257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Update form field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  // Update select field
  const handleSelectChange = (name: string, value: string) => {
    setProduct({
      ...product,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Would send update to API in a real app
    toast({
      title: "Product updated",
      description: `${product.name} has been successfully updated.`,
    });
  };

  // Handle product deletion
  const handleDelete = () => {
    // Would send delete request to API in a real app
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Product deleted",
      description: `${product.name} has been successfully removed.`,
      variant: "destructive",
    });
    
    // Navigate back to admin page
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update product information</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button type="submit" form="edit-product-form" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <form id="edit-product-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={product.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={product.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
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
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={product.description} 
                      onChange={handleInputChange} 
                      rows={4} 
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
                      <Label htmlFor="price">Price (RWF)</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        value={product.price} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input 
                        id="stock" 
                        name="stock" 
                        type="number" 
                        value={product.stock} 
                        onChange={handleInputChange} 
                        required 
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
                  <div className="border rounded-md p-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="button" variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={feature} 
                        onChange={(e) => {
                          const newFeatures = [...product.features];
                          newFeatures[index] = e.target.value;
                          setProduct({
                            ...product,
                            features: newFeatures
                          });
                        }} 
                      />
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
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => {
                      setProduct({
                        ...product,
                        features: [...product.features, ""]
                      });
                    }}
                  >
                    Add Feature
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProductEdit;
