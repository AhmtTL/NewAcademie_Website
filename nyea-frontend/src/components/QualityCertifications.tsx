import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle } from 'lucide-react';

interface QualityCertificationsProps {
  variant?: 'default' | 'compact' | 'footer';
  className?: string;
}

const QualityCertifications: React.FC<QualityCertificationsProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management System',
      icon: Award,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Professional Standards',
      description: 'Industry Certified Programs',
      icon: Shield,
      color: 'from-green-600 to-emerald-600'
    },
    {
      name: 'Educational Excellence',
      description: 'Academic Quality Assurance',
      icon: CheckCircle,
      color: 'from-purple-600 to-violet-600'
    }
  ];

  if (variant === 'footer') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="text-white/80 text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-md border border-white/20 backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <Award className="h-3 w-3" />
            <span>ISO 9001:2015</span>
          </div>
          <div className="text-xs opacity-75">Quality Certified</div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {certifications.slice(0, 2).map((cert, i) => {
          const IconComponent = cert.icon;
          return (
            <div 
              key={i}
              className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${cert.color}/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium`}
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {cert.name}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <Award className="w-4 h-4 mr-2" />
            QUALITY CERTIFICATIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Certified Excellence in Education
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our commitment to quality is validated by international standards and professional certifications, 
            ensuring world-class educational experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, i) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={i}
                className={`relative p-8 bg-gradient-to-br ${cert.color}/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:${cert.color}/20 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cert.color}/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{cert.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualityCertifications;

