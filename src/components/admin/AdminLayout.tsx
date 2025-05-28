import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart
    },
    {
      title: 'Customers',
      href: '/admin/users',
      icon: Users
    },
    {
      title: 'Prescriptions',
      href: '/admin/prescriptions',
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-16">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-[#7E69AB] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#7E69AB]"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 px-6">
            <Button asChild className="w-full">
              <Link to="/">
                <Eye className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
          </div>
        
      </div>

      {/* Main Content */}
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
