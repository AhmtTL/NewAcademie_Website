/**
 * Comprehensive TypeScript definitions for Stripe integration
 */

export interface StripeCheckoutItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description?: string;
      images?: string[];
      metadata?: Record<string, string | number>;
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface CreateCheckoutSessionRequest {
  items: StripeCheckoutItem[];
  guest_info?: {
    name: string;
    email: string;
    phone: string;
    school_name: string;
    grade: string;
    city: string;
  };
  parent_info?: {
    parent_name?: string;
    parent_email?: string;
    parent_phone_number?: string;
  };
  payment_plans?: Array<{
    program_id: number;
    session_id?: string;
    type: string;
    deposit_amount: number;
    balance_amount: number;
    total_amount: number;
    balance_due_date?: string | null;
    metadata?: Record<string, string | number>;
  }>;
}

export interface CreateCheckoutSessionResponse {
  data: {
    id: string;
    url: string;
    payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  };
}

export interface PaymentIntentResponse {
  id: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  amount: number;
  currency: string;
  metadata?: Record<string, string | number>;
}

export interface StripeError {
  type: 'card_error' | 'validation_error' | 'api_error' | 'network_error' | 'rate_limit_error' | 'authentication_error' | 'permission_error' | 'configuration_error' | 'unknown_error';
  message: string;
  code?: string;
  decline_code?: string;
  param?: string;
  charge?: string;
  payment_intent?: {
    id: string;
    status: string;
  };
}

export interface VerifyPaymentRequest {
  session_id: string;
}

export interface VerifyPaymentResponse {
  data: {
    verified: boolean;
    payment_status: 'paid' | 'unpaid' | 'processing' | 'failed';
    order_id?: string;
    customer_email?: string;
    amount_total?: number;
    currency?: string;
    metadata?: Record<string, string | number>;
  }
} 