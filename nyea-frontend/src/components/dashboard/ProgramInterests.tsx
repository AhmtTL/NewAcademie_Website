import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, XCircle } from 'lucide-react';

interface ProgramInterestsProps {
  programInterests: any[];
  loadingInterests: boolean;
  interestsError: string | null;
  onRetry: () => void;
}

const ProgramInterests: React.FC<ProgramInterestsProps> = ({
  programInterests,
  loadingInterests,
  interestsError,
  onRetry
}) => {
  if (loadingInterests) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your interests...</p>
        </div>
      </div>
    );
  }

  if (interestsError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Interests</h3>
          <p className="text-red-700 mb-4">{interestsError}</p>
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

  if (programInterests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-md mx-auto">
          <Star className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 mb-2">No Programs Yet</h3>
          <p className="text-blue-700 mb-6">
            You haven't shown interest in any programs yet. Start exploring our educational offerings!
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {programInterests.filter(program => program && program.id).map((program: any) => (
        <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
          <div className="relative">
            <img
              src={program.image || '/images/placeholder.jpg'}
              alt={program.title || 'Program'}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                {program.category || 'General'}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {program.title || 'Untitled Program'}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
              {program.description || 'No description available'}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{program.duration || 'Duration TBA'}</span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {program.formatted_price || `$${parseFloat(program.price || 0).toLocaleString()}`}
              </div>
            </div>

            {program.features && program.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                <div className="space-y-1">
                  {program.features.slice(0, 3).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              to={program.slug ? `/programs/${program.slug}` : `/programs/${program.id}`}
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View Program Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramInterests;