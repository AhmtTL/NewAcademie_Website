import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, DollarSign, CheckCircle, Star, Briefcase, TrendingUp, Network, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api';

interface Program {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  formatted_price: string;
  duration: string;
  category: string;
  image: string;
  features: string[];
  available_tickets?: number;
  sold_tickets?: number;
  remaining_tickets?: number;
  has_available_tickets?: boolean;
  is_sold_out?: boolean;
}

const CareerDevelopment: React.FC = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getProgram('career-consulting');
        if (response.success) {
          setProgram(response.data.program || response.data);
        } else {
          setError('Program not found');
        }
      } catch (err) {
        console.error('Error fetching program:', err);
        setError('Failed to load program details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgram();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The program you are looking for does not exist.'}</p>
            <Link
              to="/programs"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        {program.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${program.image})` }}
          ></div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/programs"
              className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Programs
            </Link>
            
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider">
                {program.category}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {program.title}
            </h1>
            
            <p className="text-xl text-green-100 mb-8 max-w-3xl leading-relaxed">
              {program.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-300" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-2xl font-bold">{program.formatted_price}</span>
              </div>
              {program.available_tickets && (
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-yellow-300" />
                  <span>{program.remaining_tickets} spots available</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Program Features */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Program Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {program.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature}</h3>
                      <p className="text-gray-600 text-sm">
                        Professional {feature.toLowerCase()} with strategic career guidance.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Career Development Benefits */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Career Development Program?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Industry Analysis</h4>
                      <p className="text-gray-600 text-sm">Deep insights into market trends and industry opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Strategic Positioning</h4>
                      <p className="text-gray-600 text-sm">Position yourself strategically for career advancement and success.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Professional Preparation</h4>
                      <p className="text-gray-600 text-sm">Comprehensive preparation for interviews, negotiations, and career transitions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Network className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Network Building</h4>
                      <p className="text-gray-600 text-sm">Build valuable professional networks and industry connections.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Development Process */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Development Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Career Assessment</h4>
                      <p className="text-gray-600 text-sm">Comprehensive evaluation of skills, interests, and career goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Market Research</h4>
                      <p className="text-gray-600 text-sm">In-depth analysis of industry trends and opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Strategy Development</h4>
                      <p className="text-gray-600 text-sm">Create personalized career strategy and action plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Implementation Support</h4>
                      <p className="text-gray-600 text-sm">Ongoing guidance throughout your career advancement journey.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 sticky top-8"
            >
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {program.formatted_price}
                </div>
                <div className="text-gray-600">
                  Duration: {program.duration}
                </div>
              </div>

              {program.available_tickets && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Availability</span>
                    <span className="text-sm font-bold text-green-600">
                      {program.remaining_tickets} / {program.available_tickets} spots
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((program.sold_tickets || 0) / program.available_tickets) * 100}%` 
                      }}
                    ></div>
                  </div>
                  {program.remaining_tickets && program.remaining_tickets <= 10 && (
                    <p className="text-red-600 text-sm font-medium mt-2">
                      ⚡ Limited spots remaining!
                    </p>
                  )}
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Accelerate Your Career
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  Highly rated by our professionals
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDevelopment;
