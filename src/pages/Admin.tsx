
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Search,
  Eye,
  Edit,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { orderService } from '@/services/orderService';
import { userService } from '@/services/userService';
import { productService } from '@/services/productService';
import { prescriptionService } from '@/services/prescriptionService';
import { useQuery } from '@tanstack/react-query';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all data
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['allOrders'],
    queryFn: () => orderService.getAllOrders(),
    enabled: isAdmin,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => userService.getAllUsers(),
    enabled: isAdmin,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => productService.getProducts(),
    enabled: isAdmin,
  });

  const { data: prescriptions = [], isLoading: prescriptionsLoading } = useQuery({
    queryKey: ['allPrescriptions'],
    queryFn: () => prescriptionService.getAllPrescriptions(),
    enabled: isAdmin,
  });

  if (!user || !isAdmin) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
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
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.order_date).toDateString();
    return today === orderDate;
  }).length;
  const lowStockProducts = products.filter(product => product.stock < 10);
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'Pending Review');

  // Filter orders by search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your store, orders, and customers</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/products/add">Add Product</Link>
            </Button>
            <Button asChild>
              <Link to="/admin/analytics">View Analytics</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ordersLoading ? '...' : formatPrice(totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ordersLoading ? '...' : todayOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {usersLoading ? '...' : users.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {productsLoading ? '...' : lowStockProducts.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button asChild className="h-16">
            <Link to="/admin/low-stock" className="flex flex-col items-center">
              <Package className="h-6 w-6 mb-1" />
              Low Stock Alert ({lowStockProducts.length})
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16">
            <Link to="/admin/prescriptions" className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 mb-1" />
              Pending Prescriptions ({pendingPrescriptions.length})
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16">
            <Link to="/admin/analytics" className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 mb-1" />
              Sales Analytics
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-16">
            <Link to="/admin/settings" className="flex flex-col items-center">
              <Users className="h-6 w-6 mb-1" />
              Settings
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-4">Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search term.' : 'Orders will appear here once customers start purchasing.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredOrders.slice(0, 10).map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(order.order_date)}
                          </p>
                          <p className="text-sm text-gray-500">Customer: {order.user_id.substring(0, 8)}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{formatPrice(order.total_amount)}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            // Handle status update
                            console.log('Update order status:', order.id);
                          }}>
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Manage your inventory</CardDescription>
              </div>
              <Button asChild>
                <Link to="/admin/products/add">Add Product</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="text-center py-4">Loading products...</div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-orange-800">{product.name}</p>
                          <p className="text-sm text-orange-600">Stock: {product.stock} units</p>
                          <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {lowStockProducts.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-green-400" />
                      <h3 className="mt-2 text-sm font-semibold text-green-800">All products well stocked!</h3>
                      <p className="mt-1 text-sm text-green-600">No low stock alerts at the moment.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
