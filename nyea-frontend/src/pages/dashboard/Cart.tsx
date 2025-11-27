import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Shield, CheckCircle, BookOpen, Clock, MapPin, Calendar, Users, User, UserPlus, Loader, AlertCircle, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createCheckoutSession, handleStripeError, validateStripeConfig } from '../../services/stripe';
import type { StripeError } from '../../types/stripe';
import GuestCheckoutForm from '../../components/ui/GuestCheckoutForm';
import Modal from '../../components/ui/Modal';

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  schoolName: string;
  grade: string;
  city: string;
  parentName?: string;
  parentEmail?: string;
  parentPhoneNumber?: string;
}

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<StripeError | null>(null);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const totalBalanceDueLater = items.reduce((total, item) => {
    if (!item.paymentPlan) return total;
    return total + item.paymentPlan.balanceAmount * item.quantity;
  }, 0);

  const hasPaymentPlan = totalBalanceDueLater > 0;

  // Function to get audience type badge info with solid colors
  const getAudienceBadge = (highlights: string[] | undefined) => {
    if (!highlights || highlights.length === 0) return null;
    
    const highlight = highlights[0].toLowerCase();
    
    if (highlight.includes('high school') || highlight.includes('student')) {
      return {
        text: '🎓 High School',
        className: 'bg-blue-600 text-white border-blue-700',
        icon: '🎓'
      };
    } else if (highlight.includes('university') || highlight.includes('college')) {
      return {
        text: '🏛️ University',
        className: 'bg-purple-600 text-white border-purple-700',
        icon: '🏛️'
      };
    } else if (highlight.includes('executive') || highlight.includes('professional') || highlight.includes('corporate')) {
      return {
        text: '💼 Executive',
        className: 'bg-gray-700 text-white border-gray-800',
        icon: '💼'
      };
    }
    
    // Default for any other audience
    return {
      text: `🎓 ${highlights[0]}`,
      className: 'bg-blue-600 text-white border-blue-700',
      icon: '🎓'
    };
  };

  // Function to extract and format grade information
  const getGradeInfo = (locationHighlights?: string[], metadata?: any) => {
    // First try to get grade from location_highlights
    const gradeHighlight = locationHighlights?.find(highlight => 
      highlight.includes('Grade')
    );
    
    if (gradeHighlight) {
      return gradeHighlight;
    }
    
    // Then try to get from metadata.grade_levels
    if (metadata?.grade_levels && Array.isArray(metadata.grade_levels)) {
      const grades = metadata.grade_levels;
      if (grades.length === 1) {
        return `Grade ${grades[0]}`;
      } else if (grades.length > 1) {
        return `Grades ${grades.join(', ')}`;
      }
    }
    
    return null;
  };

  const handleGuestInfoSubmit = async (info: GuestInfo) => {
    setGuestInfo(info);
    setShowGuestModal(false);
    
    // Automatically proceed to Stripe checkout after guest info is submitted
    const validation = validateStripeConfig();
    if (!validation.isValid) {
      setError({
        type: 'configuration_error',
        message: 'Payment system is not properly configured. Please contact support.',
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      await createCheckoutSession(items, info);
    } catch (err) {
      setError(handleStripeError(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowGuestModal(false);
    setError(null); // Clear any errors when closing modal
  };

  const handleCheckout = async () => {
    const validation = validateStripeConfig();
    if (!validation.isValid) {
      setError({
        type: 'configuration_error',
        message: 'Payment system is not properly configured. Please contact support.',
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      await createCheckoutSession(items, guestInfo || undefined);
    } catch (err) {
      setError(handleStripeError(err));
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-md mx-auto">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                Discover our amazing programs and start your learning journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-200 shadow-lg active:scale-95 touch-manipulation"
                >
                  <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                  Browse Programs
                </Link>
                <Link
                  to="/workshop-booking/leadership-negotiation-communication"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-blue-500 transition-all duration-200 shadow-lg active:scale-95 touch-manipulation"
                >
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                  Browse Workshops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Shopping Cart</h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Review your selected programs and proceed to checkout
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{getTotalItems()}</div>
              <div className="text-xs sm:text-sm text-gray-500">Items</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                  <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                  Cart Items
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const itemKey = `${item.program.id}-${item.selectedSession?.id || 'general'}`;
                  const actualPrice = item.selectedSession?.price || item.program.price;
                  const basePrice = actualPrice ?? 0;
                  const paymentPlan = item.paymentPlan;
                  const dueToday = (paymentPlan?.depositAmount ?? basePrice) * item.quantity;
                  const balanceLater = paymentPlan ? paymentPlan.balanceAmount * item.quantity : 0;
                  const totalProgrammeFee = paymentPlan ? paymentPlan.totalAmount * item.quantity : basePrice * item.quantity;
                  
                  return (
                    <div key={itemKey} className="relative p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
                        <img
                          src={item.program.image}
                          alt={item.program.title}
                          className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 object-cover rounded-lg sm:rounded-xl shadow-md flex-shrink-0"
                          style={{ aspectRatio: '16/9' }}
                        />
                        
                        <div className="flex-1 min-w-0 w-full">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 pr-16 sm:pr-0">
                            {item.program.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                            {item.program.description}
                          </p>

                          {/* Workshop Session Details - Clean Card Layout */}
                          {item.selectedSession ? (
                             <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 relative pb-12 sm:pb-8">
                               {/* Compact Header: Title + Badges */}
                               <div className="mb-2 sm:mb-3">
                                 {/* Session Title + Audience Badge */}
                                 <div className="flex flex-col sm:flex-row items-start justify-between flex-wrap gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                   <h4 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight flex-1 break-words">
                                     {item.selectedSession.session_title || item.selectedSession.location}
                                   </h4>
                                   
                                   {/* Audience Type Badge - Compact */}
                                   {getAudienceBadge(item.selectedSession.location_highlights) && (
                                     <div className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold whitespace-nowrap flex-shrink-0 ${getAudienceBadge(item.selectedSession.location_highlights)!.className}`}>
                                       {getAudienceBadge(item.selectedSession.location_highlights)!.text}
                                     </div>
                                   )}
                                 </div>
                                 
                                 {/* Program Type Badges */}
                                 <div className="flex items-center flex-wrap gap-1">
                                   <div className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                                     item.selectedSession.program_type === 'mastery' 
                                       ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
                                       : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                                   }`}>
                                     {item.selectedSession.program_type === 'mastery' ? '👑 MASTERY' : '⚡ ESSENTIALS'}
                                   </div>
                                   
                                   {item.selectedSession.is_featured && (
                                     <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                                       ⭐ FEATURED
                                     </div>
                                   )}
                                 </div>
                               </div>

                               {/* Essential Details - Compact */}
                               <div className="space-y-1.5 sm:space-y-2">
                                 {/* Location - Simplified */}
                                 <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
                                   <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                                   <div className="flex-1 min-w-0">
                                     <span className="font-medium text-gray-700 text-xs sm:text-sm block sm:inline">
                                       {item.selectedSession.venue_name || item.selectedSession.location}
                                     </span>
                                     <span className="text-gray-500 text-xs sm:text-sm block sm:inline sm:ml-2">
                                       {item.selectedSession.city}, {item.selectedSession.country}
                                     </span>
                                   </div>
                                 </div>

                                 {/* Date & Time - Simplified */}
                                 <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
                                   <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                                   <div className="flex-1 min-w-0">
                                     <span className="font-medium text-gray-700 text-xs sm:text-sm break-words">
                                       {item.selectedSession.formatted_date || formatDate(item.selectedSession.date)} · {item.selectedSession.time}
                                     </span>
                                     {item.selectedSession.timezone && (
                                       <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2">
                                         ({item.selectedSession.timezone})
                                       </span>
                                     )}
                                   </div>
                                 </div>

                                 {/* Grade Information - Compact */}
                                 {getGradeInfo(item.selectedSession.location_highlights, item.selectedSession.metadata) && (
                                   <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
                                     <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                                     <div className="flex-1 min-w-0">
                                       <span className="font-medium text-gray-700 text-xs sm:text-sm">
                                         {getGradeInfo(item.selectedSession.location_highlights, item.selectedSession.metadata)}
                                       </span>
                                       <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2">
                                         (Academic Level)
                                       </span>
                                     </div>
                                   </div>
                                 )}

                                 {/* Availability - Compact with FCFS Badge */}
                                 <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
                                   <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                                   <div className="flex-1 min-w-0">
                                     <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                                       <span className="font-bold text-green-600 text-xs sm:text-sm">
                                         {item.selectedSession.availableSpots} spots available
                                       </span>
                                       
                                       {/* FCFS Badge - Small and Inline */}
                                       {item.selectedSession.availableSpots <= 15 && (
                                         <span className="bg-yellow-100 text-yellow-800 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                                           📍 FCFS
                                         </span>
                                       )}
                                     </div>
                                     
                                     {/* Compact Progress Bar */}
                                     <div className="w-full sm:w-2/3 bg-gray-200 rounded-full h-1 sm:h-1.5">
                                       <div 
                                         className="h-1 sm:h-1.5 rounded-full transition-all duration-500 bg-green-500"
                                         style={{ width: `${((item.selectedSession.bookedSpots || 0) / ((item.selectedSession.bookedSpots || 0) + item.selectedSession.availableSpots)) * 100}%` }}
                                       ></div>
                                     </div>
                                   </div>
                                 </div>
                               </div>


                               {/* Smaller Logo Stamp (Bottom-Right) - Responsive */}
                               {item.selectedSession.organization_logo && (
                                 <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                                   <div className="relative">
                                     {/* Compact stamp container */}
                                     <div className="bg-white rounded-full p-1 sm:p-1.5 lg:p-2 shadow-md sm:shadow-lg border border-gray-200">
                                       <img 
                                         src={item.selectedSession.organization_logo} 
                                         alt={`${item.selectedSession.location} logo`}
                                         className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain rounded-full"
                                         onError={(e) => {
                                           (e.target as HTMLImageElement).style.display = 'none';
                                         }}
                                       />
                                     </div>
                                     {/* Subtle stamp effect */}
                                     <div className="absolute inset-0 rounded-full border border-blue-200 opacity-30"></div>
                                   </div>
                                 </div>
                               )}
                             </div>
                          ) : (
                            <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                              <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold">
                                {item.program.category}
                              </span>
                              <span className="text-gray-500 text-xs sm:text-sm flex items-center">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {item.program.duration}
                              </span>
                            </div>
                          )}
                          
                          {/* Program Features */}
                          <div className="mb-3 sm:mb-4">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Program Features:</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {item.program.features.slice(0, 4).map((feature, idx) => (
                                <span key={idx} className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Price and Actions - Mobile Optimized */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                          {/* Price - Shows first on mobile, last on desktop */}
                          <div className="text-left sm:text-right order-2 sm:order-3">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">
                              {formatCurrency(dueToday)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs sm:text-sm text-gray-500">
                                {paymentPlan
                                  ? `${formatCurrency(paymentPlan.depositAmount)} each`
                                  : `${formatCurrency(actualPrice)} each`}
                              </div>
                            )}
                            {paymentPlan ? (
                              <div className="space-y-0.5 mt-1">
                                <div className="text-[10px] sm:text-xs text-gray-500">
                                  Balance due later: {formatCurrency(balanceLater)}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-400">
                                  Total programme fee: {formatCurrency(totalProgrammeFee)}
                                </div>
                              </div>
                            ) : (
                              item.selectedSession &&
                              item.selectedSession.price &&
                              item.selectedSession.price !== item.program.price && (
                                <div className="text-[10px] sm:text-xs text-gray-500">
                                  Session: ${item.selectedSession.price.toLocaleString()}
                                </div>
                              )
                            )}
                          </div>
                          
                          {/* Quantity Controls - Shows in middle on mobile */}
                          <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg sm:rounded-xl p-1.5 sm:p-2 order-1 sm:order-1">
                            <button
                              onClick={() => updateQuantity(item.program.id, item.quantity - 1, item.selectedSession?.id)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-50 touch-manipulation"
                              disabled={item.quantity <= 1}
                              title="Decrease quantity"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                            </button>
                            <span className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.program.id, item.quantity + 1, item.selectedSession?.id)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all touch-manipulation"
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                            </button>
                          </div>
                          
                          {/* Remove Button - Shows last on mobile */}
                          <button
                            onClick={() => removeFromCart(item.program.id, item.selectedSession?.id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-colors active:scale-95 touch-manipulation order-3 sm:order-2"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Checkout Section - Redesigned */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                Complete Your Order
              </h2>
              
              {/* Order Summary */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">
                    Due Today ({getTotalItems()})
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
                {hasPaymentPlan && (
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                    <span className="text-sm sm:text-base text-gray-600">
                      Balance Payable Later
                    </span>
                    <span className="text-sm sm:text-base text-gray-900">
                      {formatCurrency(totalBalanceDueLater)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">Processing Fee</span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold">Included</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
              </div>

              {/* Authentication Options */}
              {!isAuthenticated && !guestInfo && (
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <button
                    onClick={() => setShowGuestModal(true)}
                    className="w-full bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-200 shadow-lg flex items-center justify-center active:scale-95 touch-manipulation"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Continue as Guest
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-2 sm:px-3 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/signin"
                      state={{ returnTo: '/cart' }}
                      className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center active:scale-95 touch-manipulation"
                    >
                      <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      state={{ returnTo: '/cart' }}
                      className="w-full text-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 block py-2"
                    >
                      Don't have an account? Sign up
                    </Link>
                  </div>
                </div>
              )}


              {/* User Info Display */}
              {isAuthenticated && user && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
                  <div className="flex items-center mb-1.5 sm:mb-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1.5 sm:mr-2" />
                    <h4 className="text-sm sm:text-base font-semibold text-green-900">Signed in as</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-green-800 break-words">{user?.name || 'User'}</p>
                  <p className="text-xs sm:text-sm text-green-700 break-words">{user?.email || 'N/A'}</p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base text-red-800 font-medium mb-1">Payment Error</h4>
                      <p className="text-xs sm:text-sm text-red-700 break-words">{error.message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Complete Payment Button */}
              {(isAuthenticated || guestInfo) && (
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-200 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4 active:scale-95 touch-manipulation"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Complete Payment {formatCurrency(getTotalPrice())}
                    </>
                  )}
                </button>
              )}

              {hasPaymentPlan && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-blue-800">
                  Your remaining balance of{" "}
                  <span className="font-semibold">
                    {formatCurrency(totalBalanceDueLater)}
                  </span>{" "}
                  will be invoiced after this deposit. We’ll email payment reminders ahead of the due date.
                </div>
              )}

              {/* Browse More Programs */}
              <Link
                to="/programs"
                className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center mb-4 sm:mb-6 active:scale-95 touch-manipulation"
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Browse More Programs
              </Link>
              
              {/* Security Notice */}
              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl">
                <div className="flex items-start">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-blue-800">Secure Payment</h3>
                    <p className="text-xs sm:text-sm text-blue-700 mt-0.5 sm:mt-1">
                      Protected by Stripe • SSL encrypted • No checkout page needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-4 sm:mt-6 lg:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg sm:rounded-xl border border-blue-200">
              <h4 className="text-sm sm:text-base font-bold text-blue-900 mb-2 sm:mb-3">Payment Options</h4>
              <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                We accept all major credit cards, debit cards, and digital wallets. 
                Secure payment processing guaranteed with Stripe.
              </p>
            </div>
            <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg sm:rounded-xl border border-green-200">
              <h4 className="text-sm sm:text-base font-bold text-green-900 mb-2 sm:mb-3">Expert Support</h4>
              <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                24/7 customer support available for all your educational journey needs. 
                Contact our support team for assistance with any questions.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              Questions about your order? 
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold ml-1">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
        
        {/* Guest Checkout Modal */}
        <Modal
          isOpen={showGuestModal}
          onClose={handleCloseModal}
          title="Guest Checkout Information"
          size="md"
        >
          <div>
            {/* Error Display in Modal */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-800 font-medium text-sm mb-1">Error</h4>
                    <p className="text-red-700 text-sm">{error.message}</p>
                  </div>
                </div>
              </div>
            )}
            
            <GuestCheckoutForm
              onGuestInfoSubmit={handleGuestInfoSubmit}
              onCancel={handleCloseModal}
              isProcessing={isProcessing}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Cart; 