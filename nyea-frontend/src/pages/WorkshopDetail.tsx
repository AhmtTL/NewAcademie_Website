import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Shield, 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  BookOpen,
  Target,
  TrendingUp,
  Globe,
  ArrowRight,
  X,
  Monitor
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { downloadProgramBrochure } from '../utils/downloadUtils';

// Workshop data structure
const workshopData: Record<string, any> = {
  'leadership-negotiation-communication': {
    title: 'Lead & Influence: Negotiation and Communication Workshop',
    subtitle: 'Master Essential Leadership Skills with Harvard-Affiliated Instruction',
    description: 'An intensive workshop designed to transform your leadership capabilities through proven Harvard methodologies. Led by Nicholas Coburn-Palo, this program combines theoretical foundations with practical applications to develop your negotiation prowess, communication excellence, and leadership presence.',
    instructor: {
      name: 'Nicholas Coburn-Palo',
      credentials: 'Harvard University Instructor',
      image: '/images/nicholas-coburn-palo.svg'
    },
    objectives: [
      'Develop authentic leadership presence and communication style',
      'Master Harvard-proven negotiation strategies and tactics',
      'Build emotional intelligence and relationship management skills',
      'Learn to navigate complex organizational dynamics',
      'Create sustainable influence and persuasion capabilities',
      'Implement strategic thinking in leadership decisions'
    ],
    curriculum: [
      {
        title: 'Leadership Fundamentals',
        topics: [
          'Discovering your leadership identity and style',
          'Harvard-style leadership vocabulary and frameworks',
          'Building authentic leadership presence',
          'Leading diverse and multicultural teams'
        ]
      },
      {
        title: 'Advanced Negotiation Skills',
        topics: [
          'Core negotiation principles and strategies',
          'Managing emotions and relationships in negotiations',
          'Multi-party and complex negotiation scenarios',
          'Cross-cultural negotiation dynamics'
        ]
      },
      {
        title: 'Strategic Communication',
        topics: [
          'Assertive and empathetic communication techniques',
          'Conflict resolution and difficult conversations',
          'Public speaking and presentation mastery',
          'Digital communication and virtual leadership'
        ]
      },
      {
        title: 'Leadership in Practice',
        topics: [
          'Real-time case study simulations',
          'Decision-making under pressure',
          'Change management and transformation',
          'Building high-performance teams'
        ]
      }
    ],
    highlights: [
      'Discover your leadership identity',
      'Learn Harvard-style leadership vocabulary choice',
      'Master negotiation skills with real-world simulations',
      'Develop emotional intelligence and relationship skills',
      'Practice with interactive case studies',
      'Receive personalized feedback and coaching'
    ],
    benefits: [
      'Develop core leadership skills through active challenges',
      'Master negotiation skills by learning Harvard methods',
      'Enhance communication effectiveness in all contexts',
      'Build confidence in high-stakes situations',
      'Network with like-minded professionals',
      // 'Receive CPDUK accredited certification'
      'Receive professional certification'
    ],
    targetAudience: [
      'Mid to senior-level managers and executives',
      'Team leaders and project managers',
      'Entrepreneurs and business owners',
      'Professionals seeking leadership advancement',
      'Consultants and client-facing professionals',
      'Anyone looking to enhance influence and impact'
    ]
  }
};

