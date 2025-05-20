
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, FileText, ShoppingBag } from 'lucide-react';

const CustomerProfile = () => {
  const { customerId } = useParams<{ customerId: string }>();
  
  // Sample customer data - would be fetched from API
  const customer = {
    id: customerId,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+250 78 123 4567",
    joinDate: "March 15, 2024",
    lastLogin: "April 20, 2024",
    addresses: [
      {
        type: "Home",
        street: "123 Main Street",
        city: "Kigali",
        district: "Nyarugenge",
        isDefault: true
      },
      {
        type: "Work",
        street: "456 Business Avenue",
        city: "Kigali",
        district: "Kicukiro",
        isDefault: false
      }
    ],
    orders: [
      {
        id: "ORD-2023-1254",
        date: "Apr 15, 2024",
        status: "Delivered",
        total: 65000,
        items: 2
      },
      {
        id: "ORD-2023-1187",
        date: "Mar 22, 2024",
        status: "Processing",
        total: 38000,
        items: 1
      },
      {
        id: "ORD-2023-1043",
        date: "Feb 10, 2024",
        status: "Delivered",
        total: 85000,
        items: 3
      }
    ],
    prescriptions: [
      {
        id: "PRESC-0123",
        date: "Mar 15, 2024",
        doctor: "Dr. Alice Mugisha",
        hospital: "Kigali Eye Clinic",
        status: "Active"
      },
      {
        id: "PRESC-0089",
        date: "Oct 10, 2023",
        doctor: "Dr. James Karemera",
        hospital: "Vision Care Center",
        status: "Expired"
      }
    ]
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
            <h1 className="text-3xl font-bold text-gray-900">Customer Profile</h1>
            <p className="text-gray-600">View and manage customer information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Send Message</Button>
            <Button>Edit Customer</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <p className="text-gray-500">Customer ID: {customer.id}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p>{customer.joinDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p>{customer.lastLogin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <Tabs defaultValue="orders">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Activity</CardTitle>
                  <TabsList>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="orders" className="mt-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                      <div>Order ID</div>
                      <div>Date</div>
                      <div>Status</div>
                      <div>Total</div>
                      <div></div>
                    </div>
                    {customer.orders.map((order) => (
                      <div key={order.id} className="grid grid-cols-5 p-4 border-t items-center text-sm">
                        <div className="font-medium">{order.id}</div>
                        <div className="text-gray-600">{order.date}</div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                            order.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div>{formatPrice(order.total)}</div>
                        <div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/orders/${order.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/admin" className="flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        View All Orders
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="prescriptions" className="mt-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                      <div>Prescription ID</div>
                      <div>Date</div>
                      <div>Doctor</div>
                      <div>Status</div>
                      <div></div>
                    </div>
                    {customer.prescriptions.map((prescription) => (
                      <div key={prescription.id} className="grid grid-cols-5 p-4 border-t items-center text-sm">
                        <div className="font-medium">{prescription.id}</div>
                        <div className="text-gray-600">{prescription.date}</div>
                        <div>{prescription.doctor}</div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            prescription.status === "Active" ? "bg-green-100 text-green-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {prescription.status}
                          </span>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/prescriptions/${prescription.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/admin" className="flex items-center justify-center">
                        <FileText className="h-4 w-4 mr-2" />
                        View All Prescriptions
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="addresses" className="mt-0">
                  <div className="space-y-4">
                    {customer.addresses.map((address, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-lg border relative">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">{address.type}</h3>
                            <div className="mt-1 space-y-1 text-sm text-gray-600">
                              <p>{address.street}</p>
                              <p>{address.city}, {address.district}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Notes</CardTitle>
            <CardDescription>Internal notes about this customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-md p-4 border">
              <p className="text-gray-600 italic">No notes have been added for this customer.</p>
            </div>
            <div className="mt-4">
              <Button>Add Note</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
