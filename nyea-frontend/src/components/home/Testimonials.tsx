import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Harvard University Student',
      university: 'Harvard',
      content: 'NYEA transformed my academic journey. The mentorship was life-changing and opened doors to my dream university.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'Full Scholarship Recipient'
    },
    {
      name: 'Michael Chen',
      role: 'Stanford Graduate',
      university: 'Stanford',
      content: 'The Teacher Development Program revolutionized my teaching approach. Now leading educational innovation at Stanford.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'PhD in Education'
    },
    {
      name: 'Emma Rodriguez',
      role: 'MIT Aerospace Engineer',
      university: 'MIT',
      content: 'The NASA Space Training program was incredible. Now working on Mars mission projects at MIT!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'NASA Research Fellow'
    },
    {
      name: 'Sarah Johnson',
      role: 'Harvard University Student',
      university: 'Harvard',
      content: 'NYEA transformed my academic journey. The mentorship was life-changing and opened doors to my dream university.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'Full Scholarship Recipient'
    },
    {
      name: 'Michael Chen',
      role: 'Stanford Graduate',
      university: 'Stanford',
      content: 'The Teacher Development Program revolutionized my teaching approach. Now leading educational innovation at Stanford.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'PhD in Education'
    },
    {
      name: 'Emma Rodriguez',
      role: 'MIT Aerospace Engineer',
      university: 'MIT',
      content: 'The NASA Space Training program was incredible. Now working on Mars mission projects at MIT!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      achievement: 'NASA Research Fellow'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50/50">
      <div className="mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            SUCCESS STORIES
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-full md:max-w-3xl mx-auto">
            Hear from our incredible alumni who are changing the world
          </p>
        </motion.div>

        {/* Continuous Scrolling Layout */}
        <div className="overflow-hidden relative">
          <motion.div 
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: "200%" }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mr-4 md:mr-6 lg:mr-8">
                <Card className="w-72 md:w-96 p-6 md:p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center mb-4 md:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-3 md:mr-4 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm md:text-base">{testimonial.role}</p>
                      <div className="inline-flex items-center mt-1 px-2 md:px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                        <span className="text-xs font-semibold text-blue-700">{testimonial.achievement}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">"{testimonial.content}"</p>
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-500">Now studying at</span>
                      <span className="font-semibold text-blue-600 text-sm md:text-base">{testimonial.university}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mr-4 md:mr-6 lg:mr-8">
                <Card className="w-72 md:w-96 p-6 md:p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center mb-4 md:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-3 md:mr-4 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm md:text-base">{testimonial.role}</p>
                      <div className="inline-flex items-center mt-1 px-2 md:px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                        <span className="text-xs font-semibold text-blue-700">{testimonial.achievement}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">"{testimonial.content}"</p>
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-500">Now studying at</span>
                      <span className="font-semibold text-blue-600 text-sm md:text-base">{testimonial.university}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;