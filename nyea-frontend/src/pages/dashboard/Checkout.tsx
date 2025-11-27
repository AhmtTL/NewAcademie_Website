import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, AlertCircle, Loader, ArrowLeft, Shield, CheckCircle, Lock, Star, Clock, DollarSign } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createCheckoutSession, handleStripeError, validateStripeConfig } from '../../services/stripe';
import type { StripeError } from '../../types/stripe';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, getTotalItems, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<StripeError | null>(null);
  const navigate = useNavigate();

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, cartLoading, navigate]);

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
      await createCheckoutSession(items);
    } catch (err) {
      setError(handleStripeError(err));
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/cart"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Cart
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
                <p className="text-lg text-gray-600">
                  Complete your purchase and start your learning journey
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{getTotalItems()}</div>
              <div className="text-sm text-gray-500">Items</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              Order Summary
            </h2>
            
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.program.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.program.image}
                    alt={item.program.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{item.program.title}</h3>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {item.program.category}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.program.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ${(item.program.price * item.quantity).toLocaleString()}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-sm text-gray-500">
                        ${item.program.price.toLocaleString()} each
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Items ({getTotalItems()})</span>
                <span className="font-semibold text-gray-900">${getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Processing Fee</span>
                <span className="text-green-600 font-semibold">Included</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  All fees included • Secure payment processing
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              Payment Information
            </h2>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Payment Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error.message}</p>
                </div>
              </div>
            )}

            {/* Customer Information */}
            {user && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">Customer Information</h3>
                <p className="text-sm text-blue-700">
                  Paying as: {user?.name || 'User'} ({user?.email || 'N/A'})
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-green-800">Secure Payment</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your payment information is securely processed by Stripe. We never store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Features */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">What happens next:</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Secure payment processing with Stripe</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Instant enrollment confirmation</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Email receipt and program details</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Access to your student dashboard</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing || items.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay ${getTotalPrice().toLocaleString()}
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-3 text-blue-600" />
            Payment & Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-center mb-3">
                <Lock className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-bold text-blue-900">Secure Processing</h4>
              </div>
              <p className="text-blue-700 text-sm leading-relaxed">
                All payments are processed securely through Stripe with industry-standard encryption.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="flex items-center mb-3">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-bold text-green-900">Multiple Payment Methods</h4>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                We accept all major credit cards, debit cards, and digital wallets.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-bold text-purple-900">Quality Assurance</h4>
              </div>
              <p className="text-purple-700 text-sm leading-relaxed">
                Premium educational content delivered by certified professionals and university partners.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Need help with your order? 
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold ml-1">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 