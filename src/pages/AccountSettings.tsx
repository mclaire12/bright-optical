
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, User, Lock, CreditCard, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@/hooks/useAuth';

const AccountSettings = () => {
  const { user } = useAuth();
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "user@example.com",
    phone: "+250 78 123 4567"
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "04/25",
      isDefault: true
    },
    {
      id: 2,
      type: "Mobile Money",
      number: "078*****456",
      isDefault: false
    }
  ]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<any>(null);

  // Handle profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  // Save profile
  const saveProfile = () => {
    // This would save to API in a real application
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  // Change password
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would verify and update password in a real application
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Reset fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
  };

  // Open delete payment method dialog
  const openDeletePaymentDialog = (method: any) => {
    setCurrentPaymentMethod(method);
    setIsDeleteDialogOpen(true);
  };

  // Delete payment method
  const deletePaymentMethod = () => {
    if (currentPaymentMethod) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== currentPaymentMethod.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Payment method removed",
        description: "The payment method has been deleted from your account.",
      });
    }
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600">Manage your profile and account preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={profile.firstName} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={profile.lastName} 
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profile.phone} 
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={saveProfile} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={changePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password" 
                      value={passwordData.currentPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password" 
                      value={passwordData.newPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={passwordData.confirmPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </div>
                  <Button asChild className="mt-4 sm:mt-0">
                    <Link to="/add-payment-method">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                          <div className="space-y-1 mb-4 sm:mb-0">
                            <div className="flex items-center">
                              <h3 className="font-medium">{method.type}</h3>
                              {method.isDefault && (
                                <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {method.type === "Credit Card" 
                                ? `**** **** **** ${method.last4} • Expires ${method.expiry}`
                                : method.number
                              }
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {!method.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setDefaultPaymentMethod(method.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            
                            <Dialog open={isDeleteDialogOpen && currentPaymentMethod?.id === method.id} onOpenChange={setIsDeleteDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => openDeletePaymentDialog(method)}
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Remove Payment Method</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this payment method? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                  <Button variant="destructive" onClick={deletePaymentMethod}>Remove</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {paymentMethods.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4 text-center">
                        You haven't added any payment methods yet.
                      </p>
                      <Button asChild>
                        <Link to="/add-payment-method">Add Payment Method</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AccountSettings;
