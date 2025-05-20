
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, ArrowLeft, Truck } from 'lucide-react';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Sample order data - would be fetched from API in real app
  const [order] = useState({
    id: orderId,
    date: "Apr 15, 2024",
    status: "Delivered",
    total: 65000,
    items: [
      {
        id: 1,
        name: "Classic Round Frames",
        price: 25000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1603178455924-ef38103d2257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 4,
        name: "Designer Frames",
        price: 40000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      }
    ],
    shipping: {
      address: "123 Main Street",
      city: "Kigali",
      district: "Nyarugenge"
    },
    payment: {
      method: "Credit Card",
      last4: "4242"
    },
    tracking: {
      number: "TRK1234567890",
      status: "Delivered",
      updates: [
        { date: "Apr 15, 2024", status: "Delivered", description: "Package delivered" },
        { date: "Apr 14, 2024", status: "Out for Delivery", description: "Package is out for delivery" },
        { date: "Apr 13, 2024", status: "In Transit", description: "Package is in transit" },
        { date: "Apr 12, 2024", status: "Order Processed", description: "Order has been processed" },
      ]
    }
  });

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Order #{orderId}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                order.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.district}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.payment.method} ending in {order.payment.last4}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(order.total - 5000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{formatPrice(5000)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
            <CardDescription>Track your order's journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {order.tracking.updates.map((update, index) => (
                <div key={index} className="relative pl-6">
                  {index < order.tracking.updates.length - 1 && (
                    <div className="absolute left-2 top-2 w-0.5 h-full bg-gray-200"></div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className="text-sm font-medium">{update.date}</div>
                    </div>
                    <div className="sm:ml-4">
                      <p className="font-medium">{update.status}</p>
                      <p className="text-sm text-gray-600">{update.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetails;
