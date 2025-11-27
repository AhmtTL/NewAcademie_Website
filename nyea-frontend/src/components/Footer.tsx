import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import QualityCertifications from './QualityCertifications';

const Footer: React.FC = () => {

  return (
    <footer className="relative bg-[#1f2444] border-t border-[#2d3d66]">
      {/* Global Presence Background */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 opacity-40">
        <div className="absolute inset-0">
          <img
            src="/images/google-map.webp"
            alt="Global Presence - Our Roots Worldwide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1f2444]/30"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Top Section - Balanced Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">

            {/* Brand Section - Streamlined */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Logo and Brand - Compact */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <img src="/images/logo-icon2.svg" alt="NYEA" className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">NYEA</h2>
                    <div className="h-0.5 w-8 bg-gradient-to-r from-[#9f162e] to-[#1f2444] rounded-full"></div>
                  </div>
                </div>
                
                <p className="text-white/80 text-xs leading-relaxed mb-3">
                  Pioneering global education since <span className="font-semibold text-white">2016</span>. We transform futures through world-class programs and innovative learning experiences.
                </p>

                {/* Quick Stats - Compact */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-base font-bold text-white">9+</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">Years</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">1000+</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider">Students</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Programs Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-white font-bold text-base mb-1">Programs</h3>
                  <div className="h-0.5 w-6 bg-gradient-to-r from-[#9f162e] to-transparent rounded-full mb-4"></div>
                </div>
                <nav className="space-y-3">
                  <Link to="/programs" className="block text-white/90 hover:text-white text-sm transition-colors">
                    All Programs
                  </Link>
                  <Link to="/elite-workshops" className="block text-white/90 hover:text-white text-sm transition-colors">
                    Elite Workshops
                  </Link>
                  <Link to="/teacher-development" className="block text-white/90 hover:text-white text-sm transition-colors">
                    Teacher Development
                  </Link>
                  <Link to="/nasa-programs" className="block text-white/90 hover:text-white text-sm transition-colors">
                    NASA Training
                  </Link>
                </nav>
              </motion.div>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-white font-bold text-base mb-1">Company</h3>
                  <div className="h-0.5 w-6 bg-gradient-to-r from-[#9f162e] to-transparent rounded-full mb-4"></div>
                </div>
                <nav className="space-y-3">
                  <Link to="/about" className="block text-white/90 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                  <Link to="/contact" className="block text-white/90 hover:text-white text-sm transition-colors">
                    Contact Us
                  </Link>
                  <Link to="/login" className="block text-white/90 hover:text-white text-sm transition-colors">
                    Student Portal
                  </Link>
                  <Link to="/help-center" className="block text-white/90 hover:text-white text-sm transition-colors">
                    Help Center
                  </Link>
                </nav>
              </motion.div>
            </div>

            {/* Contact Information Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-white font-bold text-base mb-1">Contact</h3>
                  <div className="h-0.5 w-6 bg-gradient-to-r from-[#9f162e] to-transparent rounded-full mb-4"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#9f162e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-[#9f162e]" />
                    </div>
                    <a href="mailto:hello@nyempireacademy.com" className="text-white/90 hover:text-white text-sm transition-colors">
                      hello@nyempireacademy.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#9f162e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-[#9f162e]" />
                    </div>
                    <span className="text-white/90 text-sm">+1 (347) 891-3911</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#9f162e]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-[#9f162e]" />
                    </div>
                    <span className="text-white/90 text-sm leading-relaxed">Empire State Building, 20 W 34th street, New York</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>



          {/* Copyright Row */}
          <div className="border-t border-[#2d3d66] pt-4 pb-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-3 sm:space-y-0"
            >
              {/* CPD Logo at the beginning of copyright section */}
              <div className="flex items-center space-x-4 order-1 sm:order-1">
                <img 
                  src="/images/cpd2.webp" 
                  alt="Accredited Institution" 
                  className="h-8 w-auto opacity-90"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="text-white/80 text-xs font-medium px-2 py-1 bg-white/10 rounded">ACCREDITED</div>';
                    }
                  }}
                />
              {/* <div className="flex items-center space-x-4 order-1 sm:order-1"> */}
                
                {/* Quality Certifications */}
                <QualityCertifications variant="footer" />
                <div className="text-gray-500 text-center sm:text-left text-xs">
                  © 2016-2025 New York Empire Academy. All rights reserved.
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 order-2 sm:order-2 text-xs">
                <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 transition-colors px-2 py-1">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link to="/cookie-policy" className="text-gray-500 hover:text-gray-300 transition-colors px-2 py-1">
                  Cookie Management
                </Link>
                <span className="text-gray-600">|</span>
                <Link to="/terms" className="text-gray-500 hover:text-gray-300 transition-colors px-2 py-1">
                  Terms of Service
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 