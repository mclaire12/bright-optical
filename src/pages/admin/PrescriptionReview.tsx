
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, FileText, Check, X, User, Download, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const PrescriptionReview = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  
  // Sample prescription data - would be fetched from API
  const [prescription, setPrescription] = useState({
    id: prescriptionId,
    patientName: "Emma Williams",
    patientId: "CUST-1243",
    uploadDate: "April 18, 2024",
    status: "Pending Review",
    doctor: "Dr. Robert Mugisha",
    hospital: "Kigali Eye Clinic",
    expiryDate: "April 18, 2025",
    notes: "",
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
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value
    });
  };

  // Handle eye prescription changes
  const handleEyeChange = (eye: 'rightEye' | 'leftEye', field: string, value: string) => {
    setPrescription({
      ...prescription,
      [eye]: {
        ...prescription[eye],
        [field]: value
      }
    });
  };

  // Handle status change
  const handleStatusChange = (status: string) => {
    setPrescription({
      ...prescription,
      status
    });
    
    toast({
      title: "Prescription status updated",
      description: `Status changed to ${status}`,
    });
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
            <Link to="/admin" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Prescription Review</h1>
            <p className="text-gray-600">Review and validate customer prescription</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange("Rejected")}
              className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={() => handleStatusChange("Approved")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Information</CardTitle>
                <CardDescription>Review the prescription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient Name</Label>
                    <div className="flex items-center">
                      <Link to={`/admin/customers/${prescription.patientId}`} className="flex items-center text-primary hover:underline">
                        <User className="h-4 w-4 mr-2" />
                        {prescription.patientName}
                      </Link>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={prescription.status} 
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending Review">Pending Review</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Upload Date</Label>
                    <Input value={prescription.uploadDate} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Doctor</Label>
                    <Input 
                      name="doctor"
                      value={prescription.doctor} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Hospital/Clinic</Label>
                    <Input 
                      name="hospital"
                      value={prescription.hospital} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input 
                    name="expiryDate"
                    value={prescription.expiryDate} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea 
                    name="notes"
                    value={prescription.notes} 
                    onChange={handleInputChange}
                    placeholder="Add any notes about this prescription..."
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Eye Prescription Details</CardTitle>
                <CardDescription>Verify and edit the extracted prescription data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Right Eye (OD)</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="rightSphere" className="text-xs">Sphere</Label>
                          <Input 
                            id="rightSphere"
                            value={prescription.rightEye.sphere} 
                            onChange={(e) => handleEyeChange('rightEye', 'sphere', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="rightCylinder" className="text-xs">Cylinder</Label>
                          <Input 
                            id="rightCylinder"
                            value={prescription.rightEye.cylinder} 
                            onChange={(e) => handleEyeChange('rightEye', 'cylinder', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="rightAxis" className="text-xs">Axis</Label>
                          <Input 
                            id="rightAxis"
                            value={prescription.rightEye.axis} 
                            onChange={(e) => handleEyeChange('rightEye', 'axis', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="rightAdd" className="text-xs">Add</Label>
                          <Input 
                            id="rightAdd"
                            value={prescription.rightEye.add} 
                            onChange={(e) => handleEyeChange('rightEye', 'add', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="rightPD" className="text-xs">Pupillary Distance (PD)</Label>
                        <Input 
                          id="rightPD"
                          value={prescription.rightEye.pd} 
                          onChange={(e) => handleEyeChange('rightEye', 'pd', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Left Eye (OS)</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="leftSphere" className="text-xs">Sphere</Label>
                          <Input 
                            id="leftSphere"
                            value={prescription.leftEye.sphere} 
                            onChange={(e) => handleEyeChange('leftEye', 'sphere', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="leftCylinder" className="text-xs">Cylinder</Label>
                          <Input 
                            id="leftCylinder"
                            value={prescription.leftEye.cylinder} 
                            onChange={(e) => handleEyeChange('leftEye', 'cylinder', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="leftAxis" className="text-xs">Axis</Label>
                          <Input 
                            id="leftAxis"
                            value={prescription.leftEye.axis} 
                            onChange={(e) => handleEyeChange('leftEye', 'axis', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="leftAdd" className="text-xs">Add</Label>
                          <Input 
                            id="leftAdd"
                            value={prescription.leftEye.add} 
                            onChange={(e) => handleEyeChange('leftEye', 'add', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="leftPD" className="text-xs">Pupillary Distance (PD)</Label>
                        <Input 
                          id="leftPD"
                          value={prescription.leftEye.pd} 
                          onChange={(e) => handleEyeChange('leftEye', 'pd', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Prescription Data</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Products</CardTitle>
                <CardDescription>Products that match this prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescription.recommendedProducts.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(product.price)}</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link to={`/admin/products/edit/${product.id}`}>View Product</Link>
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
                <CardTitle>Prescription Image</CardTitle>
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
                      <Eye className="h-4 w-4 mr-2" />
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
                <CardTitle>Review History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm italic">
                    No previous reviews for this prescription.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionReview;
