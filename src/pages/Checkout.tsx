import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, Map, CreditCard, Check, ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Payment method options
const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    image: 'https://images.unsplash.com/photo-1611174340587-7cf0522c993c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'airtel-money',
    name: 'Airtel Money',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  }
];

// Mock prescription data analysis function to calculate additional price
const analyzePrescription = (prescriptionData: string | null) => {
  if (!prescriptionData) return 0;
  
  // In a real scenario, this would analyze the prescription data
  // For demo purposes, we'll return a calculated value between 5000-20000
  return Math.floor(Math.random() * 15000) + 5000;
};

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prescriptionData, setPrescriptionData] = useState<string | null>(null);
  const [prescriptionPrice, setPrescriptionPrice] = useState<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to proceed with checkout",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);
  
  // Pre-populate form with user data if available
  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    notes: "",
  };
  
  // Schema for shipping form
  const shippingSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    address: z.string().min(5, { message: "Address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    province: z.string().min(2, { message: "Province is required" }),
    zipCode: z.string().optional(),
    notes: z.string().optional(),
  });
  
  const shippingForm = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues,
  });

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  // If no items in cart, redirect to products
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
      });
      navigate('/products');
    }
  }, [items, navigate, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL for image files
      if (selectedFile.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
        
        // Mock prescription data analysis
        setPrescriptionData("Sample prescription data for " + selectedFile.name);
        const additionalPrice = analyzePrescription("Sample prescription data");
        setPrescriptionPrice(additionalPrice);
      } else {
        setPreview(null);
        // Mock prescription data analysis for non-image files like PDFs
        setPrescriptionData("Sample prescription data for " + selectedFile.name);
        const additionalPrice = analyzePrescription("Sample prescription data");
        setPrescriptionPrice(additionalPrice);
      }
    }
  };

  const handleProceedToPayment = () => {
    if (!shippingForm.formState.isValid) {
      toast({
        title: "Missing information",
        description: "Please fill out all required shipping details.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would process the payment and create an order
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
    
    // Clear cart after successful order
    clearCart();
    
    // Redirect to home page or order confirmation page
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const subtotal = totalPrice;
  const shipping = 2000;
  const tax = totalPrice * 0.18;
  const total = subtotal + shipping + tax + prescriptionPrice;

  // If not authenticated, show login prompt
  if (!user) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Login Required</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <LogIn className="h-16 w-16 text-primary" />
              <p className="text-center">Please login to your account to proceed with checkout.</p>
              <Button className="w-full" asChild>
                <Link to="/login">
                  Login to Continue
                </Link>
              </Button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Render based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...shippingForm}>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="johndoe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="078XXXXXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={shippingForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Kigali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="province"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Province/District</FormLabel>
                              <FormControl>
                                <Input placeholder="Kicukiro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="00000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={shippingForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Special delivery instructions or landmark directions" 
                                className="min-h-[80px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Prescription Upload Section - Optional */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Prescription Upload (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      If your purchase requires a prescription, please upload it here. 
                      This will help us customize your eyewear according to your needs.
                    </p>
                    
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Input
                        id="prescription"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="prescription" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-gray-600 font-medium">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          JPG, PNG or PDF (max. 5MB)
                        </span>
                      </Label>
                    </div>
                    
                    {preview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Preview:</p>
                        <div className="border rounded-md overflow-hidden">
                          <img src={preview} alt="Prescription preview" className="max-h-[150px] max-w-full object-contain mx-auto" />
                        </div>
                      </div>
                    )}
                    
                    {prescriptionData && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-green-800">Prescription Analyzed</h4>
                            <p className="text-xs text-green-700 mt-1">
                              Additional cost based on prescription requirements: {formatPrice(prescriptionPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Cart Items Summary */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      {prescriptionPrice > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Prescription Adjustments</span>
                          <span>{formatPrice(prescriptionPrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-2">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleProceedToPayment} 
                      className="w-full mt-4"
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map(method => (
                        <div 
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === method.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                              <img 
                                src={method.image} 
                                alt={method.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{method.name}</h3>
                              <p className="text-xs text-gray-500">
                                {method.id === 'credit-card' ? 'Visa, Mastercard, etc.' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Details - Show only when a method is selected */}
                    {selectedPayment === 'credit-card' && (
                      <Collapsible open={true} className="mt-4">
                        <CollapsibleContent>
                          <div className="p-4 border rounded-lg space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="name">Name on Card</Label>
                              <Input id="name" placeholder="John Doe" />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {selectedPayment === 'mtn-momo' && (
                      <Collapsible open={true} className="mt-4">
                        <CollapsibleContent>
                          <div className="p-4 border rounded-lg space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone-number">MTN Mobile Number</Label>
                              <Input id="phone-number" placeholder="078XXXXXXX" />
                            </div>
                            <p className="text-sm text-gray-600">
                              You will receive a payment prompt on your MTN phone.
                              Enter your PIN to authorize payment.
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {selectedPayment === 'airtel-money' && (
                      <Collapsible open={true} className="mt-4">
                        <CollapsibleContent>
                          <div className="p-4 border rounded-lg space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="airtel-number">Airtel Money Number</Label>
                              <Input id="airtel-number" placeholder="073XXXXXXX" />
                            </div>
                            <p className="text-sm text-gray-600">
                              You will receive a payment prompt on your Airtel phone.
                              Enter your PIN to authorize payment.
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {selectedPayment === 'paypal' && (
                      <Collapsible open={true} className="mt-4">
                        <CollapsibleContent>
                          <div className="p-4 border rounded-lg space-y-4">
                            <p className="text-sm text-gray-600">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                            <div className="flex justify-center">
                              <Button variant="outline">
                                Continue to PayPal
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Cart Items Summary */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      {prescriptionPrice > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Prescription Adjustments</span>
                          <span>{formatPrice(prescriptionPrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-2">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mt-4">
                      <Button 
                        onClick={handlePlaceOrder}
                        className="w-full"
                        disabled={!selectedPayment}
                      >
                        Place Order
                        <Check className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex flex-col items-center space-y-1 ${step === 1 ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${step === 1 ? 'bg-primary' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            
            <div className={`w-16 md:w-32 h-1 ${step > 1 ? 'bg-primary' : 'bg-gray-300'} mx-4`}></div>
            
            <div className={`flex flex-col items-center space-y-1 ${step === 2 ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Content */}
        {renderStep()}
      </div>
    </Layout>
  );
};

export default Checkout;
