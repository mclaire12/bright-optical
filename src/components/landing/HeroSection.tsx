
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center md:text-left md:max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Clear Vision, Delivered to Your Door
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto md:mx-0 mb-8">
            Connect with the best optical pharmacies in Rwanda. Order prescription glasses, 
            contact lenses, and more with fast delivery and expert care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/prescription">Upload Prescription</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
