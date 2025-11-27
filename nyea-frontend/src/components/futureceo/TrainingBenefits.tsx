import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, BookOpen, Users, GraduationCap, CheckCircle } from 'lucide-react';
import { FutureCEOConfig } from '../../data/futureCEOConfigs';

interface TrainingBenefitsProps {
  config: FutureCEOConfig;
}

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  CheckCircle
};

const TrainingBenefits: React.FC<TrainingBenefitsProps> = ({ config }) => {
  return (
    <section className="py-12 md:py-16 bg-[#1F2444] relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#FACC15] mb-4">
            <Zap className="w-3 h-3 text-[#FACC15] mr-2" />
            <span className="text-[#FACC15] font-semibold text-xs uppercase">What You'll Gain</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Training Benefits
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Five powerful outcomes that will elevate your leadership capabilities
          </p>
        </motion.div>

        {/* Benefits Grid - Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {config.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || CheckCircle;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#2a3555] rounded-2xl p-4 h-full flex flex-col shadow-lg">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-[#7C1B25] rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[13px] font-bold text-white mb-3 text-left">
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[12px] text-[#D1D5DB] font-normal leading-relaxed text-left">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CPD Certification Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img 
            src="/images/cpd2.webp" 
            alt="CPD Accredited Certificate" 
            className="h-20 md:h-24 w-auto mx-auto opacity-90"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingBenefits;
