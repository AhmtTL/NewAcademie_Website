import React from "react";
import { motion } from "framer-motion";
import { Clock4, DollarSign, Sparkles, Users } from "lucide-react";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";

interface IntroductionProps {
  config: FutureCEOConfig;
}

const Introduction: React.FC<IntroductionProps> = ({ config }) => {
  return (
    <section
      className="py-20 md:py-28 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/intro-bg.webp")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 border border-[#FACC15] rounded-full mb-6 uppercase">
              <Sparkles className="w-4 h-4 text-[#FACC15] mr-2" />
              <span className="text-[#FACC15] font-medium text-sm">
                About the Program
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-white mb-6 leading-tight max-w-lg">
              {config.introduction.title}
            </h2>

            {/* Content Paragraphs */}
            <div className="space-y-5">
              {config.introduction.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-[#FFFFFFCC] font-normal leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-x-8 flex-wrap gap-y-4"
            >
              <div className="flex flex-col items-start gap-y-2">
                <div className="flex items-center gap-x-2">
                  <Clock4 className="w-6 h-6 text-[#FACC15]" />
                  <p className="text-base font-normal text-[#D1D5DB]">
                    Duration
                  </p>
                </div>

                <p className="text-base font-bold text-white">
                  {config.duration}
                </p>
              </div>

              <div className="flex flex-col items-start gap-y-2">
                <div className="flex items-center gap-x-2">
                  <DollarSign className="w-6 h-6 text-[#FACC15]" />
                  <p className="text-base font-normal text-[#D1D5DB]">
                    Registration
                  </p>
                </div>
                <p className="text-base font-bold text-white">
                  $
                  {config.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex flex-col items-start gap-y-2">
                <div className="flex items-center gap-x-2">
                  <Users className="w-6 h-6 text-[#FACC15]" />
                  <p className="text-base font-normal text-[#D1D5DB]">Students</p>
                </div>
                <p className="text-base font-bold text-white">{config.capacity}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
