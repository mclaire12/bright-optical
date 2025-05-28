
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Truck, Calendar, MapPin, CreditCard, Package } from 'lucide-react';
import { orderService } from '@/services/orderService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch order details
  const { data: order, isLoading, error, refetch } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) throw new Error('Order ID is required');
      const orderData = await orderService.getOrderById(orderId);
      if (!orderData) throw new Error('Order not found');
      return orderData;
    },
    enabled: !!orderId,
  });

  // Fetch order items
  const { data: orderItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: () => orderService.getOrderItems(orderId!),
    enabled: !!orderId && !!order,
  });

  useEffect(() => {
    if (error) {
      console.error('Error loading order:', error);
      toast.error('Failed to load order details');
      navigate('/dashboard');
    }
  }, [error, navigate]);

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view order details.</p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  // Check if user has permission to view this order
  if (!isAdmin && order.user_id !== user.id) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to view this order.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const handleStatusUpdate = async (newStatus: string) => {
    if (!isAdmin) return;
    
    setIsUpdating(true);
    try {
      await orderService.updateOrderStatus(order.id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link 
              to={isAdmin ? "/admin" : "/dashboard"} 
              className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {isAdmin ? "Admin" : "Dashboard"}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.id.substring(0, 8)}</h1>
            <p className="text-gray-600">Placed on {formatDate(order.order_date)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            {order.tracking_number && (
              <Button className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
              {isAdmin && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                      <Button
                        key={status}
                        variant={order.status === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusUpdate(status)}
                        disabled={isUpdating || order.status === status}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.shipping_address}</p>
              <p>{order.city}, {order.district}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="capitalize">{order.payment_method}</p>
              {order.payment_details?.stripe_session_id && (
                <p className="text-sm text-gray-500">
                  Session: {order.payment_details.stripe_session_id.substring(0, 20)}...
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            {itemsLoading ? (
              <div className="text-center py-4">Loading order items...</div>
            ) : orderItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">This order doesn't have any items.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {item.products?.image ? (
                        <img 
                          src={item.products.image} 
                          alt={item.products?.name || 'Product'} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.products?.name || 'Unknown Product'}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Category: {item.products?.category || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(500)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
            <CardDescription>Track your order's journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pl-6">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="text-sm font-medium">{formatDate(order.order_date)}</div>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Order Placed</p>
                  <p className="text-sm text-gray-600">Your order has been placed successfully</p>
                </div>
              </div>

              {order.status !== 'Processing' && (
                <div className="relative pl-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="text-sm font-medium">{formatDate(order.updated_at)}</div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Status Updated</p>
                    <p className="text-sm text-gray-600">Order status changed to {order.status}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetails;
