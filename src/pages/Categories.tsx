
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

const Categories = () => {
  // Function to get product count by category
  const getProductCountByCategory = async () => {
    const categoriesData: Category[] = [
      {
        id: 1,
        name: "Eyeglasses",
        description: "Prescription glasses, reading glasses, and fashion frames",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      },
      {
        id: 2,
        name: "Sunglasses",
        description: "Stylish UV protection in various designs and brands",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      },
      {
        id: 3,
        name: "Contact Lenses",
        description: "Daily, monthly, and colored contact lenses",
        image: "https://images.unsplash.com/photo-1587744495704-7005a72630a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      },
      {
        id: 4,
        name: "Designer Frames",
        description: "Premium designer brands and luxury eyewear",
        image: "https://images.unsplash.com/photo-1633621658785-dd9c2202c04a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      },
      {
        id: 5,
        name: "Kids Eyewear",
        description: "Durable and colorful frames for children of all ages",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      },
      {
        id: 6,
        name: "Sports Eyewear",
        description: "Impact-resistant glasses for active lifestyles",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        itemCount: 0
      }
    ];

    // Get counts from Supabase for each category
    const countPromises = categoriesData.map(async (category) => {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category', category.name);
      
      if (error) {
        console.error(`Error fetching count for ${category.name}:`, error);
        return category;
      }
      
      return {
        ...category,
        itemCount: count || 0
      };
    });

    const categoriesWithCounts = await Promise.all(countPromises);
    return categoriesWithCounts;
  };

  // Fetch categories with React Query
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductCountByCategory
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse by Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect eyewear for your needs by exploring our wide range of categories.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.itemCount} products</span>
                    <Button asChild>
                      <Link to={`/products?category=${category.name}`}>Browse</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <Button asChild>
            <Link to="/upload-prescription">Upload Your Prescription</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
