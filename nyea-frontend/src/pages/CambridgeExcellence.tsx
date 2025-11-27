import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, GraduationCap, Award, BookOpen, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

const CambridgeExcellence: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState('certificate');
  const [expandedFAQ, setExpandedFAQ] = useState<number>(0);

  const packages = [
    {
      id: 'certificate',
      name: 'Cambridge Certificate',
      price: 2499,
      duration: '4 weeks',
      gradient: 'from-indigo-500 to-blue-600',
      popular: false,
      features: [
        'Cambridge curriculum access',
        'Faculty-led sessions',
        'Academic writing training',
        'Research methodology',
        'Official Cambridge certificate'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Program',
      price: 4999,
      duration: '8 weeks',
      gradient: 'from-blue-600 to-purple-600',
      popular: true,
      features: [
        'Everything in Certificate',
        'One-on-one mentoring',
        'Research project supervision',
        'Publication opportunities',
        'Cambridge alumni network access',
        'University application support'
      ]
    },
    {
      id: 'intensive',
      name: 'Intensive Track',
      price: 7999,
      duration: '12 weeks',
      gradient: 'from-purple-600 to-violet-600',
      popular: false,
      features: [
        'Everything in Advanced',
        'Thesis supervision',
        'Conference presentation',
        'Industry partnership projects',
        'Cambridge recommendation letter',
        'Career placement assistance'
      ]
    }
  ];

  const faqs = [
    {
      q: 'What makes this program officially Cambridge certified?',
      a: 'Our program is developed in partnership with Cambridge University faculty and follows their rigorous academic standards. Upon completion, you receive an official Cambridge Certificate of Professional Development.'
    },
    {
      q: 'Who is eligible for the Cambridge Excellence Program?',
      a: 'The program is open to high school students (advanced English required), university students, and working professionals. We assess applications based on academic background and motivation.'
    },
    {
      q: 'How does the curriculum compare to actual Cambridge courses?',
      a: 'Our curriculum mirrors the academic rigor of Cambridge University courses, with the same standards for critical thinking, research methodology, and academic writing that Cambridge students experience.'
    },
    {
      q: 'What career opportunities does this certification provide?',
      a: 'Cambridge certification is globally recognized and significantly enhances university applications, scholarship opportunities, and career prospects in academia, research, and professional fields.'
    },
    {
      q: 'Can I get university credit for this program?',
      a: 'Many universities recognize Cambridge certificates for transfer credit. We provide official transcripts and documentation to support credit transfer applications.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Harvard University Student',
      content: 'The Cambridge Excellence Program was instrumental in my Harvard acceptance. The research methodology training and writing skills I gained were invaluable.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Oxford Graduate',
      content: 'This program prepared me exceptionally well for Oxford. The academic rigor and faculty mentorship exceeded my expectations.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Scientist',
      content: 'The research skills I developed in this program directly contributed to my success in my PhD and current research career.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-indigo-300 text-sm font-semibold mb-6 border border-indigo-400/30">
              <Award className="w-4 h-4 mr-2" />
              CAMBRIDGE CERTIFIED • WORLD-CLASS EDUCATION
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              CAMBRIDGE
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                EXCELLENCE
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-blue-200">
                PROGRAM
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-200 max-w-4xl mx-auto mb-8 leading-relaxed">
              Official Cambridge University certified programs for academic and professional excellence. 
              Experience the same academic rigor and world-class education that Cambridge students receive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl">
                <Link to="#packages" className="flex items-center">
                  View Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900">
                <Link to="#about" className="flex items-center">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cambridge Excellence?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience authentic Cambridge education with official certification and world-class faculty guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: 'Cambridge Faculty',
                description: 'Learn directly from Cambridge University professors and certified instructors with decades of academic experience.'
              },
              {
                icon: Award,
                title: 'Official Certification',
                description: 'Earn recognized Cambridge certificates that enhance your academic profile and university applications.'
              },
              {
                icon: BookOpen,
                title: 'Rigorous Curriculum',
                description: 'Experience the same academic rigor and excellence that Cambridge students receive in their coursework.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Cambridge Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Select the program that best fits your academic goals and timeline.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-12 h-12 bg-gradient-to-br ${pkg.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-gray-900">${pkg.price.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">• {pkg.duration}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    Select Program
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear from our graduates who have achieved remarkable success in their academic and professional journeys.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Get answers to common questions about the Cambridge Excellence Program.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ArrowRight className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    expandedFAQ === index ? 'rotate-90' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Begin Your Cambridge Journey?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have transformed their academic and professional futures 
              through Cambridge Excellence certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <Link to="/contact" className="flex items-center">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900">
                <Link to="/contact" className="flex items-center">
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

export default CambridgeExcellence;
