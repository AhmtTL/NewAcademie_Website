import React from 'react';
import { Users, Share2, DollarSign, Copy, ExternalLink, Building, CheckCircle, XCircle, Link } from 'lucide-react';

interface UserReferralsProps {
  referrals: any[];
  loadingReferrals: boolean;
  referralsError: string | null;
  copiedLink: string | null;
  onRetry: () => void;
  onCopyLink: (text: string, referralId: string) => void;
}

const UserReferrals: React.FC<UserReferralsProps> = ({
  referrals,
  loadingReferrals,
  referralsError,
  copiedLink,
  onRetry,
  onCopyLink
}) => {
  if (loadingReferrals) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your referrals...</p>
        </div>
      </div>
    );
  }

  if (referralsError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Referrals</h3>
          <p className="text-red-700 mb-4">{referralsError}</p>
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (referrals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 max-w-md mx-auto">
          <Share2 className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-purple-900 mb-2">No Referrals Yet</h3>
          <p className="text-purple-700 mb-4">
            Start referring friends and earn rewards! Contact support to get your referral links.
          </p>
        </div>
      </div>
    );
  }

  const totalConversions = referrals.reduce((sum, ref) => sum + (ref.conversions_count || 0), 0);
  const totalEarnings = referrals.reduce((sum, ref) => {
    const conversions = ref.conversions || [];
    return sum + conversions.reduce((convSum: number, conv: any) => convSum + parseFloat(conv.amount || 0), 0);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 font-medium">Total Referrals</p>
              <p className="text-2xl font-bold text-purple-900">{referrals.length}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-medium">Conversions</p>
              <p className="text-2xl font-bold text-green-900">{totalConversions}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-medium">Number of Clicks</p>
              <p className="text-2xl font-bold text-green-900">{totalConversions}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <Link className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-blue-900">${totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Cards */}
      <div className="grid grid-cols-1 gap-4">
        {referrals.map((referral: any) => (
          <div key={referral.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Building className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">{referral.school?.name || 'Unknown School'}</h4>
                  <p className="text-xs text-gray-600">Code: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">{referral.referral_code}</span></p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {referral.conversions_count || 0} sales
                </div>
                <p className="text-xs text-gray-500">
                  ${((referral.conversions || []).reduce((sum: number, conv: any) => sum + parseFloat(conv.amount || 0), 0)).toFixed(2)} earned
                </p>
              </div>
            </div>

            {/* Referral Link */}
            <div className="flex items-end bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-2">
                  <p className="text-xs text-gray-600 font-medium mb-1">Referral Link:</p>
                  <p className="text-xs text-gray-800 break-all font-mono bg-white p-1.5 rounded border">
                    {referral.referral_link || 'No link available'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onCopyLink(referral.referral_link || '', referral.id?.toString() || '')}
                  disabled={!referral.referral_link}
                  className={`flex items-center p-3 rounded-md transition-colors text-xs ${
                    copiedLink === (referral.id?.toString() || '')
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {copiedLink === (referral.id?.toString() || '') ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </button>
                {referral.referral_link && (
                  <a
                    href={referral.referral_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors border border-blue-200 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </a>
                )}
              </div>
            </div>

            {/* Conversions */}
            {referral.conversions && referral.conversions.length > 0 ? (
              <div>
                <h5 className="text-xs font-semibold text-gray-800 mb-2 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  Recent Conversions ({(referral.conversions || []).length})
                </h5>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {(referral.conversions || []).map((conversion: any) => (
                    <div key={conversion.id} className="bg-green-50 border border-green-200 rounded-md p-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-green-800 text-xs">{conversion.customer_name || 'Unknown Customer'}</p>
                          <p className="text-xs text-green-600">{conversion.customer_email || 'No email'}</p>
                          {conversion.customer_grade && (
                            <p className="text-xs text-green-600">Grade: {conversion.customer_grade}</p>
                          )}
                        </div>
                        <div className="text-right ml-2">
                          <p className="font-semibold text-green-700 text-sm">${conversion.amount || '0.00'}</p>
                          <p className="text-xs text-green-600">
                            {conversion.created_at ? new Date(conversion.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'No date'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-gray-500">
                <p className="text-xs">No conversions yet</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReferrals;