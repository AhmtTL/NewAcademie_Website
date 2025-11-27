import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ReadyToStart: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white px-4 md:px-6">
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/images/journey-bg.png')",
          backgroundColor: "#83232E",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-10 md:py-16 px-8">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Ready to Start Your Journey?
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                Join thousands of students who have transformed their futures
                with NY Empire Academy. Your extraordinary journey begins here.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#83232E] hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl group"
                >
                  <Link to="/programs" className="flex items-center gap-x-2">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#83232E] transition-all duration-300"
                >
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/people.png"
                alt="Join our community"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ReadyToStart;
