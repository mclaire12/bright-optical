
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Eye, 
  Calendar,
  FileText,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prescriptionService } from '@/services/prescriptionService';
import { toast } from 'sonner';

const AdminPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: prescriptions = [], isLoading } = useQuery({
    queryKey: ['admin-prescriptions'],
    queryFn: () => prescriptionService.getAllPrescriptions(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ prescriptionId, status }: { prescriptionId: string; status: string }) =>
      prescriptionService.updatePrescriptionStatus(prescriptionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-prescriptions'] });
      toast.success('Prescription status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update prescription status');
    },
  });

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.user_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending review': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (prescriptionId: string, newStatus: string) => {
    updateStatusMutation.mutate({ prescriptionId, status: newStatus });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Prescriptions</h2>
          <p className="text-gray-600">Review and manage customer prescriptions</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prescriptions</SelectItem>
              <SelectItem value="pending review">Pending Review</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prescriptions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading prescriptions...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{prescription.patient_name}</h3>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDate(prescription.date)}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dr. {prescription.doctor_name || 'Unknown'}
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          {prescription.expiry_date ? `Expires ${formatDate(prescription.expiry_date)}` : 'No expiry'}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Customer: {prescription.user_id.substring(0, 8)}</p>
                        {prescription.recommendations && prescription.recommendations.length > 0 && (
                          <p>Recommendations: {prescription.recommendations.join(', ')}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <Select
                        value={prescription.status}
                        onValueChange={(value) => handleStatusUpdate(prescription.id, value)}
                      >
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending Review">Pending Review</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" asChild>
                        <Link to={`/admin/prescriptions/${prescription.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPrescriptions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No prescriptions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Prescriptions will appear here when customers upload them.'}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPrescriptions;
