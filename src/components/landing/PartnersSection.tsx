
import React from 'react';

const PartnersSection = () => {
  // Placeholder pharmacy partner logos
  const partners = [
    { id: 1, name: "Vision Care Kigali", logo: "/placeholder.svg" },
    { id: 2, name: "Optical Center Rwanda", logo: "/placeholder.svg" },
    { id: 3, name: "Eye Care Rwanda", logo: "/placeholder.svg" },
    { id: 4, name: "Kigali Eyewear", logo: "/placeholder.svg" },
    { id: 5, name: "Perfect Vision Pharmacy", logo: "/placeholder.svg" },
    { id: 6, name: "Clear Sight Optical", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading optical pharmacies across Rwanda to bring you quality products and services.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center">
              <div className="bg-gray-100 rounded-lg p-6 w-full h-24 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-12" 
                />
                <span className="text-sm font-medium text-gray-700">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
