import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const GlobalExcellenceMetrics: React.FC = () => {
  const stats = [
    {
      number: "1000+",
      description: (
        <>
          Global students
          <br />
          mentored to success
        </>
      ),
    },
    {
      number: "98%",
      description: (
        <>
          Success rate, elite
          <br />
          performance
        </>
      ),
    },
    {
      number: "97",
      description: (
        <>
          Countries reached with
          <br />
          worldwide network
        </>
      ),
    },
    {
      number: "7",
      description: (
        <>
          Global offices at
          <br />
          premium locations
        </>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#132241] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Image and Stats Below */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
              <img
                src="/images/define-1.png"
                alt="Excellence in Education"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Stats Grid Below Image */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white">
                      {stat.number}
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs md:text-sm text-white leading-tight">
                        {stat.description}
                      </div>
                      <div className="border-b-2 border-white pt-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content and Image */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full text-white text-sm font-medium border border-[#FFFFFF80]">
              <Sparkles className="w-4 h-4 mr-2" />
              GLOBAL EXCELLENCE METRICS
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight">
              Numbers that Define Excellence
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed">
              Our track record speaks for itself. These aren't just numbers —
              they're proof of our commitment to transforming educational
              futures worldwide.
            </p>

            {/* Image with Testimonial Badge */}
            <motion.div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/define-2.png"
                alt="Student Success"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExcellenceMetrics;
