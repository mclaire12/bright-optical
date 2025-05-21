
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Eye, Download, Upload, FileText } from 'lucide-react';

const MyPrescription = () => {
  // Sample prescription data
  const prescription = {
    id: 'PRSC-2024-001',
    date: '02/09/2024',
    patientName: 'Uwikingiyimana Marcel',
    details: {
      rightEye: {
        sphere: '+1.000',
        cylinder: '-0.25',
        axis: '180°'
      },
      leftEye: {
        sphere: '+0.75',
        cylinder: '-0.25',
        axis: '5°'
      }
    },
    recommendations: ['Single Vision', 'Photochromic', 'Blue Cut'],
    status: 'Active',
    expiryDate: '02/09/2025',
    doctorName: 'Dr. Bright Eyecare',
    image: "/lovable-uploads/46be68d1-352a-4a2b-b3d3-c2910c6458dd.png"
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your prescription is being downloaded."
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Prescription</h1>
            <p className="text-gray-600">View and manage your eye prescription</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/upload-prescription">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Link>
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
            <CardDescription>
              Issued on {prescription.date} • Valid until {prescription.expiryDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Patient Information</h3>
                <p><span className="font-medium">Name:</span> {prescription.patientName}</p>
                <p><span className="font-medium">Prescription ID:</span> {prescription.id}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Prescription Values</h3>
                <div className="grid grid-cols-4 gap-4 border-b pb-4 font-medium text-sm">
                  <div>Eye</div>
                  <div>Sphere</div>
                  <div>Cylinder</div>
                  <div>Axis</div>
                </div>
                <div className="grid grid-cols-4 gap-4 border-b py-2">
                  <div className="font-medium">Right (OD)</div>
                  <div>{prescription.details.rightEye.sphere}</div>
                  <div>{prescription.details.rightEye.cylinder}</div>
                  <div>{prescription.details.rightEye.axis}</div>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2">
                  <div className="font-medium">Left (OS)</div>
                  <div>{prescription.details.leftEye.sphere}</div>
                  <div>{prescription.details.leftEye.cylinder}</div>
                  <div>{prescription.details.leftEye.axis}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Recommendations</h3>
                <div className="flex flex-wrap gap-2">
                  {prescription.recommendations.map((rec, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prescription Image</CardTitle>
            <CardDescription>
              Original prescription from {prescription.doctorName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={prescription.image} 
                alt="Prescription document" 
                className="w-full object-contain"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/products">
                  <Eye className="h-4 w-4 mr-2" />
                  Browse Suitable Products
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/upload-prescription">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload New Prescription
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MyPrescription;
