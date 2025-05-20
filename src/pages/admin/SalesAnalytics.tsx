
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, ChartBar, ChartLine, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Sample analytics data
  const monthlySalesData = [
    { name: 'Jan', sales: 240000 },
    { name: 'Feb', sales: 300000 },
    { name: 'Mar', sales: 280000 },
    { name: 'Apr', sales: 350000 },
    { name: 'May', sales: 390000 },
    { name: 'Jun', sales: 420000 },
    { name: 'Jul', sales: 380000 },
    { name: 'Aug', sales: 450000 },
    { name: 'Sep', sales: 500000 },
    { name: 'Oct', sales: 570000 },
    { name: 'Nov', sales: 620000 },
    { name: 'Dec', sales: 700000 },
  ];
  
  const categoryData = [
    { name: 'Eyeglasses', value: 45 },
    { name: 'Sunglasses', value: 30 },
    { name: 'Contact Lenses', value: 20 },
    { name: 'Accessories', value: 5 },
  ];
  
  const topProductsData = [
    { name: 'Classic Round Frames', sales: 1250000 },
    { name: 'Polarized Sunglasses', sales: 980000 },
    { name: 'Monthly Contacts', sales: 850000 },
    { name: 'Designer Frames', sales: 780000 },
    { name: 'Aviator Sunglasses', sales: 650000 },
  ];
  
  const salesTrendData = [
    { name: 'Week 1', current: 120000, previous: 90000 },
    { name: 'Week 2', current: 135000, previous: 95000 },
    { name: 'Week 3', current: 145000, previous: 110000 },
    { name: 'Week 4', current: 160000, previous: 120000 },
  ];

  // COLORS for pie chart
  const COLORS = ['#7E69AB', '#9b87f5', '#D6BCFA', '#E5DEFF'];
  
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
            <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
            <p className="text-gray-600">Analyze store performance and sales trends</p>
          </div>
          <div className="flex gap-2 items-center">
            <Select 
              value={timeRange} 
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{formatPrice(4850000)}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% from last month
                  </p>
                </div>
                <ChartBar className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{formatPrice(37890)}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3% from last month
                  </p>
                </div>
                <ChartLine className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.5% from last month
                  </p>
                </div>
                <ChartLine className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Sales performance over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value/1000}k`} />
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Legend />
                      <Bar dataKey="sales" fill="#7E69AB" name="Sales (RWF)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing products by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topProductsData.map((product, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 flex justify-center">
                          <span className="font-bold text-gray-500">#{index + 1}</span>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{formatPrice(product.sales)}</div>
                        </div>
                        <div className="w-1/3">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-[#7E69AB] rounded-full" 
                              style={{ width: `${(product.sales / topProductsData[0].sales) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current stock levels of top products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Classic Round Frames</h3>
                        <p className="text-sm text-gray-500">Eyeglasses</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">12 in stock</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link to="/admin/low-stock">Restock</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Polarized Sunglasses</h3>
                        <p className="text-sm text-gray-500">Sunglasses</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">5 in stock</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link to="/admin/low-stock">Restock</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Monthly Contacts</h3>
                        <p className="text-sm text-gray-500">Contact Lenses</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">20 in stock</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link to="/admin/products/edit/3">View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Product category distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Growth by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Eyeglasses</span>
                        <span className="text-green-600">+12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#7E69AB] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">45% of total sales</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Sunglasses</span>
                        <span className="text-green-600">+8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#9b87f5] h-2.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">30% of total sales</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Contact Lenses</span>
                        <span className="text-green-600">+15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#D6BCFA] h-2.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">20% of total sales</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Accessories</span>
                        <span className="text-red-600">-3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#E5DEFF] h-2.5 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">5% of total sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Sales Trend</CardTitle>
                <CardDescription>Comparing current period with previous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesTrendData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value/1000}k`} />
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="current" stroke="#7E69AB" name="Current Period" strokeWidth={2} />
                      <Line type="monotone" dataKey="previous" stroke="#D6BCFA" name="Previous Period" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SalesAnalytics;
