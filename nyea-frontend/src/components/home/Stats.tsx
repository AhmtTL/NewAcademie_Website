import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users2, Globe, Trophy, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Users2,
    label: 'Global Students',
    value: '1000+',
    description: 'Mentored to Success'
  },
  {
    icon: Trophy,
    label: 'Success Rate',
    value: '98%',
    description: 'Elite Performance'
  },
  {
    icon: Globe,
    label: 'Countries Reached',
    value: '97',
    description: 'Worldwide Network'
  },
  {
    icon: MapPin,
    label: 'Global Offices',
    value: '7',
    description: 'Premium Locations'
  }
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/stats.webp"
          alt="Elite university campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444] via-[#2d3d66]/95 to-[#9f162e]/95"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> */}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 md:px-6 py-2 bg-gradient-to-r from-[#60A5FA33] to-[#A855F733] rounded-full text-[#60A5FA] text-xs md:text-sm font-medium mb-6 md:mb-8 border border-[#60A5FA4D]">
            <Sparkles className="w-4 h-4 mr-2" />
            GLOBAL EXCELLENCE METRICS
          </div>

          <h2 className="max-w-full md:max-w-3xl mx-auto text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            NUMBERS THAT DEFINE EXCELLENCE
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-[#D1D5DB] max-w-full md:max-w-4xl mx-auto leading-relaxed">
            Our track record speaks for itself. These aren't just numbers—they're proof of<br />
            our commitment to transforming educational futures worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#1A1A1A99] backdrop-blur-md rounded-3xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeInOut" } }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="mb-8">
                <stat.icon className="h-7 w-7 text-[#82A8FB]" />
              </div>

              {/* Value */}
              <div className="text-4xl md:text-6xl font-extrabold text-[white] mb-3 leading-none">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-white font-semibold text-lg mb-2 leading-tight">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-slate-300 text-sm font-medium">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;