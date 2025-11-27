import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users } from 'lucide-react';
import { FutureCEOConfig } from '../../data/futureCEOConfigs';

interface InstructorsProps {
  config: FutureCEOConfig;
}

const Instructors: React.FC<InstructorsProps> = ({ config }) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0f1729] via-[#1a2744] to-[#0f1729] relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center px-4 py-2 bg-yellow-500/10 backdrop-blur-sm rounded-full border border-yellow-400/30 mb-6">
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-sm">World-Class Faculty</span>
          </div> */}
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Instructors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn from Harvard's finest educators and leadership experts
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {config.instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card with unique design */}
              <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-500 shadow-2xl hover:shadow-yellow-500/20">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8">
                  {/* Image Section */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative flex-shrink-0">
                      {/* Image container with unique frame */}
                      <div className="relative w-28 h-28">
                        {/* Decorative border */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                        
                        {/* Actual image */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white/10">
                          <img 
                            src={instructor.image} 
                            alt={instructor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/cambridge-teacher.webp'; // Fallback image
                            }}
                          />
                        </div>
                      </div>

                      {/* Verified badge */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-[#0f1729] shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {instructor.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <p className="text-sm font-semibold text-yellow-400">
                          {instructor.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          {instructor.credentials}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <p className="text-gray-300 leading-relaxed pl-4">
                      {instructor.bio}
                    </p>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center hidden"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-yellow-400/30">
            <Award className="w-6 h-6 text-yellow-400" />
            <p className="text-white font-semibold">
              Learn from instructors with <span className="text-yellow-400 font-black">50+ years</span> combined teaching experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Instructors;

