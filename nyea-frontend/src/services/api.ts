/**
 * Centralized API client for backend communications
 * Simplified and optimized for production use
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import type { 
  CreateCheckoutSessionRequest, 
  CreateCheckoutSessionResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse
} from '../types/stripe';

class APIClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Use environment variable directly without Stripe config dependency
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    
    // Validate required environment variable
    if (!apiBaseUrl) {
      throw new Error(
        'REACT_APP_API_BASE_URL environment variable is required. ' +
        'Please check your .env.local file or deployment configuration.'
      );
    }
    
    // Validate URL format
    try {
      new URL(apiBaseUrl);
    } catch {
      throw new Error(
        `Invalid REACT_APP_API_BASE_URL format: ${apiBaseUrl}. ` +
        'Please provide a valid URL (e.g., http://localhost:8000/api/v1)'
      );
    }
    
    this.baseURL = apiBaseUrl;
    
    this.client = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Get Stripe config only when needed (lazy loading)
   */
  private getStripeConfig() {
    const getStripeConfig = require('../config/stripe').default;
    return getStripeConfig();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('nyea_auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle auth errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('nyea_auth_token');
          localStorage.removeItem('nyea_user_data');
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Create Stripe checkout session
   */
  async createCheckoutSession(
    request: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    try {
      // Ensure Stripe config is available before making Stripe-related requests
      this.getStripeConfig();
      
      // Check if user token exists and conditionally add Authorization header
      const token = localStorage.getItem('nyea_auth_token');
      const headers: Record<string, string> = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        const response = await this.client.post<CreateCheckoutSessionResponse>(
          '/user/stripe/create-checkout-session',
          request,
          { headers }
        );
        return response.data;
      }
      else {
        const response = await this.client.post<CreateCheckoutSessionResponse>(
          '/stripe/create-checkout-session',
          request
        );
        return response.data;
      }
      
     
    } catch (error) {
      throw this.handleError(error, 'Failed to create checkout session');
    }
  }

  /**
   * Verify payment after successful checkout
   */
  async verifyPayment(
    request: VerifyPaymentRequest
  ): Promise<VerifyPaymentResponse> {
    try {
      // Ensure Stripe config is available before making Stripe-related requests
      this.getStripeConfig();
      
      const response = await this.client.post<VerifyPaymentResponse>(
        '/stripe/verify-payment',
        request
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to verify payment');
    }
  }

  /**
   * Fetch the current user's program interests
   */
  async getUserPrograms(): Promise<any> {
    try {
      const response = await this.client.get('/user-programs');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch user programs');
    }
  }

  async getUserReferrals(): Promise<any> {
    try {
      const response = await this.client.get('/user-referrals');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch user referrals');
    }
  }

  /**
   * Fetch paginated list of programs
   */
  async getPrograms(page: number = 1): Promise<any> {
    try {
      const response = await this.client.get(`/programs?page=${page}&per_page=15`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch programs');
    }
  }

  /**
   * Fetch a single program by slug
   */
  async getProgram(programSlug: string): Promise<any> {
    try {
      const response = await this.client.get(`/programs/${programSlug}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch program');
    }
  }

  /**
   * Fetch workshop sessions for a specific program
   */
  async getWorkshopSessions(programSlug: string, schid?: string): Promise<any> {
    try {
      let url = `/programs/${programSlug}/workshop-sessions`;
      if (schid) {
        url += `?school_id=${encodeURIComponent(schid)}`;
      }
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch workshop sessions');
    }
  }


  /**
   * Fetch workshop session by id
   */
  async getWorkshopSession(sessionId: number): Promise<any> {
    try {
      const response = await this.client.get(`/workshop-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch workshop session');
    }
  }

  /**
   * Fetch all workshop sessions with optional filters
   */
  async getAllWorkshopSessions(filters?: {
    program_id?: number;
    location?: string;
    date_from?: string;
    date_to?: string;
    bookable_only?: boolean;
  }): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, String(value));
          }
        });
      }
      const response = await this.client.get(`/workshop-sessions?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch workshop sessions');
    }
  }

  /**
   * Book a workshop session
   */
  async bookWorkshopSession(sessionId: number, quantity: number = 1, notes?: string): Promise<any> {
    try {
      const response = await this.client.post(`/workshop-sessions/${sessionId}/book`, {
        quantity,
        notes
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to book workshop session');
    }
  }

  /**
   * Fetch training camp sessions for a specific program
   */
  async getTrainingCampSessions(programSlug: string, schid?: string): Promise<any> {
    try {
      let url = `/training-camp-sessions/programs/${programSlug}`;
      if (schid) {
        url += `?school_id=${encodeURIComponent(schid)}`;
      }
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch training camp sessions');
    }
  }

  /**
   * Fetch training camp session by id
   */
  async getTrainingCampSession(sessionId: number): Promise<any> {
    try {
      const response = await this.client.get(`/training-camp-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch training camp session');
    }
  }

  /**
   * Fetch all training camp sessions with optional filters
   */
  async getAllTrainingCampSessions(filters?: {
    program_id?: number;
    location?: string;
    date_from?: string;
    date_to?: string;
    bookable_only?: boolean;
  }): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, String(value));
          }
        });
      }
      const response = await this.client.get(`/training-camp-sessions?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch training camp sessions');
    }
  }

  /**
   * Book a training camp session
   */
  async bookTrainingCampSession(sessionId: number, quantity: number = 1, notes?: string): Promise<any> {
    try {
      const response = await this.client.post(`/training-camp-sessions/${sessionId}/book`, {
        quantity,
        notes
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to book training camp session');
    }
  }

  /**
   * Check if guest purchases exist for an email
   */
  async checkGuestPurchases(email: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.client.post('/check-guest-purchases', {
        email
      });
      return response.data;
    } catch (error) {
      console.error('Check guest purchases error:', error);
      throw this.handleError(error, 'Failed to check guest purchases');
    }
  }

  /**
   * Convert guest purchases to user account
   */
  async convertGuestToUser(userData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    password_confirmation: string;
    guest_email: string;
  }): Promise<any> {
    try {
      const response: AxiosResponse = await this.client.post('/convert-guest-to-user', userData);
      return response.data;
    } catch (error) {
      console.error('Convert guest to user error:', error);
      throw this.handleError(error, 'Failed to convert guest to user');
    }
  }

  /**
   * Store referral code
   */
  async storeRefCode(refCode: string): Promise<any> {
    try {
      const response = await this.client.post('/store-ref-code', {
        ref_code: refCode
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to store referral code');
    }
  }

  /**
   * Handle API errors with proper error transformation
   */
  private handleError(error: unknown, defaultMessage: string): Error {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      
      if (response?.data?.message) {
        return new Error(response.data.message);
      }
      
      if (response?.data?.error) {
        return new Error(response.data.error);
      }
      
      if (response?.status === 422 && response.data?.errors) {
        const validationErrors = Object.values(response.data.errors).flat();
        return new Error(validationErrors.join(', '));
      }
      
      switch (response?.status) {
        case 0:
          return new Error('Network error. Please check your connection.');
        case 400:
          return new Error('Invalid request. Please try again.');
        case 401:
          return new Error('Authentication required. Please sign in.');
        case 403:
          return new Error('Permission denied.');
        case 404:
          return new Error('Service not found. Please contact support.');
        case 422:
          return new Error('Validation failed. Please check your input.');
        case 429:
          return new Error('Too many requests. Please wait and try again.');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(defaultMessage);
      }
    }
    
    if (error instanceof Error) {
      return error;
    }
    
    return new Error(defaultMessage);
  }
}

const apiClient = new APIClient();
export default apiClient; 