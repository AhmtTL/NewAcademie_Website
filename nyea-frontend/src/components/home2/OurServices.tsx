import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "../ui/button";

const OurServices: React.FC = () => {
  const services = [
    {
      icon: "/images/potential-1.svg",
      title: "Academic Consulting",
      description:
        "Personalized assessment of talents, learning styles, and optimal educational pathways.",
    },
    {
      icon: "/images/potential-2.svg",
      title: "Elite Mentorship",
      description:
        "One-on-one guidance from successful professionals and industry leaders.",
    },
    {
      icon: "/images/potential-3.svg",
      title: "Career Acceleration",
      description:
        "Strategic career planning and professional development opportunities.",
    },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F6F6F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white rounded-full text-[#7F1B28] text-xs md:text-sm font-medium mb-4 md:mb-6 border border-[#7F1B28]">
            <Rocket className="w-4 h-4 mr-2" />
            OUR SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
            Where Potential Meets Preparation
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive educational solutions tailored to unlock your full
            potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
              <img
                src="/images/potential.png"
                alt="Educational Excellence"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-x-2">
                    <img src={service.icon} alt={service.title} />
                    <h3 className="text-xl font-semibold text-[#0F0F0F]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text[#4B5563] font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-12 md:mt-16 lg:mt-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button variant="learn_more" size="lg" className="group gap-x-2">
                LEARN MORE
                <img
                  src="/images/view-all.svg"
                  alt="Arrow Right"
                  width={24}
                  height={24}
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
