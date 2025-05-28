
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { prescriptionService } from '@/services/prescriptionService';

interface PrescriptionUploadProps {
  onPrescriptionChange?: (prescription: any, additionalCost: number) => void;
  showPricing?: boolean;
}

const PrescriptionUpload = ({ onPrescriptionChange, showPricing = false }: PrescriptionUploadProps) => {
  const [prescriptionData, setPrescriptionData] = useState({
    patient_name: '',
    doctor_name: '',
    date: '',
    expiry_date: '',
    right_eye_sphere: '',
    right_eye_cylinder: '',
    right_eye_axis: '',
    left_eye_sphere: '',
    left_eye_cylinder: '',
    left_eye_axis: '',
    recommendations: [] as string[],
    image: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'form' | 'file'>('form');

  // Calculate additional cost based on prescription complexity
  const calculateAdditionalCost = () => {
    let cost = 0;
    
    // Base prescription processing cost
    if (prescriptionData.patient_name || file) {
      cost += 2000; // RWF 2,000 base cost
    }
    
    // Additional cost for complex prescriptions
    if (prescriptionData.right_eye_cylinder || prescriptionData.left_eye_cylinder) {
      cost += 1000; // RWF 1,000 for astigmatism correction
    }
    
    return cost;
  };

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...prescriptionData, [field]: value };
    setPrescriptionData(newData);
    
    if (onPrescriptionChange) {
      onPrescriptionChange(newData, calculateAdditionalCost());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL for image files
      if (selectedFile.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreview(result);
          
          // Update prescription data with file
          const newData = { ...prescriptionData, image: result };
          setPrescriptionData(newData);
          
          if (onPrescriptionChange) {
            onPrescriptionChange({ ...newData, file: result }, calculateAdditionalCost());
          }
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleSubmit = async () => {
    if (uploadMethod === 'form' && !prescriptionData.patient_name) {
      toast.error('Please fill in the patient name');
      return;
    }
    
    if (uploadMethod === 'file' && !file) {
      toast.error('Please select a prescription file');
      return;
    }
    
    setIsUploading(true);
    
    try {
      await prescriptionService.uploadPrescription(prescriptionData);
      toast.success('Prescription uploaded successfully');
      
      // Reset form
      setPrescriptionData({
        patient_name: '',
        doctor_name: '',
        date: '',
        expiry_date: '',
        right_eye_sphere: '',
        right_eye_cylinder: '',
        right_eye_axis: '',
        left_eye_sphere: '',
        left_eye_cylinder: '',
        left_eye_axis: '',
        recommendations: [],
        image: ''
      });
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading prescription:', error);
      toast.error('Failed to upload prescription');
    } finally {
      setIsUploading(false);
    }
  };

  const additionalCost = calculateAdditionalCost();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Prescription</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={uploadMethod === 'form' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMethod('form')}
          >
            Fill Form
          </Button>
          <Button
            variant={uploadMethod === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMethod('file')}
          >
            Upload File
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadMethod === 'form' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient_name">Patient Name *</Label>
                <Input
                  id="patient_name"
                  value={prescriptionData.patient_name}
                  onChange={(e) => handleInputChange('patient_name', e.target.value)}
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <Label htmlFor="doctor_name">Doctor Name</Label>
                <Input
                  id="doctor_name"
                  value={prescriptionData.doctor_name}
                  onChange={(e) => handleInputChange('doctor_name', e.target.value)}
                  placeholder="Enter doctor name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Prescription Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={prescriptionData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={prescriptionData.expiry_date}
                  onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Right Eye (OD)</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Sphere (e.g., -1.25)"
                    value={prescriptionData.right_eye_sphere}
                    onChange={(e) => handleInputChange('right_eye_sphere', e.target.value)}
                  />
                  <Input
                    placeholder="Cylinder (e.g., -0.75)"
                    value={prescriptionData.right_eye_cylinder}
                    onChange={(e) => handleInputChange('right_eye_cylinder', e.target.value)}
                  />
                  <Input
                    placeholder="Axis (e.g., 90)"
                    value={prescriptionData.right_eye_axis}
                    onChange={(e) => handleInputChange('right_eye_axis', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Left Eye (OS)</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Sphere (e.g., -1.50)"
                    value={prescriptionData.left_eye_sphere}
                    onChange={(e) => handleInputChange('left_eye_sphere', e.target.value)}
                  />
                  <Input
                    placeholder="Cylinder (e.g., -0.50)"
                    value={prescriptionData.left_eye_cylinder}
                    onChange={(e) => handleInputChange('left_eye_cylinder', e.target.value)}
                  />
                  <Input
                    placeholder="Axis (e.g., 85)"
                    value={prescriptionData.left_eye_axis}
                    onChange={(e) => handleInputChange('left_eye_axis', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient_name_file">Patient Name *</Label>
              <Input
                id="patient_name_file"
                value={prescriptionData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                placeholder="Enter patient name"
              />
            </div>
            
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Input
                type="file"
                className="hidden"
                id="prescription-file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
              <Label htmlFor="prescription-file" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  JPG, PNG or PDF (max. 5MB)
                </span>
              </Label>
            </div>
            
            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="border rounded-md overflow-hidden">
                  <img src={preview} alt="Prescription preview" className="max-h-[200px] max-w-full object-contain mx-auto" />
                </div>
              </div>
            )}
          </div>
        )}

        {showPricing && additionalCost > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900">Prescription Processing Cost</h4>
            <p className="text-blue-700">Additional cost: RWF {additionalCost.toLocaleString()}</p>
          </div>
        )}

        <Button 
          onClick={handleSubmit} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : 'Save Prescription'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrescriptionUpload;
