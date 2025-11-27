import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import FeaturedPrograms from "../components/home2/FeaturedPrograms";
import UniversityPartners from "../components/home2/UniversityPartners";
import GlobalExcellenceMetrics from "../components/home2/GlobalExcellenceMetrics";
import OurServices from "../components/home2/OurServices";
import SuccessStories from "../components/home2/SuccessStories";
import ReadyToStart from "../components/home2/ReadyToStart";

const Home2: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-Screen Hero Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onLoadStart={() => console.log("Video loading started")}
            onCanPlay={() => console.log("Video can play")}
            onPlay={() => console.log("Video is playing")}
            onError={(e) => console.log("Video error:", e)}
          >
            <source src="/videos/university-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101222] via-[#101222]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#101222]/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative px-4 lg:px-40 z-10">
          <motion.div className="space-y-6">
            <motion.div
              className="w-auto inline-flex items-center px-8 py-2 bg-[#FFFFFF1A] backdrop-blur-md rounded-full text-[#ffffff] text-sm font-medium mb-0 space-x-2"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#ffffff] text-xs md:text-sm lg:text-md bg-[#1F2444] px-2 py-1 rounded-full">
                New
              </span>
              <span className="text-[#ffffff] text-xs md:text-sm lg:text-md">
                Registrations are now open!
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-black mb-0 leading-[0.85] tracking-tight text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                FORGE
              </motion.span>
              <br />
              <motion.span
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                EXCELLENCE
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl lg:text-xl text-white mb-0 max-w-full lg:max-w-5xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-white font-normal">
                Empowering leaders of tomorrow through world-
              </span>
              <br className="hidden md:block" />
              class education, mentorship and academic
              <br className="hidden lg:block" />
              <span className="text-white font-normal">innovation.</span>
            </motion.p>

            <div className="flex-col space-y-4">
              <motion.div
                className="flex flex-col sm:flex-row gap-6 w-fit"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.6, ease: "easeOut" }}
              >
                <Button size="lg" className="group shadow-2xl bg-[#7C1B25]">
                  <Link to="/programs" className="flex items-center gap-x-2">
                    Explore Our Programs
                    <img
                      src="/images/explore.svg"
                      alt="Arrow Right"
                      width={24}
                      height={24}
                    />
                  </Link>
                </Button>

                <Button variant="learn_more" size="lg" className="group">
                  <Link
                    to="/workshop-booking/leadership-negotiation-communication"
                    className="flex items-center gap-x-2"
                  >
                    Watch Our Story
                    <img
                      src="/images/story.svg"
                      alt="Arrow Right"
                      width={24}
                      height={24}
                    />
                  </Link>
                </Button>
              </motion.div>

              <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
                <div className="flex items-center gap-x-1">
                  <img src="/images/elite.svg" alt="Elite" />
                  <p className="text-base font-normal text-white">Elite Education</p>
                </div>

                <div className="flex items-center gap-x-1">
                  <img src="/images/global.svg" alt="Elite" />
                  <p className="text-base font-normal text-white">Elite Education</p>
                </div>

                <div className="flex items-center gap-x-1">
                  <img src="/images/scholar.svg" alt="Elite" />
                  <p className="text-base font-normal text-white">Elite Education</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <UniversityPartners />

      <FeaturedPrograms />

      <GlobalExcellenceMetrics />

      <OurServices />

      <SuccessStories />

      <ReadyToStart />
    </div>
  );
};

export default Home2;
