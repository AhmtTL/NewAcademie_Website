import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, User } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    name: string,
    role: string,
    phone: string,
    school_name: string,
    grade: string,
    city: string,
    parent_name?: string,
    parent_email?: string,
    parent_phone_number?: string
  ) => Promise<{ success: boolean; error?: string; fieldErrors?: Record<string, string> }>;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { isAuthenticated, user: authenticatedUser } = await authAPI.initializeAuth();
        
        if (isAuthenticated && authenticatedUser && authenticatedUser.name && authenticatedUser.email) {
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with email and password
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const result = await authAPI.login({ email, password });
      
      if (result.success && result.user && result.user.name && result.user.email) {
        setUser(result.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: result.error || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error in context:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred during login' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const signup = async (
    email: string,
    password: string, 
    name: string, 
    role: string, 
    phone: string,
    school_name: string,
    grade: string,
    city: string,
    parent_name?: string,
    parent_email?: string,
    parent_phone_number?: string
  ): Promise<{ success: boolean; error?: string; fieldErrors?: Record<string, string> }> => {
    setIsLoading(true);
    
    try {
      const result = await authAPI.register({
        name,
        email,
        phone,
        role,
        password,
        password_confirmation: password,
        school_name,
        grade,
        city,
        parent_name,
        parent_email,
        parent_phone_number
      });
      
      if (result.success && result.user && result.user.name && result.user.email) {
        setUser(result.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: result.error || 'Registration failed',
          fieldErrors: result.fieldErrors
        };
      }
    } catch (error) {
      console.error('Registration error in context:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred during registration' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh user profile data
   */
  const refreshProfile = async (): Promise<void> => {
    try {
      const result = await authAPI.getProfile();
      if (result.success && result.user && result.user.name && result.user.email) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  /**
   * Logout user and clear all stored data
   */
  const logout = async (): Promise<void> => {
    try {
      // Call logout API to invalidate token on server
      await authAPI.logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Continue with local logout even if server request fails
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup,
    isLoading,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 