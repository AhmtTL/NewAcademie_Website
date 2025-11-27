import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Award, Calendar } from "lucide-react";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";
import { Link } from "react-router-dom";

interface CTAProps {
  config: FutureCEOConfig;
}

const CTA: React.FC<CTAProps> = ({ config }) => {
  return (
    <section
      className="py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/cambridge-bg.webp")` }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
            Ready to Become a Future CEO?
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#E5E7EB] mb-9 max-w-2xl mx-auto leading-relaxed">
            Join an exclusive cohort of{" "}
            <span className="text-[#FACC15] font-medium">
              {config.capacity} ambitious students
            </span>{" "}
            for a transformative leadership experience at Harvard University.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Link
              to="/harvard-future-ceo-booking/harvard-ceo"
              className="group bg-[#7C1B25] text-white px-12 py-3 rounded-lg font-normal text-sm transition-all duration-300 flex items-center transform hover:scale-105"
            >
              <GraduationCap className="mr-3 h-7 w-7" />
              SECURE YOUR SPOT NOW
              <img
                src="/images/view-all.svg"
                alt="Arrow Right"
                width={24}
                height={24}
                className="ml-2"
              />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="gap-x-4 gap-y-4 text-[#D1D5DB] flex w-full items-center justify-center flex-wrap max-w-4xl">
            <div className="flex items-start justify-center gap-2 md:text-sm text-xs">
              <Users className="w-5 h-5 text-yellow-400" />
              <span>
                Limited to{" "}
                <span className="text-white text-xs font-semibold">
                  {config.capacity} students
                </span>
              </span>
            </div>

            <div className="flex items-start justify-center gap-2 md:text-sm text-xs">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span>
                Program runs from{" "}
                <span className="text-white text-xs font-semibold">
                  {/* {config.startDate} - {config.endDate} */}
                  Jan 11 - 23, 2026
                </span>
              </span>
            </div>

            <div className="flex items-start justify-center gap-2 md:text-sm text-xs">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>
                Includes{" "}
                <span className="text-white text-xs font-semibold">
                  {config.certificate}
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
