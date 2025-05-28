
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, FileText, User, Package, Eye, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { orderService } from '@/services/orderService';
import { prescriptionService } from '@/services/prescriptionService';
import { userService } from '@/services/userService';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { user, profile, isAdmin } = useAuth();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Handle payment success
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const paymentStatus = searchParams.get('payment');
      const sessionId = searchParams.get('session_id');
      
      if (paymentStatus === 'success' && sessionId) {
        try {
          console.log('Processing payment success for session:', sessionId);
          
          // Call our edge function to handle the successful payment
          const { data, error } = await supabase.functions.invoke('handle-payment-success', {
            body: { sessionId }
          });

          if (error) {
            console.error('Error handling payment success:', error);
            toast.error('There was an issue processing your payment. Please contact support.');
          } else if (data.success) {
            console.log('Payment processed successfully:', data);
            toast.success(`Order #${data.orderId.substring(0, 8)} has been placed successfully!`);
            clearCart();
            
            // Remove payment params from URL
            navigate('/dashboard', { replace: true });
          }
        } catch (error) {
          console.error('Error in payment success handler:', error);
          toast.error('There was an issue processing your payment. Please contact support.');
        }
      }
    };

    handlePaymentSuccess();
  }, [searchParams, clearCart, navigate]);

  // Fetch user's orders
  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
    queryKey: ['userOrders', user?.id],
    queryFn: () => orderService.getUserOrders(user?.id),
    enabled: !!user?.id,
  });

  // Fetch user's prescriptions
  const { data: prescriptions = [], isLoading: prescriptionsLoading } = useQuery({
    queryKey: ['userPrescriptions', user?.id],
    queryFn: () => prescriptionService.getUserPrescriptions(),
    enabled: !!user?.id,
  });

  // Fetch user profile
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => userService.getCurrentUserProfile(),
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your dashboard.</p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.firstName || userProfile?.first_name || 'User'}!
            </h1>
            <p className="text-gray-600">Manage your orders, prescriptions, and account settings</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button asChild variant="outline">
                <Link to="/admin">Admin Panel</Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ordersLoading ? '...' : orders.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptionsLoading ? '...' : prescriptions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ordersLoading ? '...' : orders.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Account Status</p>
                  <p className="text-lg font-bold text-green-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest purchases and their status</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link to="/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-4">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/products">Browse Products</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(order.order_date)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{formatPrice(order.total_amount)}</span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Your uploaded prescriptions and their status</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link to="/upload-prescription">Upload New</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {prescriptionsLoading ? (
                <div className="text-center py-4">Loading prescriptions...</div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No prescriptions yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload your prescription to get personalized recommendations.</p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/upload-prescription">Upload Prescription</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {prescriptions.slice(0, 3).map((prescription) => (
                    <div key={prescription.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{prescription.patient_name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(prescription.date)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {prescription.doctor_name && `Dr. ${prescription.doctor_name}`}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/my-prescriptions/${prescription.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16" asChild>
                <Link to="/account-settings" className="flex flex-col items-center">
                  <User className="h-6 w-6 mb-1" />
                  Account Settings
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/address-management" className="flex flex-col items-center">
                  <MapPin className="h-6 w-6 mb-1" />
                  Manage Addresses
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/add-payment-method" className="flex flex-col items-center">
                  <CreditCard className="h-6 w-6 mb-1" />
                  Payment Methods
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
