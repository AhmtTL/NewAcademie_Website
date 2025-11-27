import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader, Star, ArrowRight, BookOpen } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { verifyPayment, handleStripeError } from '../../services/stripe';
import type { VerifyPaymentResponse, StripeError } from '../../types/stripe';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerifyPaymentResponse | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<StripeError | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sessionIdParam = searchParams.get('session_id');
    if (!sessionIdParam) {
      navigate('/');
      return;
    }

    setSessionId(sessionIdParam);
    verifyPaymentWithBackend(sessionIdParam);
  }, [searchParams, navigate]);

  const verifyPaymentWithBackend = async (sessionId: string) => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      const result = await verifyPayment(sessionId);
      setVerificationResult(result);

      if (result.data.verified && result.data.payment_status === 'paid') {
        clearCart();
      } else if (!result.data.verified) {
        setVerificationError({
          type: 'validation_error',
          message: 'Payment verification failed. Please contact support.',
        });
      } else if (result.data.payment_status === 'failed') {
        setVerificationError({
          type: 'unknown_error',
          message: 'Payment processing failed. Please contact support.',
        });
      }
    } catch (error) {
      setVerificationError(handleStripeError(error));
    } finally {
      setIsVerifying(false);
    }
  };

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment</h2>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (verificationError || (verificationResult && !verificationResult.data.verified)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-6">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-600 mb-4">
              {verificationError?.message || 'We encountered an issue with your payment.'}
            </p>
            {sessionId && (
              <p className="text-sm text-gray-500 mb-6">
                Reference ID: {sessionId}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/cart"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
              >
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-8">
      <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-700 mb-4">
            Thank you for your purchase. Your enrollment is confirmed and a receipt has been sent to your email.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-lg font-semibold text-blue-900">What happens next?</span>
          </div>
          <ul className="text-gray-700 text-left mx-auto max-w-md space-y-3">
            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Instant access to your student dashboard</li>
            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Program details and next steps sent to your email</li>
            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Support available for any questions</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="flex-1 bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white py-4 rounded-xl font-bold hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Link>
          <Link
            to="/programs"
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Browse More Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success; 