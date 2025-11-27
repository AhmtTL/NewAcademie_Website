import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Clock, CheckCircle, Star, ArrowRight, GraduationCap, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const TeacherDevelopment: React.FC = () => {
  const programFeatures = [
    {
      icon: BookOpen,
      title: 'Advanced Teaching Methods',
      description: 'Master cutting-edge pedagogical approaches and innovative classroom techniques.'
    },
    {
      icon: Users,
      title: 'Classroom Management',
      description: 'Develop skills to create engaging, productive learning environments.'
    },
    {
      icon: Target,
      title: 'Curriculum Design',
      description: 'Learn to design comprehensive, standards-aligned curricula.'
    },
    {
      icon: Award,
      title: 'Assessment Strategies',
      description: 'Implement effective evaluation methods and feedback systems.'
    },
    {
      icon: Lightbulb,
      title: 'Educational Technology',
      description: 'Integrate modern technology tools to enhance learning outcomes.'
    },
    {
      icon: GraduationCap,
      title: 'Professional Certification',
      description: 'Earn recognized credentials from leading educational institutions.'
    }
  ];

  const curriculum = [
    {
      day: 'Day 1',
      title: 'Pedagogy & Assessment',
      topics: ['Teaching Methodologies', 'Assessment Strategies', 'Learning Objectives', 'Educational Standards']
    },
    {
      day: 'Day 2',
      title: 'Active Learning',
      topics: ['Interactive Teaching', 'Student Engagement', 'Collaborative Learning', 'Technology Integration']
    },
    {
      day: 'Day 3',
      title: 'Curriculum Innovation',
      topics: ['Curriculum Design', 'Innovation Methods', 'Global Best Practices', 'Educational Research']
    },
    {
      day: 'Day 4',
      title: 'Reflection & Networking',
      topics: ['Guided Reflection', 'Peer Feedback', 'Professional Networks', 'Certification Ceremony']
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Principal, International School of London',
      content: 'This program transformed our entire teaching approach. Our student engagement increased by 40%.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Education Director, Stanford University',
      content: 'The most comprehensive teacher development program I\'ve encountered. Highly recommended.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Curriculum, Harvard Graduate School',
      content: 'Revolutionary approach to teacher training. Our graduates are now leading educators worldwide.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Teachers Trained', icon: Users },
    { number: '95%', label: 'Job Placement Rate', icon: Award },
    { number: '40%', label: 'Salary Increase', icon: Target },
    { number: '25+', label: 'Partner Schools', icon: GraduationCap }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Cambridge training facility"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-blue-900/70 to-purple-900/90"></div>
        </div>
        
        {/* Tactical grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none' stroke='%23fbbf24' stroke-width='0.5'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23fbbf24' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-yellow-400/10 backdrop-blur-md rounded-full text-yellow-400 text-sm font-bold mb-8 border border-yellow-400/30 uppercase tracking-wider">
                <Award className="w-4 h-4 mr-2" />
                ELITE EDUCATOR PROTOCOL
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
                <span className="text-white drop-shadow-2xl">
                  MASTER
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  EDUCATOR
                </span>
                <br />
                <span className="text-gray-400 text-3xl md:text-4xl font-light">
                  TRANSFORMATION
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                Official Cambridge Certificate of Professional Development. 2-4 days of intensive training 
                designed to transform teaching excellence through university-standard methodologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <Button variant="primary" size="lg" className="group font-black text-lg px-8 py-4 shadow-2xl uppercase tracking-wider">
                  <Link to="/signup" className="flex items-center">
                    DEPLOY - $2,499
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-black/40 backdrop-blur-md border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 font-bold uppercase tracking-wider">
                  INTEL BRIEFING
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  2-4 Days
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Online & In-Person
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Certified Program
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Teacher in modern classroom"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              
              {/* Floating stats */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Teachers Trained</div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Program Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training modules designed by education experts from top universities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mr-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              4-Day Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intensive Cambridge training designed to transform your teaching methodology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curriculum.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                        <span className="text-sm font-semibold text-blue-700">{module.day}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What Educators Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from education leaders who have transformed their teaching with our program
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
                <Card className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
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
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
              Join hundreds of educators who have revolutionized their classrooms. 
              Start your journey to becoming an exceptional teacher today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="primary" size="lg" className="shadow-2xl">
                <Link to="/signup">
                  Enroll Now - $2,499
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

export default TeacherDevelopment; 