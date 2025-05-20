
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Sample user data
const SAMPLE_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: false
  },
  {
    id: '2',
    email: 'admin@brightoptical.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true
  }
];

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const isAdmin = user?.isAdmin || false;

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('brightOpticalUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call/validation
    const foundUser = SAMPLE_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      // Remove password before storing user
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('brightOpticalUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.firstName}!`,
      });
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brightOpticalUser');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
