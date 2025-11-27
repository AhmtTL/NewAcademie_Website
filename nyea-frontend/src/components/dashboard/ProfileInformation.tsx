import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Shield, Calendar, CheckCircle, XCircle, BookOpen, TrendingUp, Award, Target, Building, GraduationCap, MapPin, RefreshCw } from 'lucide-react';

interface ProfileInformationProps {
  user: any;
  isRefreshing: boolean;
  onRefreshProfile: () => void;
  formatDate: (dateString: string) => string;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
  isRefreshing,
  onRefreshProfile,
  formatDate
}) => {
  return (
    <div className="xl:col-span-1">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <User className="h-6 w-6 mr-3 text-blue-600" />
            Profile Information
          </h2>
          <button
            onClick={onRefreshProfile}
            disabled={isRefreshing}
            className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 text-sm"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-900">{user?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email Address</p>
              <div className="flex items-center">
                <p className="font-semibold text-gray-900">{user?.email || 'N/A'}</p>
                {user?.email_verified_at ? (
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 ml-2" />
                )}
              </div>
            </div>
          </div>

        { user?.is_influencer === false && (
          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <Building className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">School Name</p>
              <p className="font-semibold text-gray-900">{user?.school_name || 'N/A'}</p>
            </div>
          </div>
        )}

        { user?.is_influencer === false && (
          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <GraduationCap className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Grade</p>
              <p className="font-semibold text-gray-900">{user?.grade || 'N/A'}</p>
            </div>
          </div>
        )}

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-semibold text-gray-900">{user?.city || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-semibold text-gray-900">{user?.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <Shield className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                {user?.is_influencer ? "Influencer" : user?.role || 'user'}
              </span>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-semibold text-gray-900">{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            {user?.is_active ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-semibold text-green-700">Active</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-semibold text-red-700">Inactive</p>
                </div>
              </>
            )}
          </div>
        </div>

        {user?.email_verified_at && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-700">
                Email verified on {formatDate(user.email_verified_at)}
              </p>
            </div>
          </div>
        )}

        {user && !user.email_verified_at && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-sm text-yellow-700">
                Please verify your email address
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3 text-blue-600" />
          Quick Actions
        </h2>
        <div className="space-y-4">
          <Link
            to="/programs"
            className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl text-blue-700 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group"
          >
            <BookOpen className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Browse Programs</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl text-green-700 hover:from-green-100 hover:to-blue-100 transition-all duration-200 group"
          >
            <TrendingUp className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">View Cart</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl text-purple-700 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
          >
            <Award className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;