import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import FeaturedPrograms from '../components/home/FeaturedPrograms';
import UniversityPartners from '../components/home/UniversityPartners';
import Testimonials from '../components/home/Testimonials';
import Services from '../components/home/Services';
import Stats from '../components/home/Stats';
import CTA from '../components/home/CTA';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-Screen Hero Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onPlay={() => console.log('Video is playing')}
            onError={(e) => console.log('Video error:', e)}
          >
            <source
              src="/videos/university-hero.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          
          {/* Video overlay gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/35 to-slate-800/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white rotate-12"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white rotate-45"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div>
            {/* Badge - appears first after video has time to show */}
            <motion.div
              className="w-auto inline-flex items-center px-8 py-2 bg-gradient-to-r from-[#9f162e33] to-[#1f244433] backdrop-blur-md rounded-full text-[#ffffff] text-sm font-medium mb-8 shadow-2xl border border-[#9f162e4D]"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 mr-3 text-[#ffffff]" />
              <span className="text-[#ffffff] text-xs md:text-sm lg:text-md">Elite Education • 1000+ Global Alumni</span>
              <ChevronRight className="w-5 h-5 ml-3 text-[#ffffff]" />
            </motion.div>

            {/* Main Title - appears second */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="text-[#FFFFFF] drop-shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                FORGE
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-br from-white via-gray-100 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                EXCELLENCE
              </motion.span>
            </motion.h1>

            {/* Description - appears third */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-[#F3F4F6] mb-12 max-w-full lg:max-w-5xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-white font-semibold">Where visionary minds meet world-class education.</span>
              <br className="hidden md:block" />
              From NASA space exploration to revolutionary teaching methodologies—
              <br className="hidden lg:block" />
              <span className="bg-gradient-to-br from-white via-gray-100 to-red-300 bg-clip-text text-transparent drop-shadow-2xl font-semibold">we don't just educate, we transform destinies.</span>
            </motion.p>

            {/* Buttons - appear last */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6, ease: "easeOut" }}
            >
              <Button variant="primary" size="lg" className="group shadow-2xl">
                <Link to="/programs" className="flex items-center">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="learn_more" size="lg" className="group">
                <Link to="/workshop-booking/leadership-negotiation-communication" className="flex items-center">
                  Upcoming Workshop                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* University Partners */}
      <UniversityPartners />

      {/* Featured Programs */}
      <FeaturedPrograms />

      {/* Services */}
      <Services />

      {/* Stats Section - Completely Revamped */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Home;
