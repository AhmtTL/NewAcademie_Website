import React from "react";
import { motion } from "framer-motion";

const UniversityPartners: React.FC = () => {
  const universityPartners = [
    "/images/school-1.svg",
    "/images/school-2.svg",
    "/images/school-3.svg",
    "/images/school-4.svg",
    "/images/school-5.svg",
    "/images/school-6.svg",
    "/images/partner7.png",
    "/images/school-8.svg",
    "/images/school-9.svg",
    "/images/school-10.svg",
    "/images/school-11.svg",
    "/images/partner12.png",
    "/images/school-13.svg",
  ];

  return (
    <section className="py-12 md:py-16 lg:py-10 bg-white relative overflow-hidden border-b border-gray-200">
      <div className="relative z-10 mx-auto px-0">
        <div className="overflow-hidden relative">
          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ width: "200%" }}
          >
            {/* First set of partners */}
            {universityPartners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-16 md:w-20 lg:w-24 mx-6 md:mx-8 lg:mx-10 xl:mx-12 flex items-center justify-center"
              >
                <img
                  src={partner}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-auto object-contain filter transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {universityPartners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-16 md:w-20 lg:w-24 mx-6 md:mx-8 lg:mx-10 xl:mx-12 flex items-center justify-center"
              >
                <img
                  src={partner}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-auto object-contain filter transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UniversityPartners;
