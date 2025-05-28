
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, FileText, User, Settings, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { prescriptionService } from '@/services/prescriptionService';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ['userOrders', user?.id],
    queryFn: () => orderService.getUserOrders(),
    enabled: !!user?.id,
  });

  const { data: prescriptions = [] } = useQuery({
    queryKey: ['userPrescriptions', user?.id],
    queryFn: () => prescriptionService.getUserPrescriptions(),
    enabled: !!user?.id,
  });

  const recentOrders = orders.slice(0, 3);
  const recentPrescriptions = prescriptions.slice(0, 3);

  const formatPrice = (price: number) => `RWF ${price.toLocaleString()}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your account.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-[#7E69AB]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Browse</p>
                  <p className="text-lg font-semibold">Products</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/products">Shop Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-[#7E69AB]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upload</p>
                  <p className="text-lg font-semibold">Prescription</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/upload-prescription">Upload</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-[#7E69AB]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My</p>
                  <p className="text-lg font-semibold">Orders</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-[#7E69AB]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Account</p>
                  <p className="text-lg font-semibold">Settings</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/account-settings">Manage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Orders
                <Button variant="outline" size="sm" asChild>
                  <Link to="/orders">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.order_date)}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(order.total_amount)}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/orders/${order.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                  <Button asChild className="mt-4">
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                My Prescriptions
                <Button variant="outline" size="sm" asChild>
                  <Link to="/upload-prescription">Upload New</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{prescription.patient_name}</p>
                        <p className="text-sm text-gray-500">{formatDate(prescription.date)}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(prescription.status)}`}>
                          {prescription.status}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/my-prescriptions/${prescription.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No prescriptions uploaded</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload your prescription to get started.</p>
                  <Button asChild className="mt-4">
                    <Link to="/upload-prescription">Upload Prescription</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
