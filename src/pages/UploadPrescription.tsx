
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Check, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UploadPrescription = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL for image files
      if (selectedFile.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a prescription file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate file upload and processing
      setTimeout(() => {
        toast({
          title: "Prescription uploaded successfully",
          description: "Your prescription has been uploaded and is being processed.",
        });
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading your prescription. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Prescription</h1>
          <p className="text-lg text-gray-600">
            Upload your eyewear prescription to order customized glasses or contact lenses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Prescription</CardTitle>
              <CardDescription>
                We accept images (JPG, PNG) or PDF files of your prescription.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="prescription">Prescription File</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Input
                        id="prescription"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="prescription" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-gray-600 font-medium">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          JPG, PNG or PDF (max. 5MB)
                        </span>
                      </Label>
                    </div>
                  </div>
                  
                  {preview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="border rounded-md overflow-hidden">
                        <img src={preview} alt="Prescription preview" className="max-h-[200px] max-w-full object-contain mx-auto" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Input id="notes" placeholder="Any specific details about your prescription" />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={!file || isUploading}>
                    {isUploading ? "Uploading..." : "Upload Prescription"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Upload Your Prescription?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>Ensures your glasses or contacts are made to exact specifications</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>Prevents errors in your order</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>Allows our pharmacists to recommend suitable products</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>Required for all prescription eyewear</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Upload your prescription</h3>
                    <p className="text-sm text-gray-500">Upload a clear image or PDF of your prescription</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Verification</h3>
                    <p className="text-sm text-gray-500">Our pharmacists will review and verify your prescription</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Shop for eyewear</h3>
                    <p className="text-sm text-gray-500">Browse and order products that match your prescription</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Don't have a prescription?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>No Prescription?</DialogTitle>
                  <DialogDescription>
                    Here's what you can do if you don't have a current prescription:
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>
                    1. Visit Bright Optical for an eye examination.
                  </p>
                  <p>
                    2. If you had a recent eye exam, contact your optometrist to request a copy of your prescription.
                  </p>
                  <p>
                    3. For non-prescription eyewear, you can browse our collection without uploading a prescription.
                  </p>
                  <Button className="w-full mt-4">Find Partner Opticians</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPrescription;
