import React from "react";
import { motion } from "framer-motion";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";
import { Link } from "react-router-dom";

interface HeroProps {
  config: FutureCEOConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <div className="relative">
      <div className="relative bg-[#1F2444] pt-16 md:pt-20 pb-52">
        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 space-y-12">
          <div className="space-y-4">
            <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto">
              <img src="/images/future-ceo-school-test.jpeg" alt="Future CEO School Test" className="w-full h-auto" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-6xl font-black text-white leading-tight"
              >
                <span className="block text-lg md:text-xl lg:text-2xl font-bold text-yellow-400">
                  2K26
                </span>
                Future CEO
                <span className="block text-white">Training Program</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto font-medium"
              >
                {config.subtitle}
              </motion.p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/harvard-future-ceo-booking/harvard-ceo"
                className="bg-[#7C1B25] text-white px-10 py-4 rounded-lg font-medium text-sm md:text-base hover:bg-[#9a2230] transition-all duration-300 shadow-xl flex items-center transform hover:scale-105"
              >
                VIEW AVAILABLE SESSIONS
                <img
                  src="/images/explore.svg"
                  alt="Arrow Right"
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </Link>
              <a
                href="#itinerary"
                className="border border-white text-white px-10 py-4 rounded-lg font-medium text-sm md:text-base hover:bg-white hover:text-[#1F2444] transition-all duration-300 flex items-center"
              >
                VIEW PROGRAM DETAILS
                <img
                  src="/images/view-all.svg"
                  alt="Arrow Right"
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center text-[#DBDBDB] font-normal text-sm md:text-base gap-x-4 gap-y-2 flex-wrap"
            >
              <div className="flex items-center gap-x-1">
                <img src="/images/crown.svg" alt="Crown" />
                <span>
                  Led by{" "}
                  <span className="text-[#FACC15] font-medium">
                    {config.ledBy}
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-x-1">
                <img src="/images/badge.svg" alt="Crown" />
                <span>
                  Includes: <span>{config.certificate}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative pb-[550px] sm:pb-[600px] md:pb-80 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute left-0 right-0 mx-auto -top-32 sm:-top-36 md:-top-40 w-full max-w-6xl px-4 z-20"
        >
          <div className="bg-white rounded-[20px] shadow-2xl mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative h-64 lg:h-auto">
                <img
                  src="/images/future-1.jpeg"
                  alt="Future CEO Program"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>

              <div className="flex flex-col gap-y-4 h-full">
                <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-y-2 h-full">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <img src="/images/calendar.svg" alt="Calendar" />
                    </div>
                    <p className="text-[#7C1B25] text-xs font-semibold uppercase">
                      Training Date
                    </p>
                  </div>

                  <div className="space-y-0">
                    <p className="text-[#121212] text-xl md:text-3xl font-bold">
                      Jan 11 - 23, 2026
                    </p>
                    <p className="text-[#555555] text-sm font-semibold">
                      (2 weeks)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-y-2 h-full">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center">
                        <img src="/images/money.svg" alt="money" />
                      </div>
                      <p className="text-[#7C1B25] text-xs font-semibold uppercase">
                        Registration Fee
                      </p>
                    </div>
                    <div className="text-[#121212] text-xl md:text-3xl font-bold">
                      $
                      {config.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-y-2 h-full">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center">
                        <img src="/images/people.svg" alt="people" />
                      </div>
                      <p className="text-[#7C1B25] text-xs font-semibold uppercase">
                        Limited to
                      </p>
                    </div>
                    <div className="text-[#121212] text-xl md:text-3xl font-bold">
                      {config.capacity} Students
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