const WorkshopDetail: React.FC = () => {
  const { workshop } = useParams<{ workshop: string }>();
  const navigate = useNavigate();
  
  const data = workshop ? workshopData[workshop] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workshop Not Found</h1>
          <p className="text-gray-600 mb-6">The workshop you're looking for doesn't exist.</p>
          {/* <Button asChild>
            <Link to="/elite-workshops">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Elite Workshops
            </Link>
          </Button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1f2444] via-[#2d3d66] to-[#9f162e]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button 
              variant="outline" 
              asChild 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              {/* <Link to="/elite-workshops">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Elite Workshops
              </Link> */}
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#9f162e]/20 to-[#1f2444]/30 backdrop-blur-md border border-white/30 text-white text-sm mb-6 font-medium">
                <Award className="h-4 w-4 mr-2" />
                CPDUK ACCREDITED PROGRAM
              </div> */}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                {data.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {data.subtitle}
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col items-start gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate(`/workshop-booking/${workshop}`)}
                    className="bg-gradient-to-r from-[#9f162e] to-orange-600 hover:from-orange-600 hover:to-[#9f162e] text-white border-0 shadow-xl font-semibold"
                  >
                    View Sessions & Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  {/* Accreditation Logos - Under View Sessions button, aligned to start */}
                  {/* <div className="flex justify-start items-center gap-4">
                    <img 
                      src="/images/cpd2.webp" 
                      alt="CPDUK Accredited Program" 
                      className="h-16 w-auto opacity-90"
                    />
                    <img 
                      src="/images/usaedu-white.png" 
                      alt="USA Education Accredited" 
                      className="h-16 w-auto opacity-90"
                    />
                  </div> */}
                </div>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white hover:bg-white hover:text-[#1f2444] font-semibold"
                  onClick={downloadProgramBrochure}
                >
                  Download Brochure
                </Button>
              </div>
            </motion.div>

            {/* Instructor Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:justify-self-end"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <img 
                      src={data.instructor.image} 
                      alt={data.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="text-white text-2xl font-bold">NC</div>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{data.instructor.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{data.instructor.credentials}</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs mt-2">Expert Leadership Instructor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
              {data.description}
            </p>
          </motion.div>

        </div>
      </section>

      {/* Programme Types Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Program Format
            </h2>
            <p className="text-xl text-gray-600">
              Select the format that best fits your schedule and learning preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/*Masterclass Experience (Extended) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#9f162e] to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">MASTERY WORKSHOP</h3>
                  <p className="text-gray-600">Extended Program</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Dates
                    </span>
                    <span className="text-gray-900">October</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Length
                    </span>
                    <span className="text-gray-900">Up to 1 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Monitor className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Format
                    </span>
                    <span className="text-gray-900">In-Person and Online</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Learn from top professionals',
                    'Immersive career simulations',
                    'In-Person Experience',
                    'Signed Certificate',
                    'Industry reference letter',
                    'Additional 5 hours of small group coaching',
                    'Personalized recommendations on Professional development & university admissions',
                    'Private networking dinner with workshop lecturers'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-[#9f162e] to-orange-600 hover:from-orange-600 hover:to-[#9f162e] text-white font-semibold"
                  onClick={() => navigate(`/workshop-booking/${workshop}`)}
                >
                  VIEW & REGISTER
                </Button>
              </div>
            </motion.div>

            {/* 3 Days Program (Regular) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200 h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Essentials Workshop (2 Days)</h3>
                  <p className="text-gray-600">Intensive Format</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Dates
                    </span>
                    <span className="text-gray-900">October</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Length
                    </span>
                    <span className="text-gray-900">2 day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center">
                      <Monitor className="h-4 w-4 mr-2 text-[#9f162e]" />
                      Format
                    </span>
                    <span className="text-gray-900">In-Person</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    { feature: 'Learn from top professionals', included: true },
                    { feature: 'Immersive career simulations', included: true },
                    { feature: 'In-Person Experience', included: true },
                    { feature: 'Signed  Certificate', included: true },
                    { feature: 'Industry reference letter', included: false },
                    { feature: 'Additional 5 hours of small group coaching', included: false },
                    { feature: 'Personalized recommendations on Professional development & university admissions', included: false },
                    { feature: 'Private networking dinner with workshop lecturers', included: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      {item.included ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${item.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {item.feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline"
                  className="w-full border-2 border-[#1f2444] text-[#1f2444] hover:bg-[#1f2444] hover:text-white font-semibold"
                  onClick={() => navigate(`/workshop-booking/${workshop}`)}
                >
                  VIEW & REGISTER
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Benefits Grid - Similar to attachment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Our Program Unique
            </h2>
            <p className="text-xl text-gray-600">
              Experience transformative learning through real-world applications and expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Immersive Career Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="/images/student-school-red.jpg"
                  alt="Students experiencing professional environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/80 to-[#1f2444]/60"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3">IMMERSIVE CAREER EXPERIENCE</h3>
                    <p className="text-sm leading-relaxed">
                      Our programs are live, interactive and fully immersive: you'll get to actually experience the work professionals do on a daily basis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Networking Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="/images/networking.png"
                  alt="Professional networking opportunities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/80 to-[#1f2444]/60"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3">NETWORKING OPPORTUNITIES</h3>
                    <p className="text-sm leading-relaxed">
                      Work alongside industry executives and gain their exclusive insider advice on how to succeed.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Boost Your Applications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="/images/2.png"
                  alt="Students boosting their applications"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/80 to-[#1f2444]/60"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3">BOOST YOUR APPLICATIONS</h3>
                    <p className="text-sm leading-relaxed">
                      Supercharge your university applications and CV to gain a competitive edge and maximize your potential.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional benefit cards for larger screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group md:col-span-2 lg:col-span-1"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="/images/mentoring.jpg"
                  alt="Professional development and mentoring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444]/80 to-[#1f2444]/60"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3">EXPERT MENTORSHIP</h3>
                    <p className="text-sm leading-relaxed">
                      Receive personalized guidance from Harvard-affiliated instructors and industry leaders.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Real-world Simulations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative group md:col-span-2"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2444] to-[#9f162e]"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-white text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">REAL-WORLD SIMULATIONS</h3>
                    <p className="leading-relaxed">
                      Experience authentic leadership challenges through case studies and simulations based on real business scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Programme Highlights & Benefits
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Program Highlights & Benefits</h3>
              <div className="flex justify-center mb-6">
                <img 
                  src="/images/cpd2.webp" 
                  alt="CPDUK Accredited Program" 
                  className="h-16 w-auto opacity-80"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Program Highlights
                </h4>
                <div className="space-y-4">
                  {data.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-800 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-green-900 mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-green-600" />
                  Workshop Benefits
                </h4>
                <div className="space-y-4">
                  {data.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-800 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Curriculum Overview */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Curriculum
            </h2>
            <p className="text-xl text-gray-600">
              A structured learning journey designed by Harvard-affiliated experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.curriculum.map((module: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1f2444] to-[#9f162e] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {module.topics.map((topic: string, topicIndex: number) => (
                    <div key={topicIndex} className="flex items-start">
                      <BookOpen className="h-4 w-4 text-[#9f162e] mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Inspiring Picture Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-[#1f2444]/5 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231f2444' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2444] mt-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From Vision to Reality
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Witness the transformative power of our elite workshops through the eyes of our participants
            </motion.p>
          </div>

          {/* Featured Image */}
          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="aspect-[21/9] relative">
                <img
                  src="/images/student-school-red.jpg"
                  alt="Elite workshop participants achieving excellence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2444]/60 via-transparent to-transparent"></div>

                {/* Floating content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#9f162e] rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#1f2444] font-bold text-lg">"Excellence is earned through transformation"</div>
                        <div className="text-gray-600 text-sm">NYEA Leadership Workshop Graduate</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "This workshop didn't just teach me skills—it fundamentally changed how I approach leadership and communication.
                      The confidence and strategic thinking I've gained have opened doors I never imagined possible."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional inspiring images grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/4.png"
                alt="Workshop success story"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2444]/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Profile Transformation</p>
                <p className="text-xs opacity-90">From good to exceptional</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/2.png"
                alt="Achievement celebration"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2444]/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Celebrating Excellence</p>
                <p className="text-xs opacity-90">Milestones achieved</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/1.png"
                alt="Future leaders"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2444]/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">Future Leaders</p>
                <p className="text-xs opacity-90">Shaping tomorrow</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our leadership workshop
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What makes this workshop different from other leadership programs?",
                // answer: "Our workshop is led by Harvard-affiliated instructors and combines theoretical knowledge with practical application through real-world simulations. You'll receive CPDUK accreditation and have opportunities for personalized mentorship and networking with industry professionals."
                answer: "Our workshop is led by Harvard-affiliated instructors and combines theoretical knowledge with practical application through real-world simulations. You'll receive professional certification and have opportunities for personalized mentorship and networking with industry professionals."
              },
              {
                question: "Do I need prior leadership experience to attend?",
                answer: "No prior leadership experience is required. Our program is designed for professionals at all levels who want to develop their leadership, negotiation, and communication skills. We tailor the content to meet participants where they are in their career journey."
              },
              {
                // question: "What is included in the CPDUK accreditation?",
                // answer: "The CPDUK (Continuing Professional Development UK) accreditation provides formal recognition of your professional development. You'll receive a certificate signed by Harvard-affiliated instructors, which can enhance your CV and demonstrate your commitment to continuous learning."
                question: "What is included in the professional certification?",
                answer: "The professional certification provides formal recognition of your professional development. You'll receive a certificate signed by Harvard-affiliated instructors, which can enhance your CV and demonstrate your commitment to continuous learning."
              },
              {
                question: "How are the workshop sessions structured?",
                answer: "The workshop combines interactive lectures, case study analysis, group discussions, and practical simulations. You'll work on real-world scenarios, participate in negotiation exercises, and receive personalized feedback from instructors throughout the program."
              },
              {
                question: "What is the difference between the Extended and 3 Days programs?",
                answer: "The Extended program offers a more comprehensive experience with additional coaching hours, networking dinners, and personalized recommendations. The 3 Days program focuses on core concepts in an intensive format. Both include expert instruction and certification."
              },
              {
                question: "Can I get a reference letter from the instructors?",
                answer: "Reference letters are available for Extended program participants who demonstrate exceptional engagement and achievement during the workshop. These letters can be valuable for career advancement and further education applications."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                  <div className="w-6 h-6 bg-[#1f2444] rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">Q</span>
                  </div>
                  {faq.question}
                </h3>
                <div className="ml-9">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-[#1f2444] to-[#9f162e] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
              <p className="mb-6 text-white/90">
                Our team is here to help you make the right decision for your professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-[#1f2444] hover:bg-gray-100 font-semibold"
                >
                  Contact Our Team
                </Button>
                {/* <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white hover:bg-white hover:text-[#1f2444] font-semibold"
                >
                  Schedule a Call
                </Button> */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1f2444] to-[#9f162e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Leadership?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of professionals who have elevated their careers through our Harvard-affiliated programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate(`/workshop-booking/${workshop}`)}
                className="bg-white text-[#1f2444] hover:bg-gray-100 font-semibold shadow-xl"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Available Sessions
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white hover:bg-white hover:text-[#1f2444] font-semibold"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Download Program Guide
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center space-x-8 text-white/80">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  {/* <span className="text-sm">CPDUK Accredited</span> */}
                  <span className="text-sm">Professional Certificate</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="text-sm">Expert Instructors</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span className="text-sm">Global Recognition</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetail;
