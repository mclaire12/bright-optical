
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UploadPrescription from "./pages/UploadPrescription";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import React from "react";
import OrderDetails from "./pages/OrderDetails";
import ProductEdit from "./pages/admin/ProductEdit";
import LowStockRestock from "./pages/admin/LowStockRestock";
import CustomerProfile from "./pages/admin/CustomerProfile";
import PrescriptionReview from "./pages/admin/PrescriptionReview";
import SalesAnalytics from "./pages/admin/SalesAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AddProduct from "./pages/admin/AddProduct";
import MyPrescription from "./pages/MyPrescription";
import AddressManagement from "./pages/AddressManagement";
import AccountSettings from "./pages/AccountSettings";
import AddPaymentMethod from "./pages/AddPaymentMethod";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/upload-prescription" element={<UploadPrescription />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} />
                <Route path="/admin/products/edit/:productId" element={<ProductEdit />} />
                <Route path="/admin/low-stock" element={<LowStockRestock />} />
                <Route path="/admin/customers/:customerId" element={<CustomerProfile />} />
                <Route path="/admin/prescriptions/:prescriptionId" element={<PrescriptionReview />} />
                <Route path="/admin/analytics" element={<SalesAnalytics />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/my-prescriptions/:prescriptionId" element={<MyPrescription />} />
                <Route path="/address-management" element={<AddressManagement />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/add-payment-method" element={<AddPaymentMethod />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
