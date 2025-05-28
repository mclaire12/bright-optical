
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { userService } from '@/services/userService';

// Define user type
type Profile = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null; 
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast: uiToast } = useToast();
  
  // Function to fetch user profile and role from database
  const fetchProfileAndRole = async (userId: string) => {
    try {
      const [userProfile, userRole] = await Promise.all([
        userService.getCurrentUserProfile(),
        userService.getUserRole(userId)
      ]);
      
      if (userProfile) {
        setProfile({
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          isAdmin: userRole?.role === 'admin'
        });
      }
    } catch (error) {
      console.error('Error in fetchProfileAndRole:', error);
    }
  };

  // Check for existing session and set up auth state listener
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile in a separate call to avoid Supabase auth deadlock
          setTimeout(() => {
            fetchProfileAndRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          await fetchProfileAndRole(data.session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        toast.success("Account created successfully! Please check your email for verification.");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error("Failed to create account. Please try again.");
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        toast.success(`Welcome back!`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Failed to log in. Please check your credentials.");
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.info("You have been logged out");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isAdmin = profile?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      isAdmin, 
      login, 
      signup, 
      logout, 
      isLoading 
    }}>
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
