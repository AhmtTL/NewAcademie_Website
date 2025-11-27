import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader, User, Mail, Phone, School } from 'lucide-react';
import PhoneInput from './PhoneInput';
import apiClient from '../../services/api';

interface GuestPurchase {
  id: number;
  program_name: string;
  amount: string;
  currency: string;
  status: string;
  purchase_date: string;
}

interface GuestPurchasesData {
  has_guest_purchases: boolean;
  purchases_count: number;
  total_amount: number;
  purchases: GuestPurchase[];
}

interface ConversionFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  password_confirmation: string;
  guest_email: string;
}

interface GuestAccountConversionProps {
  onSuccess?: (userData: any) => void;
  onCancel?: () => void;
  className?: string;
}

const GuestAccountConversion: React.FC<GuestAccountConversionProps> = ({
  onSuccess,
  onCancel,
  className = ""
}) => {
  const [step, setStep] = useState<'check' | 'found' | 'convert'>('check');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPurchases, setGuestPurchases] = useState<GuestPurchasesData | null>(null);
  const [formData, setFormData] = useState<ConversionFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    password: '',
    password_confirmation: '',
    guest_email: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const checkGuestPurchases = async () => {
    if (!guestEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.checkGuestPurchases(guestEmail);

      if (data.success) {
        if (data.data.has_guest_purchases) {
          setGuestPurchases(data.data);
          setFormData(prev => ({ ...prev, guest_email: guestEmail }));
          setStep('found');
        } else {
          setError('No guest purchases found for this email address. Please check your email or make a purchase first.');
        }
      } else {
        setError(data.message || 'Failed to check guest purchases');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversion = async () => {
    setIsLoading(true);
    setError(null);
    setFormErrors({});

    try {
      const data = await apiClient.convertGuestToUser(formData);

      if (data.success) {
        // Store the authentication token
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (data.errors) {
          setFormErrors(data.errors);
        } else {
          setError(data.message || 'Failed to create account');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ConversionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (step === 'check') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-6">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Convert Guest Purchases to Account
          </h3>
          <p className="text-sm text-gray-600">
            If you've made purchases as a guest, you can create an account and we'll transfer your purchase history.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="guest_email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address Used for Guest Purchases
            </label>
            <input
              type="email"
              id="guest_email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email address"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={checkGuestPurchases}
              disabled={isLoading || !guestEmail.trim()}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Checking...
                </>
              ) : (
                'Check Purchases'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'found' && guestPurchases) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Guest Purchases Found!
          </h3>
          <p className="text-sm text-gray-600">
            We found {guestPurchases.purchases_count} purchase(s) totaling ${guestPurchases.total_amount} that can be transferred to your new account.
          </p>
        </div>

        {/* Purchase Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Your Purchases:</h4>
          <div className="space-y-2">
            {guestPurchases.purchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{purchase.program_name}</span>
                  <span className="text-gray-500 ml-2">
                    {new Date(purchase.purchase_date).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-medium">
                  ${purchase.amount} {purchase.currency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStep('check')}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setStep('convert')}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  if (step === 'convert') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Create Your Account
          </h3>
          <p className="text-sm text-gray-600">
            Fill in your details to create an account and transfer your {guestPurchases?.purchases_count} purchase(s).
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleConversion(); }} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                formErrors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name[0]}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                formErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              disabled={isLoading}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email[0]}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              error={formErrors.phone?.[0]}
              disabled={isLoading}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                formErrors.role ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {formErrors.role && (
              <p className="mt-1 text-sm text-red-600">{formErrors.role[0]}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                formErrors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password[0]}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                formErrors.password_confirmation ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {formErrors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password_confirmation[0]}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setStep('found')}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account & Transfer Purchases'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default GuestAccountConversion;
