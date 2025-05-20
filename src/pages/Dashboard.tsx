
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Package, ShoppingBag, User, Heart, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    joinDate: "May 2023",
    prescriptions: 2,
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
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Main Street",
        city: "Kigali",
        district: "Nyarugenge",
        isDefault: true
      },
      {
        id: 2,
        type: "Work",
        street: "456 Business Avenue",
        city: "Kigali",
        district: "Kicukiro",
        isDefault: false
      }
    ],
    wishlist: [
      {
        id: 1,
        name: "Designer Sunglasses",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
        price: 45000
      },
      {
        id: 2,
        name: "Blue Light Glasses",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
        price: 28000
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
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/upload-prescription">Upload Prescription</Link>
            </Button>
            <Button asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.orders.length}</div>
                  <p className="text-xs text-gray-500">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Saved Prescriptions</CardTitle>
                  <Eye className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.prescriptions}</div>
                  <p className="text-xs text-gray-500">Active prescriptions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
                  <Heart className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.wishlist.length}</div>
                  <p className="text-xs text-gray-500">Saved items</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Addresses</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.addresses.length}</div>
                  <p className="text-xs text-gray-500">Delivery locations</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                  <div>Order ID</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Total</div>
                  <div></div>
                </div>
                {user.orders.slice(0, 3).map((order) => (
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
                        <Link to={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {user.orders.length > 3 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/orders">View All Orders</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track all your past and current orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                    <div>Order ID</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Total</div>
                    <div></div>
                  </div>
                  {user.orders.map((order) => (
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
                          <Link to={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>Manage your saved eye prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-6 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Current Prescription</h3>
                        <p className="text-sm text-gray-500 mt-1">Uploaded on March 15, 2024</p>
                        <div className="mt-4 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-medium">Right Eye:</span> -1.25, CYL -0.75
                            </div>
                            <div>
                              <span className="font-medium">Left Eye:</span> -1.50, CYL -0.50
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Previous Prescription</h3>
                        <p className="text-sm text-gray-500 mt-1">Uploaded on October 10, 2023</p>
                        <div className="mt-4 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-medium">Right Eye:</span> -1.00, CYL -0.50
                            </div>
                            <div>
                              <span className="font-medium">Left Eye:</span> -1.25, CYL -0.25
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/upload-prescription">Upload New Prescription</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{item.name}</h3>
                        <p className="text-primary font-bold mb-4">{formatPrice(item.price)}</p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/products/${item.id}`}>View</Link>
                          </Button>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>My Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="bg-slate-50 p-6 rounded-lg border relative">
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{address.type}</h3>
                          <div className="mt-2 space-y-1 text-sm">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.district}</p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          {!address.isDefault && (
                            <Button variant="outline" size="sm">Set as Default</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add New Address</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                    <div className="bg-slate-50 p-6 rounded-lg border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input type="text" value={user.name} className="w-full px-3 py-2 border rounded-md" readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input type="email" value={user.email} className="w-full px-3 py-2 border rounded-md" readOnly />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline">Edit Profile</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Security</h3>
                    <div className="bg-slate-50 p-6 rounded-lg border">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value="••••••••" className="w-full px-3 py-2 border rounded-md" readOnly />
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
                    <div className="bg-slate-50 p-6 rounded-lg border">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500">Expires 04/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                      <Button>Add Payment Method</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
