
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  pharmacy: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface PrescriptionData {
  file: string | null;
  data: string | null;
  additionalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  prescriptionData: PrescriptionData | null;
  setPrescriptionData: (data: PrescriptionData | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    
    // Load prescription data from localStorage
    const savedPrescription = localStorage.getItem('prescriptionData');
    if (savedPrescription) {
      try {
        setPrescriptionData(JSON.parse(savedPrescription));
      } catch (e) {
        console.error('Failed to parse prescription data from localStorage', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Save prescription data to localStorage whenever it changes
  useEffect(() => {
    if (prescriptionData) {
      localStorage.setItem('prescriptionData', JSON.stringify(prescriptionData));
    } else {
      localStorage.removeItem('prescriptionData');
    }
  }, [prescriptionData]);
  
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.success(`Added another ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`${product.name} added to your cart`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      toast.info('Item removed from cart');
      return updatedItems;
    });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    setPrescriptionData(null);
    toast.info('Cart has been cleared');
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      prescriptionData,
      setPrescriptionData
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
