
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Settings, Save, User, Store, Bell, Shield, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  // Sample store settings
  const [storeSettings, setStoreSettings] = useState({
    name: "Bright Optical",
    email: "contact@brightoptical.com",
    phone: "+250 78 123 4567",
    address: "123 Main Street, Kigali, Rwanda",
    logo: "/placeholder.svg",
    socialMedia: {
      facebook: "https://facebook.com/brightoptical",
      instagram: "https://instagram.com/brightoptical",
      twitter: "https://twitter.com/brightoptical"
    },
    description: "Bright Optical is a premier eyewear provider offering a wide range of prescription glasses, sunglasses, and contact lenses at affordable prices."
  });

  // Sample notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockNotifications: true,
    customerSignups: false,
    prescriptionUploads: true,
    marketingEmails: true
  });

  // Sample payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    cashOnDelivery: true,
    mobilePayment: true,
    creditCard: false,
    bankTransfer: true,
    orderMinimum: 5000,
    deliveryFee: 2000
  });

  // Sample account settings
  const [accountSettings, setAccountSettings] = useState({
    email: "admin@brightoptical.com",
    name: "Admin User"
  });

  // Handle store settings change
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested social media properties
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setStoreSettings({
        ...storeSettings,
        socialMedia: {
          ...storeSettings.socialMedia,
          [socialKey]: value
        }
      });
    } else {
      setStoreSettings({
        ...storeSettings,
        [name]: value
      });
    }
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Handle payment toggle
  const handlePaymentToggle = (setting: keyof typeof paymentSettings) => {
    if (typeof paymentSettings[setting] === 'boolean') {
      setPaymentSettings({
        ...paymentSettings,
        [setting]: !paymentSettings[setting]
      });
    }
  };

  // Handle payment settings change
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: Number(value)
    });
  };

  // Handle account settings change
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings({
      ...accountSettings,
      [name]: value
    });
  };

  // Save settings
  const handleSaveSettings = () => {
    // This would save to API in a real application
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
            <p className="text-gray-600">Configure your store and application settings</p>
          </div>
          <Button onClick={handleSaveSettings} className="flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <Tabs defaultValue="store" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="store" className="flex items-center">
              <Store className="h-4 w-4 mr-2" />
              Store Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Update your store details and public information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="name" 
                      value={storeSettings.name} 
                      onChange={handleStoreChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input 
                      id="storeEmail" 
                      name="email" 
                      type="email" 
                      value={storeSettings.email} 
                      onChange={handleStoreChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input 
                      id="storePhone" 
                      name="phone" 
                      value={storeSettings.phone} 
                      onChange={handleStoreChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Input 
                      id="storeAddress" 
                      name="address" 
                      value={storeSettings.address} 
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea 
                    id="storeDescription" 
                    name="description" 
                    value={storeSettings.description} 
                    onChange={handleStoreChange}
                    rows={4}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Store Logo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border rounded-md overflow-hidden">
                      <img 
                        src={storeSettings.logo} 
                        alt="Store Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input 
                        id="facebook" 
                        name="socialMedia.facebook" 
                        value={storeSettings.socialMedia.facebook} 
                        onChange={handleStoreChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input 
                        id="instagram" 
                        name="socialMedia.instagram" 
                        value={storeSettings.socialMedia.instagram} 
                        onChange={handleStoreChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input 
                        id="twitter" 
                        name="socialMedia.twitter" 
                        value={storeSettings.socialMedia.twitter} 
                        onChange={handleStoreChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Store Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderNotifications">Order Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications when new orders are placed</p>
                    </div>
                    <Switch 
                      id="orderNotifications" 
                      checked={notificationSettings.orderNotifications}
                      onCheckedChange={() => handleNotificationToggle('orderNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lowStockNotifications">Low Stock Alerts</Label>
                      <p className="text-sm text-gray-500">Receive notifications when products are running low on stock</p>
                    </div>
                    <Switch 
                      id="lowStockNotifications" 
                      checked={notificationSettings.lowStockNotifications}
                      onCheckedChange={() => handleNotificationToggle('lowStockNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="customerSignups">New Customer Signups</Label>
                      <p className="text-sm text-gray-500">Receive notifications when new customers register</p>
                    </div>
                    <Switch 
                      id="customerSignups" 
                      checked={notificationSettings.customerSignups}
                      onCheckedChange={() => handleNotificationToggle('customerSignups')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="prescriptionUploads">Prescription Uploads</Label>
                      <p className="text-sm text-gray-500">Receive notifications when customers upload new prescriptions</p>
                    </div>
                    <Switch 
                      id="prescriptionUploads" 
                      checked={notificationSettings.prescriptionUploads}
                      onCheckedChange={() => handleNotificationToggle('prescriptionUploads')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive marketing and promotional notifications</p>
                    </div>
                    <Switch 
                      id="marketingEmails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                      <p className="text-sm text-gray-500">Allow customers to pay with cash when delivery arrives</p>
                    </div>
                    <Switch 
                      id="cashOnDelivery" 
                      checked={paymentSettings.cashOnDelivery}
                      onCheckedChange={() => handlePaymentToggle('cashOnDelivery')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobilePayment">Mobile Payment</Label>
                      <p className="text-sm text-gray-500">Allow customers to pay using mobile money services</p>
                    </div>
                    <Switch 
                      id="mobilePayment" 
                      checked={paymentSettings.mobilePayment}
                      onCheckedChange={() => handlePaymentToggle('mobilePayment')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="creditCard">Credit Card</Label>
                      <p className="text-sm text-gray-500">Allow customers to pay using credit/debit cards</p>
                    </div>
                    <Switch 
                      id="creditCard" 
                      checked={paymentSettings.creditCard}
                      onCheckedChange={() => handlePaymentToggle('creditCard')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bankTransfer">Bank Transfer</Label>
                      <p className="text-sm text-gray-500">Allow customers to pay using bank transfers</p>
                    </div>
                    <Switch 
                      id="bankTransfer" 
                      checked={paymentSettings.bankTransfer}
                      onCheckedChange={() => handlePaymentToggle('bankTransfer')}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderMinimum">Minimum Order Amount (RWF)</Label>
                    <Input 
                      id="orderMinimum" 
                      name="orderMinimum" 
                      type="number" 
                      value={paymentSettings.orderMinimum} 
                      onChange={handlePaymentChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Standard Delivery Fee (RWF)</Label>
                    <Input 
                      id="deliveryFee" 
                      name="deliveryFee" 
                      type="number" 
                      value={paymentSettings.deliveryFee} 
                      onChange={handlePaymentChange}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Payment Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your admin account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Your Name</Label>
                    <Input 
                      id="accountName" 
                      name="name" 
                      value={accountSettings.name} 
                      onChange={handleAccountChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountEmail">Email Address</Label>
                    <Input 
                      id="accountEmail" 
                      name="email" 
                      type="email" 
                      value={accountSettings.email} 
                      onChange={handleAccountChange}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <Button className="mt-4">Change Password</Button>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security options for your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Secure your account with two-factor authentication</p>
                    </div>
                    <Switch id="twoFactorAuth" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="loginNotifications">Login Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                    </div>
                    <Switch id="loginNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="passwordExpiry">Password Expiry</Label>
                      <p className="text-sm text-gray-500">Require password change every 90 days</p>
                    </div>
                    <Switch id="passwordExpiry" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminSettings;
