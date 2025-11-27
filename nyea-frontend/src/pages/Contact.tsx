import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const globalLocations = [
    { name: 'New York', flag: '🇺🇸', timezone: 'EST' },
    { name: 'London', flag: '🇬🇧', timezone: 'GMT' },
    { name: 'Seoul', flag: '🇰🇷', timezone: 'KST' },
    { name: 'Baku', flag: '🇦🇿', timezone: 'AZT' },
    { name: 'Cyprus', flag: '🇨🇾', timezone: 'EET' },
    { name: 'Lahore', flag: '🇵🇰', timezone: 'PKT' },
    { name: 'Riyadh', flag: '🇸🇦', timezone: 'AST' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
          
          {/* Diagonal lines overlay */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        </div>

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400/30 rounded-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 border border-purple-400/30"
          animate={{ 
            rotate: [360, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-400/30"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Let's Connect
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              >
                Start Your
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Conversation
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg"
              >
                Ready to start your educational journey? Let's connect and shape your future together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('contact-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  variant="primary"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('tel:+13478913911', '_self')}
                  className="h-14 px-8 text-lg font-semibold border-2 border-[#9f162e]/50 text-[#9f162e] hover:bg-[#9f162e]/10 hover:border-[#9f162e] backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Quick Contact Cards */}
              <div className="grid gap-4">
                {[
                  { 
                    icon: Mail, 
                    label: "Email Us", 
                    value: "hello@nyempireacademy.com",
                    color: "from-blue-500/20 to-cyan-500/20",
                    borderColor: "border-blue-400/30",
                    hoverColor: "hover:border-blue-400/60",
                    onClick: () => window.open('mailto:hello@nyempireacademy.com', '_self')
                  },
                  { 
                    icon: Phone, 
                    label: "Call Us", 
                    value: "+1 (347) 891-3911",
                    color: "from-purple-500/20 to-pink-500/20",
                    borderColor: "border-purple-400/30",
                    hoverColor: "hover:border-purple-400/60",
                    onClick: () => window.open('tel:+13478913911', '_self')
                  },
                  { 
                    icon: MapPin, 
                    label: "Visit Us", 
                    value: "Empire State Building\nNew York, NY",
                    color: "from-green-500/20 to-emerald-500/20",
                    borderColor: "border-green-400/30",
                    hoverColor: "hover:border-green-400/60"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={contact.onClick}
                    className={`p-6 bg-gradient-to-r ${contact.color} backdrop-blur-xl border ${contact.borderColor} ${contact.hoverColor} rounded-2xl cursor-pointer transition-all duration-300 group`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{contact.label}</h3>
                        <p className="text-gray-300 font-medium whitespace-pre-line">{contact.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="contact-form" className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Contact Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 shadow-2xl">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center">
                      <Send className="w-8 h-8 mr-3 text-blue-400" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-gray-400 mt-2">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                              placeholder="Enter your full name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            placeholder="What's this about?"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Tell us more about how we can help you..."
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 text-lg font-semibold"
                          size="lg"
                          variant="primary"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Global Locations Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 md:mt-24"
          >
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                  Global Presence
                </CardTitle>
                <p className="text-gray-400 mt-2">
                  Connect with us from anywhere in the world
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
                  {globalLocations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="text-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 bg-gray-800/50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-400/10 group-hover:scale-110 transition-all duration-300">
                        {location.flag}
                      </div>
                      <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
                        {location.name}
                      </h4>
                      <p className="text-xs text-gray-400">{location.timezone}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 