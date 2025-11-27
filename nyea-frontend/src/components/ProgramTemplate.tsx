import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProgramFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface ProgramBenefit {
  title: string;
  description: string;
}

interface ProgramPackage {
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  gradient: string;
}

interface Testimonial {
  name: string;
  role: string;
  university?: string;
  content: string;
  image: string;
  rating: number;
}

interface ProgramTemplateProps {
  // Hero Section
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  gradient: string;
  badge: string;
  
  // Program Details
  features: ProgramFeature[];
  benefits: ProgramBenefit[];
  packages: ProgramPackage[];
  
  // Content
  overview: string;
  targetAudience: string[];
  curriculum: string[];
  
  // Social Proof
  testimonials: Testimonial[];
  stats: {
    students: string;
    satisfaction: string;
    placement: string;
    duration: string;
  };
  
  // Customization
  primaryColor: string;
  secondaryColor: string;
}

const ProgramTemplate: React.FC<ProgramTemplateProps> = ({
  title,
  subtitle,
  description,
  heroImage,
  gradient,
  badge,
  features,
  benefits,
  packages,
  overview,
  targetAudience,
  curriculum,
  testimonials,
  stats,
  primaryColor,
  secondaryColor
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`}></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className={`absolute top-20 left-10 w-72 h-72 ${primaryColor}/20 rounded-full blur-3xl`}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-20 right-10 w-96 h-96 ${secondaryColor}/20 rounded-full blur-3xl`}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 shadow-2xl border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-5 h-5 mr-3 text-yellow-400" />
              {badge}
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="text-white drop-shadow-2xl">
                {title}
              </span>
            </h1>
            
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {subtitle}
            </h2>
            
            <motion.p 
              className="text-xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className={`group shadow-2xl bg-gradient-to-r ${gradient} border-0`}>
                <Link to="/contact" className="flex items-center">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="group bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className={`text-4xl font-black ${primaryColor} mb-2`}>{stats.students}</div>
              <div className="text-gray-600 font-medium">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black ${secondaryColor} mb-2`}>{stats.satisfaction}</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black ${primaryColor} mb-2`}>{stats.placement}</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-black ${secondaryColor} mb-2`}>{stats.duration}</div>
              <div className="text-gray-600 font-medium">Program Duration</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-8">Program Overview</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{overview}</p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Target Audience</h3>
                {targetAudience.map((audience, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${primaryColor} mr-3`} />
                    <span className="text-gray-700">{audience}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Curriculum</h3>
                <div className="space-y-4">
                  {curriculum.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mr-4 flex-shrink-0 mt-1`}>
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25v50L50 100L6.7 75V25z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black text-white mb-8">Program Features</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover what makes our program exceptional and transformative
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="p-8 border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                  <p className="text-white/90 text-center leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose This Program?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your future with our comprehensive approach to educational excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mr-6 flex-shrink-0`}>
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black text-white mb-8">Choose Your Package</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the perfect plan that fits your educational goals and timeline
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`absolute -inset-1 bg-gradient-to-r ${pkg.gradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                
                <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-black text-white mb-4">{pkg.name}</CardTitle>
                    <div className="space-y-2">
                      <span className={`text-5xl font-black bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                        ${pkg.price}
                      </span>
                      <div className="text-gray-400 text-sm">{pkg.duration}</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    <Button className={`w-full mt-8 bg-gradient-to-r ${pkg.gradient} text-white font-bold hover:scale-105 transition-transform border-0`}>
                      <Link to="/contact" className="flex items-center justify-center w-full">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Student Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our graduates who transformed their educational journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                      {testimonial.university && (
                        <p className="text-sm text-blue-600 font-semibold">{testimonial.university}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 bg-gradient-to-r ${gradient} text-white relative overflow-hidden`}>
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
              Join thousands of students who have achieved their dreams through our program. 
              Your journey to excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="apple" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl">
                <Link to="/contact">
                  Enroll Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-white/10 backdrop-blur-sm">
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramTemplate; 