
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { productService, Product } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch featured products (limit to 4)
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const allProducts = await productService.getProducts();
      // Just get the first 4 for featured section
      return allProducts.slice(0, 4);
    }
  });

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular eyecare products from trusted optical pharmacies across Rwanda.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading featured products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                  <p className="text-gray-600 text-sm mb-2">By {product.pharmacy || 'Bright Optical'}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    <Button size="sm" variant="outline" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
