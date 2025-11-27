import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/api';
import DashboardTabs from '../../components/dashboard/DashboardTabs';
import ProfileInformation from '../../components/dashboard/ProfileInformation';

const Dashboard: React.FC = () => {
  const { user, refreshProfile, isLoading } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [programInterests, setProgramInterests] = useState<any[]>([]);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [interestsError, setInterestsError] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);
  const [referralsError, setReferralsError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    fetchProgramInterests();
    fetchUserReferrals();
  }, []);

  const fetchProgramInterests = async () => {
    setLoadingInterests(true);
    setInterestsError(null);
    try {
      const response = await apiClient.getUserPrograms();
      setProgramInterests((response.data.programs || [])
        .filter((p: any) => p && p.program && p.program.id)
        .map((p: any) => p.program));
    } catch (err: any) {
      setInterestsError(err.message || 'Failed to load program interests.');
    } finally {
      setLoadingInterests(false);
    }
  };

  const fetchUserReferrals = async () => {
    setLoadingReferrals(true);
    setReferralsError(null);
    try {
      const response = await apiClient.getUserReferrals();
      console.log('Referrals API response:', response); // Debug log
      
      // Handle different possible response structures
      let referralsData = [];
      if (response?.data?.referrals) {
        referralsData = response.data.referrals;
      } else if (response?.referrals) {
        referralsData = response.referrals;
      } else if (Array.isArray(response?.data)) {
        referralsData = response.data;
      } else if (Array.isArray(response)) {
        referralsData = response;
      }
      
      setReferrals(referralsData);
    } catch (err: any) {
      console.error('Referrals fetch error:', err); // Debug log
      setReferralsError(err.message || 'Failed to load referrals.');
    } finally {
      setLoadingReferrals(false);
    }
  };

  const copyToClipboard = async (text: string, referralId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(referralId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading state during initial auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // This should not happen since Dashboard is now protected, but keep as fallback
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load user data. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your educational journey dashboard
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Information */}
          <ProfileInformation
            user={user}
            isRefreshing={isRefreshing}
            onRefreshProfile={handleRefreshProfile}
            formatDate={formatDate}
          />

          {/* Dashboard Tabs - Programs & Referrals */}
          <div className="xl:col-span-2">
            <DashboardTabs
              // Program Interests Props
              programInterests={programInterests}
              loadingInterests={loadingInterests}
              interestsError={interestsError}
              onRetryInterests={fetchProgramInterests}
              
              // Referrals Props
              referrals={referrals}
              loadingReferrals={loadingReferrals}
              referralsError={referralsError}
              copiedLink={copiedLink}
              onRetryReferrals={fetchUserReferrals}
              onCopyLink={copyToClipboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 