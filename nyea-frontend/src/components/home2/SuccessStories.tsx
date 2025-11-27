import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Users,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const SuccessStories: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const testimonials = [
    {
      quote:
        '"NYEA transformed my academic journey. The mentorship was life-changing and opened doors to my dream university."',
      rating: "5.0 Platform Rating",
      university: "Now studying at Harvard",
      achievement: "Full Scholarship Recipient",
      name: "Sarah Johnson",
      title: "Harvard University Student",
      avatar: "https://i.pravatar.cc/150?img=1",
      bgColor: "#132241",
      iconColor: "#77A4FF",
    },
    {
      quote:
        '"The Teacher Development Program revolutionized my teaching approach. Now leading educational innovation at Stanford."',
      rating: "5.0 Platform Rating",
      university: "Now studying at Stanford",
      achievement: "PhD in Education",
      name: "Michael Chen",
      title: "Stanford Graduate",
      avatar: "https://i.pravatar.cc/150?img=33",
      bgColor: "#83232E",
      iconColor: "#FFA5B0",
    },
    {
      quote:
        '"The NASA Space Training program was incredible. Now working on Mars mission projects at MIT!"',
      rating: "5.0 Platform Rating",
      university: "Now studying at MIT",
      achievement: "NASA Research Fellow",
      name: "Emma Rodriguez",
      title: "MIT Aerospace Engineer",
      avatar: "https://i.pravatar.cc/150?img=5",
      bgColor: "#132241",
      iconColor: "#77A4FF",
    },
    {
      quote:
        '"The Cambridge Excellence program provided unparalleled academic rigor. Now pursuing my PhD at Oxford."',
      rating: "5.0 Platform Rating",
      university: "Now studying at Oxford",
      achievement: "Rhodes Scholar",
      name: "James Williams",
      title: "Oxford Doctoral Candidate",
      avatar: "https://i.pravatar.cc/150?img=12",
      bgColor: "#83232E",
      iconColor: "#FFA5B0",
    },
    {
      quote:
        '"The mentorship program connected me with industry leaders. Launched my own EdTech startup in Silicon Valley."',
      rating: "5.0 Platform Rating",
      university: "Now at Stanford GSB",
      achievement: "Startup Founder",
      name: "Priya Patel",
      title: "EdTech Entrepreneur",
      avatar: "https://i.pravatar.cc/150?img=9",
      bgColor: "#132241",
      iconColor: "#77A4FF",
    },
    {
      quote:
        '"From classroom to boardroom - the executive workshops transformed my leadership approach completely."',
      rating: "5.0 Platform Rating",
      university: "Now at Yale SOM",
      achievement: "Fortune 500 Executive",
      name: "David Kim",
      title: "Chief Learning Officer",
      avatar: "https://i.pravatar.cc/150?img=15",
      bgColor: "#83232E",
      iconColor: "#FFA5B0",
    },
  ];

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white rounded-full text-[#7F1B28] text-xs md:text-sm font-medium mb-4 md:mb-6 border border-[#7F1B28]">
            <Rocket className="w-4 h-4 mr-2" />
            TESTIMONIAL
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
            Success Stories
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our incredible alumni who are changing the world
          </p>
        </motion.div>

        {/* Testimonials Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] rounded-2xl md:rounded-3xl p-6 md:p-8 snap-start"
              style={{ backgroundColor: testimonial.bgColor }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Quote */}
              <p className="text-[#EDEDED] text-base md:text-lg leading-relaxed mb-6">
                {testimonial.quote}
              </p>

              {/* Achievement Items */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Star
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill={testimonial.iconColor}
                    color={testimonial.iconColor}
                  />
                  <span className="text-white text-sm">
                    {testimonial.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill={testimonial.iconColor}
                    color={testimonial.iconColor}
                  />
                  <span className="text-white text-sm">
                    {testimonial.university}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill={testimonial.iconColor}
                    color={testimonial.iconColor}
                  />
                  <span className="text-white text-sm">
                    {testimonial.achievement}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 my-6"></div>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h4 className="text-white font-semibold text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/80 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="flex items-center justify-center gap-x-2 mt-12 md:mt-16">
          <button
            onClick={handleScrollLeft}
            className="bg-white text-[#132241] border border-[#132241] rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 hover:bg-[#132241] hover:text-white"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleScrollRight}
            className="bg-white text-[#132241] border border-[#132241] rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 hover:bg-[#132241] hover:text-white"
            aria-label="Next testimonials"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
