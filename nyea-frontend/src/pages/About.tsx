import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Achievements from '../components/about/Achievements';
import MissionVision from '../components/about/MissionVision';
import Values from '../components/about/Values';
import Timeline from '../components/about/Timeline';
import GlobalPresence from '../components/about/GlobalPresence';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 flex items-center justify-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Elite institution"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/60 to-purple-900/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="w-auto inline-flex items-center px-8 py-2 bg-[#FACC151A] backdrop-blur-md rounded-full text-[#FACC15] text-sm font-bold mb-8 shadow-2xl border border-[#FACC154D]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Award className="w-5 h-5 mr-3 text-[#FACC15]" />
              <span className="text-[#FACC15] text-xs md:text-sm lg:text-md uppercase">Shaping Future Trailblazers</span>
            </motion.div>


            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tight">
              <span className="text-white drop-shadow-2xl">
                FORGING
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                LEGENDS
              </span>
              <br />
            </h1>

            <motion.p
              className="text-sm md:text-lg lg:text-xl text-gray-300 mb-12 max-w-full md:max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We don't just educate—we architect destinies. NYEA is the clandestine force behind
              the world's most extraordinary academic achievements and career transformations.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button variant="primary" size="lg" className="group shadow-2xl">
                <Link to="/contact" className="flex items-center">
                  Contact us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="learn_more" size="lg" className="group">
                See our Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <Achievements />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Values Section */}
      <Values />

      {/* Timeline Section */}
      <Timeline />

      {/* Global Presence */}
      <GlobalPresence />
    </div>
  );
};

export default About; 