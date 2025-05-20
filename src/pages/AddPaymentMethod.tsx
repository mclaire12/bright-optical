
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const AddPaymentMethod = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("creditCard");
  
  // Credit card form data
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });

  // Mobile money form data
  const [mobileData, setMobileData] = useState({
    phoneNumber: "",
    provider: "mtn"
  });

  // Handle credit card input changes
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value
    });
  };

  // Handle mobile money input changes
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMobileData({
      ...mobileData,
      [name]: value
    });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would process payment method addition in a real app
    toast({
      title: "Payment method added",
      description: "Your new payment method has been successfully added.",
    });
    
    navigate('/account-settings');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/account-settings" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account Settings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add Payment Method</h1>
          <p className="text-gray-600">Add a new payment method to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Type</CardTitle>
            <CardDescription>Select the type of payment method you want to add</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <RadioGroup 
                value={paymentType} 
                onValueChange={setPaymentType}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className={`border rounded-lg p-4 ${paymentType === 'creditCard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <RadioGroupItem value="creditCard" id="creditCard" className="sr-only" />
                  <Label 
                    htmlFor="creditCard" 
                    className="flex items-start cursor-pointer"
                  >
                    <CreditCard className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium">Credit/Debit Card</span>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or other cards</p>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 ${paymentType === 'mobileMoney' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <RadioGroupItem value="mobileMoney" id="mobileMoney" className="sr-only" />
                  <Label 
                    htmlFor="mobileMoney" 
                    className="flex items-start cursor-pointer"
                  >
                    <Smartphone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium">Mobile Money</span>
                      <p className="text-sm text-gray-500">Pay with MTN Mobile Money or Airtel Money</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              {paymentType === 'creditCard' ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Credit Card Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      name="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input 
                      id="cardholderName" 
                      name="cardholderName" 
                      placeholder="John Doe" 
                      value={cardData.cardholderName}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Expiry Month</Label>
                      <select 
                        id="expiryMonth" 
                        name="expiryMonth" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={cardData.expiryMonth}
                        onChange={handleCardChange}
                        required
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Expiry Year</Label>
                      <select 
                        id="expiryYear" 
                        name="expiryYear" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={cardData.expiryYear}
                        onChange={handleCardChange}
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv" 
                        name="cvv" 
                        placeholder="123" 
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Mobile Money Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="provider">Mobile Money Provider</Label>
                    <select 
                      id="provider" 
                      name="provider" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={mobileData.provider}
                      onChange={handleMobileChange}
                      required
                    >
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="airtel">Airtel Money</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      placeholder="078 1234 567" 
                      value={mobileData.phoneNumber}
                      onChange={handleMobileChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your payment information is securely stored and processed. We never store your full card details on our servers.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AddPaymentMethod;
