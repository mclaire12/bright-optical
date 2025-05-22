
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  // Sample featured products
  const products = [
    {
      id: 1,
      name: "Classic Round Frames",
      category: "Eyeglasses",
      price: 25000,
      image: "/images/glasses3.png",
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
      image: "/images/glasses2.jpg",
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
  ];

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
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
                <p className="text-gray-600 text-sm mb-2">By {product.pharmacy}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
