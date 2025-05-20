
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, LogOut, User } from "lucide-react";
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#7E69AB]">Bright Optical</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#7E69AB] px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-[#7E69AB] px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-[#7E69AB] px-3 py-2 rounded-md text-sm font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#7E69AB] px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#7E69AB] px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#7E69AB] w-5 h-5 rounded-full text-white text-xs flex items-center justify-center">{totalItems}</span>
                )}
              </Link>
            </Button>
            
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    My Account
                  </Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" asChild>
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild style={{ backgroundColor: "#7E69AB" }}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#7E69AB] w-5 h-5 rounded-full text-white text-xs flex items-center justify-center">{totalItems}</span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar (toggleable) */}
        {isSearchOpen && (
          <div className="py-4 px-2 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7E69AB]"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2" 
                onClick={toggleSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
                  My Account
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium">
                    Admin Portal
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left text-gray-700 hover:text-[#7E69AB] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 py-3">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="w-full" style={{ backgroundColor: "#7E69AB" }}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
