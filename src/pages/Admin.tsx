
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  AlertTriangle
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
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const formatPrice = (price: number) => `RWF ${price.toLocaleString()}`;

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.order_date).toDateString();
    return today === orderDate;
  }).length;
  const lowStockProducts = products.filter(product => product.stock < 10);
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'Pending Review');

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {productsLoading ? '...' : products.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="h-20" variant={lowStockProducts.length > 0 ? "destructive" : "outline"}>
            <Link to="/admin/low-stock" className="flex flex-col items-center">
              <AlertTriangle className="h-6 w-6 mb-1" />
              Low Stock ({lowStockProducts.length})
            </Link>
          </Button>
          
          <Button asChild className="h-20" variant={pendingPrescriptions.length > 0 ? "default" : "outline"}>
            <Link to="/admin/prescriptions" className="flex flex-col items-center">
              <Package className="h-6 w-6 mb-1" />
              Pending Prescriptions ({pendingPrescriptions.length})
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20">
            <Link to="/admin/analytics" className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 mb-1" />
              View Analytics
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20">
            <Link to="/admin/products/add" className="flex flex-col items-center">
              <Package className="h-6 w-6 mb-1" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-4">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Orders will appear here once customers start purchasing.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-600">{formatPrice(order.total_amount)}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
              <CardDescription>Products running low on inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="text-center py-4">Loading products...</div>
              ) : lowStockProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-green-400" />
                  <h3 className="mt-2 text-sm font-semibold text-green-800">All products well stocked!</h3>
                  <p className="mt-1 text-sm text-green-600">No low stock alerts at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                      <div>
                        <p className="font-medium text-orange-800">{product.name}</p>
                        <p className="text-sm text-orange-600">Stock: {product.stock} units</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/products/edit/${product.id}`}>Manage</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
