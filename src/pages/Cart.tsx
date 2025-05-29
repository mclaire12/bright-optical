
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, prescriptionData } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate("/login", { state: { redirect: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleIncrementQuantity = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild style={{ backgroundColor: "#7E69AB" }}>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <Card key={item.id} className="mb-4 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm">{item.pharmacy}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDecrementQuantity(item.id, item.quantity)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleIncrementQuantity(item.id, item.quantity)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">RWF {item.price.toLocaleString()}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>RWF {totalPrice.toLocaleString()}</span>
                </div>
                
                {prescriptionData && (
                  <div className="flex justify-between text-[#7E69AB]">
                    <span>Prescription Cost</span>
                    <span>RWF {prescriptionData.additionalPrice.toLocaleString()}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>RWF {(totalPrice + (prescriptionData?.additionalPrice || 0)).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                {/* {!prescriptionData && (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/upload-prescription">Add Prescription</Link>
                  </Button>
                )} */}
                
                <Button 
                  className="w-full" 
                  style={{ backgroundColor: "#7E69AB" }}
                  onClick={handleCheckout}
                >
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
