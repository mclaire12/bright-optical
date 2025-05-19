
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Pharmacies = () => {
  // Sample pharmacy data
  const pharmacies = [
    {
      id: 1,
      name: "Vision Care Kigali",
      address: "KN 5 Ave, Kigali, Rwanda",
      phone: "+250 788 123 456",
      website: "visioncarekigali.rw",
      hours: "Mon-Sat: 8:00 AM - 7:00 PM",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1582564286939-400a311013a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Premium optical care center offering a wide range of eyeglasses, contact lenses and vision services in Kigali."
    },
    {
      id: 2,
      name: "Optical Center Rwanda",
      address: "KG 15 Ave, Kimihurura, Kigali",
      phone: "+250 788 345 678",
      website: "opticalcenter.rw",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1565732228234-33c762d6ddc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Specialized in designer frames and prescription lenses with experienced optometrists on staff."
    },
    {
      id: 3,
      name: "Eye Care Rwanda",
      address: "KK 3 Rd, Nyamirambo, Kigali",
      phone: "+250 788 567 890",
      website: "eyecarerwanda.com",
      hours: "Mon-Sun: 8:30 AM - 8:00 PM",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Full-service eye care center offering comprehensive eye examinations, treatments and a wide selection of eyewear."
    },
    {
      id: 4,
      name: "Kigali Optical",
      address: "KN 2 St, Kiyovu, Kigali",
      phone: "+250 788 234 567",
      website: "kigalioptical.rw",
      hours: "Mon-Sat: 9:00 AM - 7:30 PM",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1587905069368-40d276e4c3d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Modern optical pharmacy with the latest eyewear technology and stylish frames for all ages."
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Partner Pharmacies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the leading optical pharmacies across Rwanda to provide you with quality eyecare products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={pharmacy.image} 
                  alt={pharmacy.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{pharmacy.rating}</span>
                  </div>
                </div>
                <CardDescription>{pharmacy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{pharmacy.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{pharmacy.hours}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to={`/pharmacies/${pharmacy.id}`}>View Details</Link>
                  </Button>
                  <Button asChild>
                    <Link to={`/products?pharmacy=${pharmacy.id}`}>Browse Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Are you an optical pharmacy interested in joining our platform?</p>
          <Button asChild>
            <Link to="/contact">Contact Us to Partner</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pharmacies;
