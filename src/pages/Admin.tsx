
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, Package, Search, Settings, Users, Eye, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  
  // Sample data for the admin dashboard
  const dashboardData = {
    totalSales: 4850000,
    totalOrders: 128,
    totalCustomers: 97,
    totalProducts: 145,
    recentOrders: [
      { id: "ORD-2024-1342", customer: "John Smith", date: "Apr 18, 2024", total: 72000, status: "Processing" },
      { id: "ORD-2024-1341", customer: "Mary Johnson", date: "Apr 17, 2024", total: 45000, status: "Delivered" },
      { id: "ORD-2024-1340", customer: "Robert Keza", date: "Apr 17, 2024", total: 85000, status: "Processing" },
      { id: "ORD-2024-1339", customer: "Sarah Mutesi", date: "Apr 16, 2024", total: 34000, status: "Delivered" },
      { id: "ORD-2024-1338", customer: "David Mugabo", date: "Apr 15, 2024", total: 62000, status: "Shipped" }
    ],
    lowStockProducts: [
      { id: 23, name: "Round Metal Frames", category: "Eyeglasses", stock: 3 },
      { id: 45, name: "Polarized Aviator Sunglasses", category: "Sunglasses", stock: 5 },
      { id: 67, name: "Monthly Contact Lenses", category: "Contact Lenses", stock: 4 }
    ],
    products: [
      { id: 1, name: "Classic Round Frames", category: "Eyeglasses", price: 25000, stock: 12, status: "Active" },
      { id: 2, name: "Polarized Sunglasses", category: "Sunglasses", price: 35000, stock: 15, status: "Active" },
      { id: 3, name: "Monthly Contacts", category: "Contact Lenses", price: 20000, stock: 10, status: "Active" },
      { id: 4, name: "Designer Frames", category: "Eyeglasses", price: 45000, stock: 8, status: "Active" },
      { id: 5, name: "Aviator Sunglasses", category: "Sunglasses", price: 38000, stock: 5, status: "Active" }
    ],
    prescriptions: [
      { id: "PRESC-1243", customer: "Emma Williams", customerId: "CUST-1243", date: "Apr 18, 2024", status: "Pending Review" },
      { id: "PRESC-1242", customer: "Michael Johnson", customerId: "CUST-1242", date: "Apr 17, 2024", status: "Approved" },
      { id: "PRESC-1241", customer: "Sophie Taylor", customerId: "CUST-1241", date: "Apr 16, 2024", status: "Pending Review" }
    ]
  };

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  // Handle card clicks
  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2C]">Bright Optical Admin Portal</h1>
            <p className="text-gray-600">Store Management Dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button style={{ backgroundColor: "#7E69AB" }} asChild>
              <Link to="/admin/products/add">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => handleCardClick('/admin/analytics')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(dashboardData.totalSales)}</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => navigate('/admin?tab=orders')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
              <p className="text-xs text-gray-500">+5% from last month</p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => navigate('/admin?tab=customers')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
              <p className="text-xs text-gray-500">+8% from last month</p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => navigate('/admin?tab=products')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
              <p className="text-xs text-gray-500">+3 new this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Manage and process customer orders</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        className="pl-9 py-2 pr-4 border rounded-md w-60"
                      />
                    </div>
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 font-medium text-sm bg-slate-50">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Date</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div></div>
                  </div>
                  {dashboardData.recentOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-6 p-4 border-t items-center text-sm">
                      <div className="font-medium">{order.id}</div>
                      <div>{order.customer}</div>
                      <div className="text-gray-600">{order.date}</div>
                      <div>{formatPrice(order.total)}</div>
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                          order.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
                <CardDescription>Products that need to be restocked soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium text-sm bg-slate-50">
                    <div>Product Name</div>
                    <div>Category</div>
                    <div>Stock Level</div>
                    <div></div>
                  </div>
                  {dashboardData.lowStockProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-4 p-4 border-t items-center text-sm">
                      <div className="font-medium">{product.name}</div>
                      <div>{product.category}</div>
                      <div>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          {product.stock} left
                        </span>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/low-stock">Restock</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Products Inventory</CardTitle>
                    <CardDescription>Manage your product catalog</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-9 py-2 pr-4 border rounded-md w-60"
                      />
                    </div>
                    <Button variant="outline">Filter</Button>
                    <Button style={{ backgroundColor: "#7E69AB" }} asChild>
                      <Link to="/admin/products/add">Add Product</Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 font-medium text-sm bg-slate-50">
                    <div>Product Name</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Stock</div>
                    <div>Status</div>
                    <div></div>
                  </div>
                  {dashboardData.products.map((product) => (
                    <div key={product.id} className="grid grid-cols-6 p-4 border-t items-center text-sm">
                      <div className="font-medium">{product.name}</div>
                      <div>{product.category}</div>
                      <div>{formatPrice(product.price)}</div>
                      <div className={product.stock < 6 ? "text-red-600" : ""}>{product.stock} in stock</div>
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          product.status === "Active" ? "bg-green-100 text-green-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:text-red-700">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>View and manage customer information</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search customers..."
                        className="pl-9 py-2 pr-4 border rounded-md w-60"
                      />
                    </div>
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Date Joined</div>
                    <div>Orders</div>
                    <div></div>
                  </div>
                  <div className="grid grid-cols-5 p-4 border-t items-center text-sm">
                    <div className="font-medium">John Smith</div>
                    <div>john.smith@example.com</div>
                    <div className="text-gray-600">Mar 15, 2024</div>
                    <div>3</div>
                    <div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/admin/customers/CUST-123">View Profile</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-4 border-t items-center text-sm">
                    <div className="font-medium">Mary Johnson</div>
                    <div>mary.johnson@example.com</div>
                    <div className="text-gray-600">Feb 22, 2024</div>
                    <div>5</div>
                    <div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/admin/customers/CUST-124">View Profile</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-4 border-t items-center text-sm">
                    <div className="font-medium">Robert Keza</div>
                    <div>robert.keza@example.com</div>
                    <div className="text-gray-600">Apr 5, 2024</div>
                    <div>2</div>
                    <div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/admin/customers/CUST-125">View Profile</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Prescription Management</CardTitle>
                    <CardDescription>Review and process customer prescriptions</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search prescriptions..."
                        className="pl-9 py-2 pr-4 border rounded-md w-60"
                      />
                    </div>
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium text-sm bg-slate-50">
                    <div>Prescription ID</div>
                    <div>Customer</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div></div>
                  </div>
                  {dashboardData.prescriptions.map((prescription) => (
                    <div key={prescription.id} className="grid grid-cols-5 p-4 border-t items-center text-sm">
                      <div className="font-medium">{prescription.id}</div>
                      <div>
                        <Link to={`/admin/customers/${prescription.customerId}`} className="text-primary hover:underline">
                          {prescription.customer}
                        </Link>
                      </div>
                      <div className="text-gray-600">{prescription.date}</div>
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          prescription.status === "Approved" ? "bg-green-100 text-green-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {prescription.status}
                        </span>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/prescriptions/${prescription.id}`}>Review</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>View sales performance data</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-3xl">
                  <div className="flex justify-center items-center h-64 bg-slate-100 rounded-lg">
                    <BarChart className="h-16 w-16 text-gray-400" />
                    <p className="ml-4 text-gray-500">Analytics charts will be displayed here</p>
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0 px-4 pb-4">
                <Button className="w-full" asChild>
                  <Link to="/admin/analytics">View Detailed Analytics</Link>
                </Button>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-10 bg-[#7E69AB] rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Classic Round Frames</div>
                          <div className="text-sm text-gray-500">Eyeglasses</div>
                        </div>
                      </div>
                      <div className="font-medium">32 sold</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-10 bg-[#9b87f5] rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Polarized Sunglasses</div>
                          <div className="text-sm text-gray-500">Sunglasses</div>
                        </div>
                      </div>
                      <div className="font-medium">28 sold</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-10 bg-[#D6BCFA] rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Monthly Contacts</div>
                          <div className="text-sm text-gray-500">Contact Lenses</div>
                        </div>
                      </div>
                      <div className="font-medium">25 sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Eyeglasses</div>
                      <div className="font-medium">RWF 2,450,000</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#7E69AB] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Sunglasses</div>
                      <div className="font-medium">RWF 1,850,000</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#9b87f5] h-2.5 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Contact Lenses</div>
                      <div className="font-medium">RWF 950,000</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#D6BCFA] h-2.5 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
