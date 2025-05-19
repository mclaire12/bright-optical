
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, Package, Calendar } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-primary" />,
      title: "Upload Prescription",
      description: "Upload your prescription through our secure platform. We accept images or PDF files."
    },
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: "Select Products",
      description: "Browse our wide range of eyewear products from trusted optical pharmacies in Rwanda."
    },
    {
      icon: <Package className="h-12 w-12 text-primary" />,
      title: "Place Your Order",
      description: "Add items to your cart, customize according to your prescription, and checkout securely."
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Fast Delivery",
      description: "Receive your order at your doorstep with our efficient delivery network across Rwanda."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your prescription eyewear has never been easier. Follow these simple steps to place an order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-4">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 text-2xl font-bold text-primary">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
