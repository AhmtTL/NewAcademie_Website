/**
 * Comprehensive TypeScript definitions for the cart system
 */

import { Program } from "./program";

export interface WorkshopSession {
  id: string;
  unique_identifier?: string;
  session_title?: string;
  program_type?: "mastery" | "essentials";
  location: string;
  city?: string;
  country?: string;
  country_code?: string;
  full_location?: string;
  venue_name?: string;
  organization_logo?: string; // Logo for the organization/school
  venue_address?: string;
  location_highlights?: string[];
  date: string;
  start_date?: string;
  end_date?: string;
  formatted_date?: string;
  time: string;
  timezone?: string;
  availableSpots: number;
  bookedSpots?: number;
  price?: number; // Session-specific price
  formatted_price?: string;
  price_difference?: number;
  is_premium_pricing?: boolean;
  is_discounted_pricing?: boolean;
  is_featured?: boolean;
  is_almost_sold_out?: boolean;
  is_limited_availability?: boolean;
  urgency_level?: "critical" | "high" | "normal";
  capacity_percentage?: number;
  special_notes?: string;
  metadata?: any;
  session_type?: string;
}

export interface TrainingCampSession {
  id: string;
  unique_identifier?: string;
  session_title?: string;
  program_type?: "intensive" | "standard";
  location: string;
  city?: string;
  country?: string;
  country_code?: string;
  full_location?: string;
  venue_name?: string;
  organization_logo?: string;
  venue_address?: string;
  location_highlights?: string[];
  date: string;
  start_date?: string;
  end_date?: string;
  formatted_date?: string;
  time: string;
  timezone?: string;
  availableSpots: number;
  bookedSpots?: number;
  price?: number;
  formatted_price?: string;
  price_difference?: number;
  is_premium_pricing?: boolean;
  is_discounted_pricing?: boolean;
  is_featured?: boolean;
  is_almost_sold_out?: boolean;
  is_limited_availability?: boolean;
  urgency_level?: "critical" | "high" | "normal";
  capacity_percentage?: number;
  special_notes?: string;
  metadata?: any;
  session_type?: string;
}

// Union type for all session types
export type SessionType = WorkshopSession | TrainingCampSession;

export interface PaymentPlanDetails {
  type: string;
  depositAmount: number;
  balanceAmount: number;
  totalAmount: number;
  balanceDueDate?: string | null;
  metadata?: Record<string, any>;
}

export interface CartItemOptions {
  paymentPlan?: PaymentPlanDetails;
}

export interface CartItem {
  program: Program;
  quantity: number;
  addedAt: number; // Timestamp for tracking when item was added
  // Optional session-specific data (workshop or training camp)
  selectedSession?: SessionType;
  paymentPlan?: PaymentPlanDetails;
}

export interface CartState {
  items: CartItem[];
  lastUpdated: number;
  version: number; // For handling data migrations if needed
}

export interface CartContextType {
  // State
  items: CartItem[];
  loading: boolean;
  error: string | null;

  // Actions
  addToCart: (
    program: Program,
    quantity?: number,
    session?: SessionType,
    options?: CartItemOptions
  ) => void;
  addMultipleToCart: (
    program: Program,
    sessions: SessionType[],
    quantity?: number,
    options?: CartItemOptions
  ) => void;
  removeFromCart: (programId: number, sessionId?: string) => void;
  updateQuantity: (
    programId: number,
    quantity: number,
    sessionId?: string
  ) => void;
  clearCart: () => void;

  // Computed values
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (programId: number, sessionId?: string) => number;
  isInCart: (programId: number) => boolean;
}

export type CartActionType =
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "UPDATE_QUANTITY"
  | "CLEAR_CART"
  | "LOAD_CART"
  | "SET_ERROR"
  | "SET_LOADING";

export interface CartAction {
  type: CartActionType;
  payload?: any;
}
