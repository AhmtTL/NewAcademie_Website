import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock } from "lucide-react";
import { FutureCEOConfig } from "../../data/futureCEOConfigs";

interface ItineraryProps {
  config: FutureCEOConfig;
}

const Itinerary: React.FC<ItineraryProps> = ({ config }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]); // First day expanded by default

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const isExpanded = (day: number) => expandedDays.includes(day);

  return (
    <section
      id="itinerary"
      className="py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/itinerary.webp")` }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-black text-[#111827] mb-2">
            13-Day Itinerary
          </h2>
          <p className="text-lg text-[#4B5563] font-normal max-w-3xl mx-auto mb-6">
            A comprehensive journey from {config.startDate} to {config.endDate}
          </p>

          {/* Key Info Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-5 py-2 bg-[#7C1B25] text-white rounded-full border-2 border-[#7C1B25]">
              <Calendar className="w-4 h-4 mr-2 text-white" />
              <span className="text-xs font-semibold text-white">
                Classes: 9am - 12pm Daily
              </span>
            </div>
            <div className="inline-flex items-center px-5 py-2 bg-[#1F2444] rounded-full border-2 border-[#1F2444]">
              <Clock className="w-4 h-4 mr-2 text-white" />
              <span className="text-xs font-semibold text-white">
                Projects: 1pm - 3pm
              </span>
            </div>
            <div className="inline-flex items-center px-5 py-2 bg-[#2563EB] rounded-full border-2 border-[#2563EB]">
              <MapPin className="w-4 h-4 mr-2 text-white" />
              <span className="text-xs font-semibold text-white">
                Harvard & NYC
              </span>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Timeline */}
        <div className="space-y-4">
          {config.itinerary.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Day Card */}
              <div
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isExpanded(day.day)
                    ? "border-[#1F2444]"
                    : "hover:border-[#7C1B25]"
                }`}
              >
                {/* Day Header - Clickable */}
                <button
                  onClick={() => toggleDay(day.day)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Day Number Badge */}
                    <div
                      className={`md:w-14 md:h-14 w-10 h-10 rounded-xl flex items-center justify-center font-black md:text-xl text-base transition-colors flex-shrink-0 ${
                        isExpanded(day.day)
                          ? "bg-[#7C1B25] text-white"
                          : "bg-[#1F2444] text-white"
                      }`}
                    >
                      {day.day}
                    </div>

                    {/* Day Title */}
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-[#111827]">
                        {day.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-1">
                        {day.activities.length} activities planned
                      </p>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <ChevronDown
                    className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1 ml-2 ${
                      isExpanded(day.day) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Day Activities - Expandable */}
                <AnimatePresence>
                  {isExpanded(day.day) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5">
                          <ul className="space-y-3">
                            {day.activities.map((activity, actIndex) => (
                              <li
                                key={actIndex}
                                className="flex items-start gap-3 text-gray-700"
                              >
                                <div className="w-2 h-2 rounded-full bg-[#7C1B25] mt-2 flex-shrink-0"></div>
                                <span className="text-base leading-relaxed">
                                  {activity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;
