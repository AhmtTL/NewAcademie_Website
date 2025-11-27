import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
import ProgramInterests from './ProgramInterests';
import UserReferrals from './UserReferrals';

interface DashboardTabsProps {
  // Program Interests Props
  programInterests: any[];
  loadingInterests: boolean;
  interestsError: string | null;
  onRetryInterests: () => void;
  
  // Referrals Props
  referrals: any[];
  loadingReferrals: boolean;
  referralsError: string | null;
  copiedLink: string | null;
  onRetryReferrals: () => void;
  onCopyLink: (text: string, referralId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  // Program Interests
  programInterests,
  loadingInterests,
  interestsError,
  onRetryInterests,
  
  // Referrals
  referrals,
  loadingReferrals,
  referralsError,
  copiedLink,
  onRetryReferrals,
  onCopyLink
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'programs' | 'referrals'>('programs');

  // Update activeTab based on URL parameter on component mount and URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'referrals' || tabParam === 'programs') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Function to handle tab changes and update URL
  const handleTabChange = (tabId: 'programs' | 'referrals') => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    {
      id: 'programs' as const,
      label: 'Program Interests',
      icon: Star,
      count: programInterests.length,
      color: 'blue'
    },
    {
      id: 'referrals' as const,
      label: 'My Referrals',
      icon: Users,
      count: referrals.length,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200
                  ${isActive 
                    ? (tab.color === 'blue' 
                        ? 'border-blue-500 text-blue-600 bg-blue-50' 
                        : 'border-purple-500 text-purple-600 bg-purple-50')
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className={`h-5 w-5 ${isActive 
                    ? (tab.color === 'blue' ? 'text-blue-600' : 'text-purple-600') 
                    : 'text-gray-400'
                  }`} />
                  <span>{tab.label}</span>
                  <span className={`
                    inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                    ${isActive 
                      ? (tab.color === 'blue' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800')
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'programs' && (
          <ProgramInterests
            programInterests={programInterests}
            loadingInterests={loadingInterests}
            interestsError={interestsError}
            onRetry={onRetryInterests}
          />
        )}
        
        {activeTab === 'referrals' && (
          <UserReferrals
            referrals={referrals}
            loadingReferrals={loadingReferrals}
            referralsError={referralsError}
            copiedLink={copiedLink}
            onRetry={onRetryReferrals}
            onCopyLink={onCopyLink}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardTabs;