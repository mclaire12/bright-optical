
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, ShoppingBag } from 'lucide-react';

const MyPrescription = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  
  // Sample prescription data
  const prescription = {
    id: prescriptionId,
    date: "March 15, 2024",
    expiryDate: "March 15, 2025",
    doctor: "Dr. Alice Mugisha",
    hospital: "Kigali Eye Clinic",
    status: "Active",
    rightEye: {
      sphere: "-1.25",
      cylinder: "-0.75",
      axis: "90",
      add: "+0.50",
      pd: "32"
    },
    leftEye: {
      sphere: "-1.50",
      cylinder: "-0.50",
      axis: "85",
      add: "+0.50",
      pd: "32"
    },
    prescriptionImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    recommendedProducts: [
      { id: 1, name: "Classic Round Frames", category: "Eyeglasses", price: 25000 },
      { id: 2, name: "Reading Bifocals", category: "Eyeglasses", price: 35000 },
      { id: 3, name: "Blue Light Glasses", category: "Eyeglasses", price: 28000 }
    ]
  };

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Prescription</h1>
            <p className="text-gray-600">View your eye prescription details</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center" asChild>
              <a href={prescription.prescriptionImage} download>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
            <Button asChild>
              <Link to="/products">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop With This Prescription
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Information</CardTitle>
                <CardDescription>Details of your eye prescription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Prescription Date</h3>
                    <p>{prescription.date}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                    <p>{prescription.doctor}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Hospital/Clinic</h3>
                    <p>{prescription.hospital}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
                    <p>{prescription.expiryDate}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      prescription.status === "Active" ? "bg-green-100 text-green-800" : 
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {prescription.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Eye Prescription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Right Eye (OD)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Sphere</p>
                        <p>{prescription.rightEye.sphere}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Cylinder</p>
                        <p>{prescription.rightEye.cylinder}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Axis</p>
                        <p>{prescription.rightEye.axis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Add</p>
                        <p>{prescription.rightEye.add}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pupillary Distance (PD)</p>
                      <p>{prescription.rightEye.pd}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Left Eye (OS)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Sphere</p>
                        <p>{prescription.leftEye.sphere}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Cylinder</p>
                        <p>{prescription.leftEye.cylinder}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Axis</p>
                        <p>{prescription.leftEye.axis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Add</p>
                        <p>{prescription.leftEye.add}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pupillary Distance (PD)</p>
                      <p>{prescription.leftEye.pd}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Products</CardTitle>
                <CardDescription>Based on your prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescription.recommendedProducts.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{formatPrice(product.price)}</p>
                        <Button size="sm" asChild>
                          <Link to={`/products/${product.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Document</CardTitle>
                <CardDescription>Original uploaded document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <img 
                    src={prescription.prescriptionImage} 
                    alt="Prescription" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button className="flex items-center" asChild>
                    <a href={prescription.prescriptionImage} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Size
                    </a>
                  </Button>
                  <Button variant="outline" className="flex items-center" asChild>
                    <a href={prescription.prescriptionImage} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have questions about your prescription or need assistance with ordering glasses, our team is here to help.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPrescription;
