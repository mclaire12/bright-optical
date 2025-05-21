
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Bright Optical</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connecting Bright Optical  to customers across Rwanda with a seamless digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-700 mb-4">
              At Bright Optical, we envision a future where quality eye care and optical products are easily accessible to every Rwandan citizen. We're dedicated to bridging the gap between optical health care providers and individuals who need their services.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to transform how people access and purchase eyewear products in Rwanda by creating a digital platform that connects customers with local optical pharmacies, providing convenience, quality, and accessibility.
            </p>
          </div>
          <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559126758-0ae0446de016?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Vision care" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 3c.53 0 1.039.211 1.414.586l7 7 .002.002c.373.373.583.88.584 1.41 0 .53-.211 1.039-.586 1.414l-7 7c-.375.375-.884.586-1.414.586s-1.039-.211-1.414-.586l-7-7a1.994 1.994 0 0 1-.586-1.414c0-.53.211-1.039.586-1.414l7-7A1.994 1.994 0 0 1 12 3z"></path><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-gray-600">
                  We connect customers with local optical pharmacies, making it easy to find the right provider for your eyecare needs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplify</h3>
                <p className="text-gray-600">
                  We simplify the prescription process, allowing users to upload and validate their prescriptions digitally.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Deliver</h3>
                <p className="text-gray-600">
                  We ensure timely and efficient delivery of eyewear products from local pharmacies to your doorstep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="images/claire.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Marie Claire Uwiringiyimana</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="images/Nshuti.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Gasore Nshuti Moise</h3>
              <p className="text-gray-600">Chief Operations Officer</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/images/muneza.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Siboniyo Emmanuel</h3>
              <p className="text-gray-600">Lead Technologist</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
