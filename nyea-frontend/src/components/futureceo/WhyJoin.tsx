import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Users,
  Globe,
  Brain,
  Rocket,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";
import { Link } from "react-router-dom";

interface WhyJoinProps {
  config: FutureCEOConfig;
}

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Award,
  Users,
  Globe,
  Brain,
  Rocket,
};

const WhyJoin: React.FC<WhyJoinProps> = ({ config }) => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#7F1B28] mb-6">
            <Rocket className="w-4 h-4 text-[#8B0000] mr-2" />
            <span className="text-[#7F1B28] font-normal text-xs uppercase">
              Your Path to Success
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl font-bold text-[#111827] mb-2">
            {config.whyJoin.title}
          </h2>
          <p className="text-lg text-[#4B5563] font-normal max-w-3xl mx-auto">
            Six compelling reasons why this program will transform your future
          </p>
        </motion.div>

        {/* Reasons Grid with unique card designs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.whyJoin.reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon] || Rocket;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Unique card design - tilted perspective */}
                <div className="relative h-full">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B0000] via-orange-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 group-hover:border-transparent">
                    {/* Image header */}
                    {reason.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={reason.image}
                          alt={reason.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-transparent"></div>

                        {/* Floating icon */}
                        <div className="absolute bottom-4 left-4 w-14 h-14 bg-[#7C1B25] rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-[15px] font-bold text-[#111827] mb-3 group-hover:text-[#7C1B25] transition-colors">
                        {reason.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] font-normal leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link
            to="/harvard-future-ceo-booking/harvard-ceo"
            className="group bg-[#7C1B25] text-white px-12 py-6 rounded-2xl font-black text-sm md:text-xl hover:from-yellow-600 hover:to-red-700 transition-all duration-300 shadow-2xl flex items-center transform hover:scale-105"
          >
            <GraduationCap className="mr-3 h-7 w-7 group-hover:animate-bounce" />
            VIEW AVAILABLE SESSIONS
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
