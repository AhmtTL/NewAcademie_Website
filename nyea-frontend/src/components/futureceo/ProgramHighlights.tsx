import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Target,
  TrendingUp,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";

interface ProgramHighlightsProps {
  config: FutureCEOConfig;
}

const iconMap: Record<string, React.ElementType> = {
  User,
  HelpCircle,
  Target,
  TrendingUp,
  Sparkles,
};

const ProgramHighlights: React.FC<ProgramHighlightsProps> = ({ config }) => {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#111827] mb-4">
            Program Highlights
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-xl mx-auto">
            Four core pillars that will transform you into a future CEO - They
            will shape your leadership journey
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || HelpCircle;

            // Alternating gradient pattern: Navy, Red, Red, Navy
            const gradients = [
              "from-[#132241] to-[#1e3a5f]",
              "from-[#7C1B25] to-[#a52a38]",
              "from-[#7C1B25] to-[#a52a38]",
              "from-[#132241] to-[#1e3a5f]",
            ];

            // Light accent colors for top-right corner and icon backgrounds
            const accentColors = [
              "#77A4FF", // Navy card - light blue
              "#FFA5B0", // Red card - light pink
              "#FFA5B0", // Red card - light pink
              "#77A4FF", // Navy card - light blue
            ];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl shadow-lg bg-gradient-to-br ${gradients[index]} p-8 h-full`}
                >
                  {/* Small colored light accent in top-right corner */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-50"
                    style={{ backgroundColor: accentColors[index] }}
                  ></div>

                  {/* Icon */}
                  <div
                    className="relative w-14 h-14 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: accentColors[index] }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-2xl font-bold text-white mb-4">
                    {highlight.title}
                  </h3>
                  <p className="relative text-white/90 leading-relaxed text-base">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
