import axios, { AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    'REACT_APP_API_BASE_URL environment variable is required. ' +
    'Please check your .env.local file or deployment configuration.'
  );
}
const TOKEN_KEY = 'nyea_auth_token';
const USER_KEY = 'nyea_user_data';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Types based on API responses
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  email_verified_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  school_name: string;
  grade: string;
  city: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    token_type: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  password_confirmation: string;
  school_name: string;
  grade: string;
  city: string;
  parent_name?: string;
  parent_email?: string;
  parent_phone_number?: string;
}

// Token management utilities
export const tokenManager = {
  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  },

  /**
   * Store authentication token securely
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      // Set default authorization header for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error storing token in localStorage:', error);
    }
  },

  /**
   * Remove authentication token
   */
  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      // Remove authorization header
      delete apiClient.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }
};

// User data management utilities
export const userManager = {
  /**
   * Get stored user data
   */
  getUser(): User | null {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data from localStorage:', error);
      return null;
    }
  },

  /**
   * Store user data
   */
  setUser(user: User): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user data in localStorage:', error);
    }
  },

  /**
   * Remove user data
   */
  removeUser(): void {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user data from localStorage:', error);
    }
  }
};

// Request interceptor to automatically attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear stored data
      tokenManager.removeToken();
      userManager.removeUser();
      
      // Only redirect if we're not already on auth pages
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/signin') && !currentPath.includes('/signup')) {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API Service
 */
export const authAPI = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response: AxiosResponse<AuthResponse> = await apiClient.post('/login', credentials);
      
      if (response.data.success && response.data.data?.token && response.data.data?.user) {
        // Store token and user data
        tokenManager.setToken(response.data.data.token);
        userManager.setUser(response.data.data.user);
        
        return {
          success: true,
          user: response.data.data.user
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || 'Network error';
        return {
          success: false,
          error: message
        };
      }
      
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string; fieldErrors?: Record<string, string> }> {
    try {
      const response: AxiosResponse<AuthResponse> = await apiClient.post('/register', data);
      
      if (response.data.success && response.data.data?.token && response.data.data?.user) {
        // Store token and user data
        tokenManager.setToken(response.data.data.token);
        userManager.setUser(response.data.data.user);
        
        return {
          success: true,
          user: response.data.data.user
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data: any = error.response?.data;
        const message = data?.message || error.message || 'Network error';

        // Map backend validation errors (422) to flat fieldErrors map
        let fieldErrors: Record<string, string> | undefined;
        if (status === 422 && data?.errors && typeof data.errors === 'object') {
          fieldErrors = Object.entries<any>(data.errors).reduce((acc, [field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              acc[field] = String(messages[0]);
            }
            return acc;
          }, {} as Record<string, string>);
        }

        return {
          success: false,
          error: message,
          ...(fieldErrors ? { fieldErrors } : {})
        };
      }
      
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  },

  /**
   * Fetch user profile information
   */
  async getProfile(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response: AxiosResponse<AuthResponse> = await apiClient.get('/profile');
      
      if (response.data.success && response.data.data?.user) {
        // Update stored user data
        userManager.setUser(response.data.data.user);
        
        return {
          success: true,
          user: response.data.data.user
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Failed to fetch profile'
        };
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message || 'Network error';
        return {
          success: false,
          error: message
        };
      }
      
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  },

  /**
   * Logout user and clear stored data
   */
  async logout(): Promise<void> {
    try {
      // Call server to invalidate token
      await apiClient.post('/logout');
    } catch (error) {
      console.error('Server logout error:', error);
      // Continue with local logout even if server request fails
    } finally {
      // Always clear local data
      tokenManager.removeToken();
      userManager.removeUser();
    }
  },

  /**
   * Initialize authentication state on app startup
   */
  async initializeAuth(): Promise<{ isAuthenticated: boolean; user?: User }> {
    const token = tokenManager.getToken();
    
    if (!token) {
      return { isAuthenticated: false };
    }

    // Try to fetch fresh user data to validate token
    try {
      const result = await this.getProfile();
      
      if (result.success && result.user) {
        return {
          isAuthenticated: true,
          user: result.user
        };
      } else {
        // Token is invalid, clear local data
        tokenManager.removeToken();
        userManager.removeUser();
        return { isAuthenticated: false };
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // Clear potentially invalid data
      tokenManager.removeToken();
      userManager.removeUser();
      return { isAuthenticated: false };
    }
  }
};

export default authAPI; 