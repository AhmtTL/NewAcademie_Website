/**
 * Stripe Configuration
 * Centralized configuration for Stripe integration with proper environment handling
 */

interface StripeConfig {
  publishableKey: string;
  apiBaseUrl: string;
  isProduction: boolean;
  currency: string;
  webhookEndpoint?: string;
}

const getStripeConfig = (): StripeConfig => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const environment = process.env.NODE_ENV;

  // Validate required environment variables
  if (!publishableKey) {
    throw new Error(
      'REACT_APP_STRIPE_PUBLISHABLE_KEY is required. Please set this environment variable.'
    );
  }

  if (!apiBaseUrl) {
    throw new Error(
      'REACT_APP_API_BASE_URL environment variable is required. ' +
      'Please check your .env.local file or deployment configuration.'
    );
  }

  // Validate publishable key format
  if (!publishableKey.startsWith('pk_')) {
    throw new Error(
      'Invalid Stripe publishable key format. Publishable keys should start with "pk_".'
    );
  }

  // Environment-specific validations
  if (environment === 'production' && publishableKey.includes('_test_')) {
    throw new Error(
      'Cannot use test Stripe keys in production environment. Please use live keys.'
    );
  }

  if (environment === 'production' && apiBaseUrl.includes('localhost')) {
    throw new Error(
      'Cannot use localhost API URL in production environment. Please use your Azure domain.'
    );
  }

  if (environment === 'development' && !apiBaseUrl.includes('localhost') && !apiBaseUrl.includes('127.0.0.1')) {
    console.warn(
      'Warning: Using non-localhost API URL in development environment. ' +
      'Make sure this is intentional.'
    );
  }

  return {
    publishableKey,
    apiBaseUrl,
    isProduction: environment === 'production',
    currency: process.env.REACT_APP_CURRENCY || 'usd',
    webhookEndpoint: process.env.REACT_APP_STRIPE_WEBHOOK_ENDPOINT,
  };
};

export default getStripeConfig; 