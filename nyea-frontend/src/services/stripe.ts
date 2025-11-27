/**
 * Production-ready Stripe service
 * Simplified and optimized for better maintainability
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import getStripeConfig from '../config/stripe';
import apiClient from './api';
import type { 
  StripeError, 
  CreateCheckoutSessionRequest, 
  VerifyPaymentRequest,
  VerifyPaymentResponse 
} from '../types/stripe';
import type { CartItem } from '../types/cart';

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance (singleton pattern)
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const config = getStripeConfig();
    stripePromise = loadStripe(config.publishableKey);
  }
  return stripePromise;
};

/**
 * Validate Stripe configuration
 */
export const validateStripeConfig = (): { isValid: boolean; error?: string } => {
  try {
    getStripeConfig();
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid Stripe configuration' 
    };
  }
};

/**
 * Create checkout session and redirect to Stripe Checkout
 */
export const createCheckoutSession = async (
  items: CartItem[],
  guestInfo?: { name: string; email: string; phone: string; schoolName: string; grade: string; city: string; parentName?: string; parentEmail?: string; parentPhoneNumber?: string }
): Promise<void> => {
  try {
    const config = getStripeConfig();
    
    // Transform cart items to Stripe format
    const stripeItems = items.map(item => {
      // Use session price if available, otherwise use program price
      const effectivePrice =
        item.paymentPlan?.depositAmount ??
        item.selectedSession?.price ??
        item.program.price;
      
      return {
        price_data: {
          currency: config.currency,
          product_data: {
            name: item.program.title + (item.selectedSession ? ` - ${item.selectedSession.location}` : ''),
            description: item.program.description + (item.selectedSession ? ` (${item.selectedSession.program_type === 'mastery' ? 'Mastery Program' : 'Essentials Program'})` : ''),
            // images: item.program.image ? [item.program.image] : [],
            metadata: {
              program_id: item.program.id,
              category: item.program.category,
              duration: item.program.duration,
              ...(item.selectedSession && {
                session_id: item.selectedSession.id,
                session_type: item.selectedSession.session_type ?? 'none',
                session_location: item.selectedSession.location,
                program_type: item.selectedSession.program_type,
              }),
              ...(item.paymentPlan && {
                payment_plan_type: item.paymentPlan.type,
                deposit_amount: item.paymentPlan.depositAmount,
                balance_amount: item.paymentPlan.balanceAmount,
                total_amount: item.paymentPlan.totalAmount,
                balance_due_date: item.paymentPlan.balanceDueDate ?? '',
              }),
            },
          },
          unit_amount: Math.round(effectivePrice * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    const paymentPlans = items
      .filter(item => !!item.paymentPlan)
      .map(item => ({
        program_id: item.program.id,
        session_id: item.selectedSession?.id,
        type: item.paymentPlan!.type,
        deposit_amount: item.paymentPlan!.depositAmount,
        balance_amount: item.paymentPlan!.balanceAmount,
        total_amount: item.paymentPlan!.totalAmount,
        balance_due_date: item.paymentPlan!.balanceDueDate ?? null,
        metadata: item.paymentPlan!.metadata,
      }));

    // Create checkout session request
    const checkoutRequest: CreateCheckoutSessionRequest = {
      items: stripeItems,
      ...(paymentPlans.length > 0 && { payment_plans: paymentPlans }),
      ...(guestInfo && {
        guest_info: {
          name: guestInfo.name,
          email: guestInfo.email,
          phone: guestInfo.phone,
          school_name: guestInfo.schoolName,
          grade: guestInfo.grade,
          city: guestInfo.city,
        }
      }),
      ...((guestInfo?.parentName || guestInfo?.parentEmail || guestInfo?.parentPhoneNumber) && {
        parent_info: {
          ...(guestInfo.parentName && { parent_name: guestInfo.parentName }),
          ...(guestInfo.parentEmail && { parent_email: guestInfo.parentEmail }),
          ...(guestInfo.parentPhoneNumber && { parent_phone_number: guestInfo.parentPhoneNumber }),
        }
      }),
    };

    // Create session and redirect
    const session = await apiClient.createCheckoutSession(checkoutRequest);
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (error) {
      throw new Error(error.message || 'Failed to redirect to checkout');
    }

  } catch (error) {
    throw handleStripeError(error);
  }
};

/**
 * Verify payment after successful checkout
 */
export const verifyPayment = async (sessionId: string): Promise<VerifyPaymentResponse> => {
  try {
    const request: VerifyPaymentRequest = { session_id: sessionId };
    return await apiClient.verifyPayment(request);
  } catch (error) {
    throw handleStripeError(error);
  }
};

/**
 * Handle Stripe errors with user-friendly messages
 */
export const handleStripeError = (error: unknown): StripeError => {
  // Handle Stripe-specific errors
  if (error && typeof error === 'object' && 'type' in error) {
    const stripeError = error as any;
    
    switch (stripeError.type) {
      case 'card_error':
        return {
          type: 'card_error',
          message: stripeError.message || 'Your card was declined. Please try a different payment method.',
          code: stripeError.code,
        };
      
      case 'validation_error':
        return {
          type: 'validation_error',
          message: stripeError.message || 'Please check your payment information and try again.',
        };
      
      case 'api_connection_error':
        return {
          type: 'network_error',
          message: 'Network error. Please check your internet connection and try again.',
        };
      
      default:
        return {
          type: 'unknown_error',
          message: stripeError.message || 'An unexpected error occurred. Please try again.',
        };
    }
  }

  // Handle general errors
  if (error instanceof Error) {
    return {
      type: 'unknown_error',
      message: error.message,
    };
  }

  return {
    type: 'unknown_error',
    message: 'An unexpected error occurred. Please try again.',
  };
}; 