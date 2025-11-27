import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Calendar, CheckCircle2, Users, GraduationCap, Briefcase, Globe2, ShieldCheck, Mail, Phone, Building2, Sparkles, Award, BadgeCheck, Lightbulb, LineChart, BookOpen, Layers, Rocket, Clock, Target, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { downloadProgramBrochure } from '../utils/downloadUtils';

type AudienceType = 'high-school' | 'university' | 'executive';

const ExecutiveCertificates: React.FC = () => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const [audienceTab, setAudienceTab] = useState<AudienceType>('high-school');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    audience: 'high-school' as AudienceType,
    consent: false,
  });
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleDay, setScheduleDay] = useState<1 | 2>(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number>(0); // Track which FAQ is expanded
  const brochureUrl = useMemo(() => '/documents/Program-details.pdf', []);

  const validateForm = () => {
    const errors: { [k: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.consent) errors.consent = 'Please agree to be contacted';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Simulate sending to backend CRM; in production, POST to your API
      const leadPayload = { ...formData, source: 'Executive Certificate Series', createdAt: new Date().toISOString() };
      localStorage.setItem('nyea_exec_series_lead', JSON.stringify(leadPayload));
      setBrochureDownloaded(true);
      // Trigger brochure download
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = 'NYEA-Program-Details.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal after successful submission and download
      setTimeout(() => {
        setIsBrochureOpen(false);
        // Reset form for next use
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution: '',
          audience: 'high-school' as AudienceType,
          consent: false,
        });
        setFormErrors({});
        setBrochureDownloaded(false);
      }, 1000); // Small delay to show success message
    } finally {
      setIsSubmitting(false);
    }
  };

  const workshops = [
    {
      slug: 'ai-communication',
      title: 'AI-Powered Communication & Innovation',
      excerpt: 'Use AI to amplify persuasive communication, creativity, and innovation workflows.',
      gradient: 'from-indigo-500 to-purple-600',
      duration: 'October 2025',
      audience: 'University',
      topics: ['AI Tools', 'Communication', 'Innovation']
    },
    {
      slug: 'leadership-negotiation-communication',
      title: 'Leadership, Negotiation and Communication Skills',
      excerpt: 'Master conflict resolution, organizational leadership, and effective negotiation techniques with cutting-edge methods.',
      gradient: 'from-emerald-500 to-teal-600',
      instructor: 'Dr. Nicholas Coburn-Palo',
      institution: 'Harvard University',
      audience: 'High School',
      duration: 'October 2025',
      topics: ['Leadership', 'Negotiation', 'Conflict Resolution'],
      featured: true
    },
    {
      slug: 'entrepreneurship',
      title: 'Entrepreneurship & Startup Strategy',
      excerpt: 'From idea to MVP: customer discovery, business models, and go-to-market planning.',
      gradient: 'from-orange-500 to-red-600',
      duration: 'October 2025',
      audience: 'Executive',
      topics: ['Business Models', 'MVP Development', 'Market Strategy']
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Taught by Top University Professionals',
      desc: 'Live sessions delivered by professionals and senior practitioners affiliated with institutions such as Harvard, Stanford, and Cambridge. Content is refreshed each cohort to reflect the latest research and practice.'
    },
    {
      icon: Lightbulb,
      title: 'Real-World, Portfolio-Ready Output',
      desc: 'Participants build tangible deliverables such as strategy memos, AI-enhanced presentations, and venture blueprints that elevate applications and professional profiles.'
    },
    {
      icon: BadgeCheck,
      // title: 'CPDUK-Accredited Certificates',
      title: 'Professional Certificates',
      // desc: 'Verified learning outcomes and professionally recognized certificates for high school, university, and executive audiences.'
      desc: 'Verified learning outcomes and professionally recognized certificates for high school, university, and executive audiences.'
    },
    {
      icon: Users,
      title: 'Confidence and Communication',
      desc: 'Guided practice, peer feedback, and professor coaching expand communication range, executive presence, and strategic thinking.'
    },
    {
      icon: Globe2,
      title: 'Global Cohorts and Networks',
      desc: 'Learn alongside peers from 20+ countries. Build a global network of ambitious students and leaders.'
    },
    {
      icon: Layers,
      title: 'Flexible Delivery',
      desc: '2-day accredited format with modular add-ons. We tailor scope and depth by audience proficiency and institutional goals.'
    }
  ];

  const scheduleData = {
    1: [
      { title: 'Leadership Foundations', subtitle: 'Discover your unique leadership style and build your profile', type: 'foundation' },
      { title: 'Leadership in Action', subtitle: 'What makes a great leader? Interactive exploration and assessment', type: 'interactive' },
      { title: 'Communication Mastery', subtitle: 'Develop your unique vocabulary and speaking presence', type: 'communication' },
      { title: 'Speaking Like a Leader', subtitle: 'Group work and peer feedback on leadership communication', type: 'group' },
    ],
    2: [
      { title: 'Identity & Emotional Intelligence', subtitle: 'Culture and gender dynamics in effective communication', type: 'foundation' },
      { title: 'Case Study Deep Dive', subtitle: 'Real-world simulations and strategic analysis', type: 'case' },
      { title: 'Negotiation Mastery', subtitle: 'Categories, zones of flexibility, and Harvard-style techniques', type: 'negotiation' },
      { title: 'Global Trade Simulation', subtitle: 'Creative resolutions for Country X vs Y trade conflict', type: 'simulation' },
    ]
  };

  const schedule = scheduleData[scheduleDay] || scheduleData[1];

  const testimonials = [
    { name: 'Maria Gomez', role: 'Head of Sixth Form, Madrid', content: 'Our top set students left with sharper decision frameworks and stronger application narratives. The faculty quality was clear from minute one.' },
    { name: 'Omar Khan', role: 'Dean, Lahore', content: 'The workshops balanced academic rigor with practical application. We saw immediate uplift in student confidence and communication.' },
    { name: 'Ethan Lee', role: 'Executive Participant, Seoul', content: 'We applied the strategy tools to a real initiative the next day. Clear, modern, and outcome-focused.' },
  ];

  const universityLogos = [
    { name: 'Harvard University', url: '/images/stanford-logo.png' },
    { name: 'Stanford University', url: '/images/harvard2.png' },
    { name: 'University of Cambridge', url: '/images/cambridge2.png' },
    // { name: 'CPDUK', url: '/images/cpd.png' },
    { name: 'USA Education', url: '/images/usaedu.png' },
  ];

  const certifications = [
    { 
      name: 'ISO 9001:2015', 
      description: 'Quality Management System',
      badge: true 
    },
    { 
      name: 'Professional Certification', 
      description: 'Industry Standards',
      badge: true 
    }
  ];

  const faq = [
    // { q: 'Who delivers the workshops?', a: 'Sessions are designed and taught by professors and senior practitioners affiliated with leading universities (e.g., Harvard, Stanford, Cambridge). All content follows CPDUK standards and is updated per cohort.' },
    { q: 'Who delivers the workshops?', a: 'Sessions are designed and taught by professors and senior practitioners affiliated with leading universities (e.g., Harvard, Stanford, Cambridge). All content follows professional standards and is updated per cohort.' },
    // { q: 'What accreditation do participants receive?', a: 'Participants receive CPDUK-accredited certificates upon successful completion. Institutions can request customized assessment rubrics aligned to internal outcomes.' },
    { q: 'What accreditation do participants receive?', a: 'Participants receive professional certificates upon successful completion. Institutions can request customized assessment rubrics aligned to internal outcomes.' },
    { q: 'Who is eligible?', a: 'High school (advanced English), university students, and executives. We tailor difficulty, pace, and casework by segment. Pre-reads and suggested skill primers are provided.' },
    { q: 'How soon can we run one?', a: 'From inquiry to delivery is typically ~6 weeks, including alignment, scheduling, and content finalization. Expedited timelines are possible depending on availability.' },
    { q: 'Do you offer custom content?', a: 'Yes. We tailor by audience, industry focus, and measurable outcomes. Options include extended projects, capstones, and faculty advising hours.' },
    { q: 'Global delivery?', a: 'Yes. In-person or virtual delivery in 20+ countries, with time-zone coverage and bilingual facilitators available on request.' },
    { q: 'Data and privacy?', a: 'We comply with institutional data policies, ensuring secure handling of participant data and optional NDA coverage for executive cohorts.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1f2444] via-[#2d3d66] to-[#9f162e]">
        {/* Modern Hero Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ffffff;stop-opacity:0.05"/%3E%3Cstop offset="50%25" style="stop-color:%23ffffff;stop-opacity:0.02"/%3E%3Cstop offset="100%25" style="stop-color:%23ffffff;stop-opacity:0.05"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="800" fill="url(%23bg)"/%3E%3Cg opacity="0.3"%3E%3Ccircle cx="200" cy="150" r="3" fill="%23ffffff"/%3E%3Ccircle cx="400" cy="250" r="2" fill="%23ffffff"/%3E%3Ccircle cx="600" cy="180" r="4" fill="%23ffffff"/%3E%3Ccircle cx="800" cy="300" r="2" fill="%23ffffff"/%3E%3Ccircle cx="1000" cy="200" r="3" fill="%23ffffff"/%3E%3Ccircle cx="300" cy="400" r="2" fill="%23ffffff"/%3E%3Ccircle cx="700" cy="450" r="3" fill="%23ffffff"/%3E%3Ccircle cx="150" cy="500" r="2" fill="%23ffffff"/%3E%3Ccircle cx="950" cy="550" r="4" fill="%23ffffff"/%3E%3Ccircle cx="500" cy="600" r="2" fill="%23ffffff"/%3E%3C/g%3E%3C/svg%3E')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/85 via-[#2d3d66]/75 to-[#9f162e]/80" />
        </div>
        {/* Modern geometric elements */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#9f162e]/15 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-white/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rotate-45 rounded-lg"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rotate-12 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white/25 rotate-45 rounded-lg"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-[#9f162e]/20 to-[#1f2444]/30 backdrop-blur-md border border-white/30 text-white text-sm mb-6 font-medium">
              ELITE WORKSHOP SERIES
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight max-w-5xl">
              <span className="bg-gradient-to-r from-white via-gray-100 to-orange-200 bg-clip-text text-transparent">
                Transform Profiles. Accelerate Futures.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl">
              High-impact workshops with CPDUK-accredited outcomes and international delivery.
              High-impact workshops with professional certification and international delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button 
                size="lg" 
                className="bg-white text-[#1f2444] hover:bg-gray-100 shadow-lg font-semibold"
                onClick={() => setIsBrochureOpen(true)}
              >
                <div className="flex items-center">
                  Download Brochure
                  <Download className="ml-2 h-5 w-5" />
                </div>
              </Button>
              
              {/* Magic Button for Book Discovery Call */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9f162e] via-orange-400 to-[#1f2444] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse"></div>
                <Button size="lg" variant="outline" className="relative bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1f2444] font-semibold">
                  <Link to="/contact" className="flex items-center">
                    Book Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-gray-200/90">
              <div className="flex items-center"><Users className="h-5 w-5 mr-2" /> Students & Executives</div>
              {/* <div className="flex items-center"><ShieldCheck className="h-5 w-5 mr-2" /> CPDUK-Accredited</div> */}
              <div className="flex items-center"><ShieldCheck className="h-5 w-5 mr-2" /> Professional Certificate</div>
              <div className="flex items-center"><Globe2 className="h-5 w-5 mr-2" /> Delivered in 20+ Countries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Top Workshops</h2>
            <p className="text-gray-600 mt-4">Explore our most in-demand workshops. Details are on separate pages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((w, i) => (
              <motion.div 
                key={w.slug} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className={w.featured ? 'md:scale-105 md:z-10' : ''}
              >
                <div className={`relative bg-gradient-to-r ${w.gradient} rounded-2xl p-[1px] ${w.featured ? 'shadow-2xl' : 'shadow-lg'}`}>
                  <Card className={`h-full bg-white rounded-2xl overflow-hidden ${w.featured ? 'border-2 border-yellow-400' : ''}`}>
                    {w.featured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 px-4">
                        <div className="text-xs font-bold tracking-wide">⭐ Registrations Open</div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          w.audience === 'High School' ? 'bg-blue-100 text-blue-700' :
                          w.audience === 'University' ? 'bg-purple-100 text-purple-700' :
                          w.audience === 'Executive' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {w.audience}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{w.duration}</div>
                      </div>
                      
                      <CardTitle className={`font-bold leading-tight ${w.featured ? 'text-xl' : 'text-lg'}`}>
                        {w.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {w.instructor && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900">By {w.instructor}</div>
                            <div className="text-xs text-gray-600">{w.institution}</div>
                            <div className="text-xs text-blue-600 mt-1">for New York Empire Academy participants</div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">What You'll Learn:</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {w.topics.map((topic, idx) => (
                              <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">{w.excerpt}</p>
                      </div>
                      
                      <Link 
                        to={`/elite-workshops/${w.slug}`} 
                        className={`w-full mt-6 border-0 ${w.featured ? 'bg-gradient-to-r from-[#9f162e] to-orange-600 hover:from-orange-600 hover:to-[#9f162e]' : 'bg-gradient-to-r from-[#1f2444] to-[#9f162e] hover:from-[#9f162e] hover:to-[#1f2444]'} text-white font-semibold flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
                      >
                        {w.featured ? 'View & Register' : 'Learn More'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Professors Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Senior Professionals From Leading Universities</h3>
            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">We collaborate with professors and senior practitioners affiliated with institutions such as Harvard, Stanford, and Cambridge, bringing cutting-edge knowledge into practical, outcome-focused sessions.</p>
          </div>
          {/* Featured Professor */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1">
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="/images/nicholas-coburn-palo.svg" 
                    alt="Nicholas Coburn-Palo"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Nicholas Coburn-Palo</div>
                        <div className="text-gray-600 text-sm">Harvard University Instructor, ex Yale University</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Nicholas Coburn-Palo teaches communication, public narrative, and leadership with a focus on persuasive performance and executive presence. His work helps students craft compelling stories, elevate delivery, and communicate with clarity in high-stakes contexts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Professor Affiliation Logos */}
          <div className="mt-12 text-center">
            <div className="text-sm text-gray-500 mb-6">Trusted by leading university professors and organizations</div>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
              {universityLogos.map((l, i) => (
                <div key={i} className="flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 flex items-center justify-center bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-all duration-300">
                  <img src={l.url} alt={`${l.name} logo`} className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

             {/* Key Benefits */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="text-center mb-12">
             <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-semibold mb-6 border border-blue-400/30">
               <BadgeCheck className="w-4 h-4 mr-2" /> PROVEN OUTCOMES
             </div>
             <h3 className="text-3xl md:text-4xl font-bold text-white">Key Benefits</h3>
             <p className="text-blue-200 mt-3 max-w-3xl mx-auto">Modern, outcomes-driven learning designed to elevate applications and performance</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {benefits.map((b, i) => (
               <div key={i} className="group relative">
                 <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-25 blur transition-all duration-300 group-hover:opacity-50 group-hover:blur-md" />
                 <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                   <div className="flex items-start">
                     <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center mr-4 shadow-md">
                       <b.icon className="h-5 w-5" />
                     </div>
                     <div>
                       <div className="text-lg font-semibold text-white">{b.title}</div>
                       <p className="text-blue-200 mt-2 text-sm leading-relaxed">{b.desc}</p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

      {/* Ideal Partners / Fit with Segments */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 md:px-6 py-2 bg-blue-100 rounded-full text-blue-700 text-xs md:text-sm font-semibold mb-6 border border-blue-200">
              <Target className="w-4 h-4 mr-2" />
              PERFECT FIT PROGRAMS
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Ideal Partners
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Do your students aim for top universities?
            </p>
          </motion.div>

          {/* Enhanced Tab Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { key: 'high-school', label: 'High Schools', icon: GraduationCap, color: 'from-cyan-500 to-blue-600', shadowColor: 'shadow-cyan-500/25' },
              { key: 'university', label: 'Universities', icon: Building2, color: 'from-blue-500 to-indigo-600', shadowColor: 'shadow-blue-500/25' },
              { key: 'executive', label: 'Executives', icon: Briefcase, color: 'from-purple-500 to-violet-600', shadowColor: 'shadow-purple-500/25' },
            ].map(({ key, label, icon: Icon, color, shadowColor }) => (
              <button
                key={key}
                onClick={() => setAudienceTab(key as AudienceType)}
                className={`group relative inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  audienceTab === key 
                    ? `bg-gradient-to-r ${color} text-white shadow-lg ${shadowColor}` 
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className={`h-5 w-5 mr-2 transition-transform group-hover:scale-110 ${
                  audienceTab === key ? 'text-white' : 'text-gray-500'
                }`} />
                {label}
                {audienceTab === key && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Enhanced Content Cards */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {audienceTab === 'high-school' && (
                <motion.div 
                  key="hs" 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ring-1 ring-cyan-100">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                            <GraduationCap className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">High School Programs</h4>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            Advanced English proficiency recommended. Perfect for profile-building, leadership, and university applications.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border border-cyan-200">
                              Profile Building
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border border-cyan-200">
                              Leadership
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border border-cyan-200">
                              University Applications
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              {audienceTab === 'university' && (
                <motion.div 
                  key="uni" 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 ring-1 ring-blue-100">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">University Programs</h4>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            Enhance employability with strategic, AI, and venture skills; ideal for honors cohorts and career centers.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-200">
                              Strategic Skills
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-200">
                              AI & Technology
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border border-blue-200">
                              Career Centers
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              {audienceTab === 'executive' && (
                <motion.div 
                  key="exec" 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ring-1 ring-purple-100">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Executive Programs</h4>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            High-impact leadership development with executive presence, strategic communication, and organizational transformation skills.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-200">
                              Executive Presence
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-200">
                              Leadership Development
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-200">
                              Strategic Communication
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Success Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Ambition, Energy, Momentum</h3>
            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">A lively, achievement-driven atmosphere—where students and executives aim higher and perform better.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img src="/images/6.png" alt="Cheerful graduates" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group md:col-span-2">
              <img src="/images/3.png" alt="Faculty coaching a cohort" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group md:col-span-3">
              <img src="/images/5.png" alt="Cheerful students aiming for top universities" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Timeline Flow) */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-semibold mb-6 border border-blue-400/30">
              <Rocket className="w-4 h-4 mr-2" />
              PROVEN PROCESS
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Works</span>
            </h3>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">A sophisticated 6-week journey from concept to transformational delivery</p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            {/* Main Timeline connector - shorter height */}
            <div className="hidden lg:block absolute top-16 left-1/2 transform -translate-x-px w-0.5 bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400" style={{ height: 'calc(100% - 120px)' }}></div>
            
            <div className="space-y-12 lg:space-y-16">
              {[
                { 
                  step: '01', 
                  title: 'Discovery', 
                  subtitle: 'Strategic Foundation',
                  desc: 'Define cohort goals, audience profile, and success metrics; identify deliverables that elevate CVs and applications.',
                  icon: Lightbulb,
                  color: 'from-blue-500 to-cyan-400',
                  side: 'left'
                },
                { 
                  step: '02', 
                  title: 'Design', 
                  subtitle: 'Curriculum Architecture',
                  desc: 'Co-create the agenda with us. We tailor content, cases, and exercises, share pre-reads, and finalize logistics.',
                  icon: BookOpen,
                  color: 'from-cyan-500 to-blue-400',
                  side: 'right'
                },
                { 
                  step: '03', 
                  title: 'Delivery & Momentum', 
                  subtitle: 'Elite Execution',
                  desc: 'High-energy live sessions led by professors, with optional post-workshop advising and feedback on deliverables.',
                  icon: Rocket,
                  color: 'from-blue-500 to-purple-400',
                  side: 'left'
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: step.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${step.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-2/5 ${step.side === 'right' ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="group relative">
                      <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition-all duration-300`}></div>
                      <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                        <div className="flex items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center mr-4 text-lg font-bold shadow-lg flex-shrink-0`}>
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                            <p className="text-blue-200 text-sm font-medium">{step.subtitle}</p>
                          </div>
                          <step.icon className="h-6 w-6 text-blue-300 flex-shrink-0" />
                        </div>
                        <p className="text-blue-100 leading-relaxed text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node with connecting lines */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} border-4 border-slate-900 shadow-xl relative z-10`}>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} animate-pulse opacity-50`}></div>
                    </div>
                  </div>

                  {/* Connecting line to content (horizontal) */}
                  <div className={`hidden lg:block absolute top-1/2 ${step.side === 'left' ? 'left-1/2 ml-4' : 'right-1/2 mr-4'} w-10 h-0.5 bg-gradient-to-r ${step.color} opacity-60`}></div>
                </motion.div>
              ))}
            </div>
          </div>

            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
             className="text-center mt-10"
          >
            <Button 
              size="lg"
              onClick={() => setIsBrochureOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl border-0"
            >
              <Download className="w-5 h-5 mr-2" />
              Get the Complete Guide
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sample 2-Day Schedule (Interactive Cards) */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M40%200L80%2040L40%2080L0%2040z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-semibold mb-6 border border-blue-200">
              <Calendar className="w-4 h-4 mr-2" />
              IMMERSIVE EXPERIENCE
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sample <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2-Day Schedule</span>
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Flexible format designed to maximize learning outcomes and practical application</p>
          </motion.div>

          {/* Day Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {[1, 2].map((day) => (
                <button
                  key={day}
                  onClick={() => setScheduleDay(day as 1 | 2)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    scheduleDay === day
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={scheduleDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Schedule Cards */}
              <div className="lg:col-span-8 space-y-4">
                {schedule.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{item.subtitle}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>90 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>Interactive</span>
                            </div>
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium capitalize">
                              {item.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            {item.type === 'foundation' ? <Lightbulb className="w-5 h-5 text-blue-600" /> :
                             item.type === 'interactive' || item.type === 'group' ? <Users className="w-5 h-5 text-indigo-600" /> :
                             item.type === 'communication' ? <BookOpen className="w-5 h-5 text-green-600" /> :
                             item.type === 'case' ? <Target className="w-5 h-5 text-orange-600" /> :
                             item.type === 'negotiation' ? <MessageSquare className="w-5 h-5 text-purple-600" /> :
                             <Rocket className="w-5 h-5 text-red-600" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visual Side Panel */}
              <div className="lg:col-span-4">
                <div className="sticky top-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Day {scheduleDay} Focus</h4>
                        <p className="text-gray-600 text-sm">
                          {scheduleDay === 1 
                            ? "Leadership fundamentals and communication mastery foundations"
                            : "Emotional intelligence, negotiation tactics, and real-world simulations"
                          }
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-blue-800 font-medium">Interactive Learning</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                          <span className="text-sm text-indigo-800 font-medium">Peer Collaboration</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          <span className="text-sm text-purple-800 font-medium">Professor Feedback</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total Duration</span>
                          <span className="font-semibold text-gray-900">Full Day Intensive</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Workshop Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8 group relative overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img 
                      src="/images/cambridge-teacher.webp" 
                      alt="Elite workshop session"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-semibold">Live Workshop Session</p>
                        <p className="text-xs opacity-90">Harvard-Level Excellence</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
              <div className="relative">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Students' Future?
                </h4>
                <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
                  Join leading institutions worldwide in delivering world-class educational experiences that open doors to top universities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => setIsBrochureOpen(true)}
                    className="bg-white text-slate-900 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold shadow-xl border-0"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Full Schedule
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:border-white/80 px-8 py-4 rounded-xl font-semibold"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Discovery Call
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">What Partners Say</h3>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 opacity-30 blur transition group-hover:opacity-60" />
                <Card className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                        <QuoteIcon />
                      </div>
                      <p className="text-gray-700 leading-relaxed">“{t.content}”</p>
                    </div>
                    <div className="mt-4 font-semibold text-gray-900">{t.name}</div>
                    <div className="text-gray-600 text-sm">{t.role}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ (Modern Design) */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title */}
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h3>
            </div>
            
            {/* Right Side - FAQ Items */}
            <div className="space-y-4">
              {faq.map((item, idx) => (
                <div key={idx} className="group">
                  {expandedFAQ === idx ? (
                    // Expanded item - with Key Benefits matching background
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold pr-4 text-white">{item.q}</h4>
                        <button 
                          onClick={() => setExpandedFAQ(expandedFAQ === idx ? -1 : idx)}
                          className="text-white text-2xl font-light hover:text-blue-300 transition-colors duration-200"
                        >
                          −
                        </button>
                      </div>
                      <p className="text-blue-200 leading-relaxed">{item.a}</p>
                    </div>
                  ) : (
                    // Collapsed items - white background
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-colors duration-200">
                      <button 
                        onClick={() => setExpandedFAQ(idx)}
                        className="w-full text-left px-8 py-6 flex items-center justify-between group-hover:text-blue-300 transition-colors duration-200"
                      >
                        <span className="text-white font-semibold text-lg">{item.q}</span>
                        <span className="text-blue-300 text-2xl font-light group-hover:text-white transition-colors duration-200">+</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Lead Capture */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Get the full workshop guide</h3>
          <p className="text-blue-200 mt-2">Download the brochure or book a discovery call</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold" onClick={() => setIsBrochureOpen(true)}>
              Download Brochure
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:border-white/80 font-semibold">
              <Link to="/contact" className="flex items-center">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brochure Modal (Gated) */}
      <AnimatePresence>
        {isBrochureOpen && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden" initial={{ scale: 0.95, y: 12, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 12, opacity: 0 }}>
              <div className="p-6 border-b">
                <h4 className="text-xl font-bold">Access the Elite Workshop Series Brochure</h4>
                <p className="text-gray-600 mt-1">Enter your details to receive the full guide via email</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full name</label>
                  <div className="mt-1 relative">
                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full rounded-lg border px-3 py-2 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Jane Doe" />
                    <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative">
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full rounded-lg border px-3 py-2 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="jane@example.com" />
                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                    <div className="mt-1 relative">
                      <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="+1 555 123 4567" />
                      <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution (optional)</label>
                    <input value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="School / University / Company" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">I am a</label>
                  <select value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value as AudienceType })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option value="high-school">High school educator / coordinator</option>
                    <option value="university">University staff / student</option>
                    <option value="executive">Executive / HR / L&D</option>
                  </select>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mr-2" />
                  <span className="text-sm text-gray-700">I agree to be contacted about this brochure and related programs.</span>
                </label>
                {formErrors.consent && <p className="text-red-600 text-sm">{formErrors.consent}</p>}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsBrochureOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                    {isSubmitting ? 'Sending…' : 'Email me the brochure'}
                  </Button>
                </div>
                {brochureDownloaded && (
                  <p className="text-green-700 text-sm mt-2">Brochure is downloading. We will reach out shortly.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21a8 8 0 10-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7h4v10H5V9a2 2 0 012-2zm10 0h4v10h-6V9a2 2 0 012-2z" fill="currentColor" />
  </svg>
);

export default ExecutiveCertificates;

