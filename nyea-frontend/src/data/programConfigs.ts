import { Users, BookOpen, Award, Globe, Target, Trophy, GraduationCap, Brain, Briefcase, TrendingUp } from 'lucide-react';

export const programConfigs = {
  "academic-consulting": {
    title: "ACADEMIC",
    subtitle: "Consulting Excellence",
    description: "Personalized academic strategy and university placement guidance from industry experts.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    gradient: "from-blue-600 to-purple-600",
    badge: "PREMIUM CONSULTING • EXPERT GUIDANCE",
    primaryColor: "text-blue-600",
    secondaryColor: "text-purple-600",
    
    features: [
      {
        icon: Brain,
        title: "Personalized Assessment",
        description: "Comprehensive evaluation of your academic strengths, interests, and career goals."
      },
      {
        icon: Target,
        title: "Strategic Planning",
        description: "Custom roadmap designed to maximize your university admission chances."
      },
      {
        icon: Trophy,
        title: "Expert Mentorship",
        description: "One-on-one guidance from admission experts and university alumni."
      }
    ],
    
    benefits: [
      {
        title: "University Placement Success",
        description: "98% of our students get accepted to their top 3 university choices with our strategic guidance."
      },
      {
        title: "Scholarship Opportunities",
        description: "Access to exclusive scholarship programs and financial aid guidance worth millions in awards."
      },
      {
        title: "Long-term Career Strategy",
        description: "Academic planning that aligns with your career aspirations and industry trends."
      },
      {
        title: "Global University Network",
        description: "Connections to top universities worldwide through our extensive academic partnerships."
      }
    ],
    
    packages: [
      {
        name: "Foundation",
        price: 1999,
        duration: "3 months",
        gradient: "from-blue-500 to-blue-600",
        features: [
          "Academic assessment & planning",
          "University selection guidance",
          "Application strategy",
          "Essay review & feedback",
          "Interview preparation"
        ]
      },
      {
        name: "Premier",
        price: 3499,
        duration: "6 months",
        popular: true,
        gradient: "from-purple-500 to-blue-600",
        features: [
          "Everything in Foundation",
          "Scholarship application support",
          "Extracurricular planning",
          "SAT/ACT prep guidance",
          "Alumni network access",
          "Monthly check-ins"
        ]
      },
      {
        name: "Elite",
        price: 5999,
        duration: "12 months",
        gradient: "from-blue-600 to-purple-700",
        features: [
          "Everything in Premier",
          "Ivy League specialist mentor",
          "Research opportunity placement",
          "Internship connections",
          "Gap year planning",
          "Post-admission support"
        ]
      }
    ],
    
    overview: "Our Academic Consulting program provides comprehensive university admission strategy and academic planning. We work closely with students to identify their strengths, align their goals, and create a roadmap for success in higher education.",
    
    targetAudience: [
      "High school students planning for university",
      "Students seeking top-tier university admission",
      "International students navigating US/UK systems",
      "Students looking for scholarship opportunities"
    ],
    
    curriculum: [
      "Academic strength assessment and goal setting",
      "University research and selection strategy",
      "Application timeline and requirement planning",
      "Personal statement and essay development",
      "Interview skills and presentation training",
      "Scholarship and financial aid guidance"
    ],
    
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Harvard University Student",
        university: "Harvard University",
        content: "The academic consulting program transformed my university application process. I received guidance that helped me get into Harvard with a full scholarship.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Michael Rodriguez",
        role: "Stanford Graduate",
        university: "Stanford University",
        content: "The personalized approach and expert mentorship were invaluable. I'm now studying Computer Science at Stanford thanks to their strategic guidance.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Emma Thompson",
        role: "Oxford Scholar",
        university: "University of Oxford",
        content: "Their international expertise helped me navigate the complex Oxford application process. I'm now studying at my dream university!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      }
    ],
    
    stats: {
      students: "500+",
      satisfaction: "98%",
      placement: "95%",
      duration: "3-12mo"
    }
  },

  "career-consulting": {
    title: "CAREER",
    subtitle: "Strategic Consulting",
    description: "Professional career development and industry placement guidance for ambitious students.",
    heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    gradient: "from-emerald-600 to-teal-600",
    badge: "CAREER EXCELLENCE • INDUSTRY CONNECTIONS",
    primaryColor: "text-emerald-600",
    secondaryColor: "text-teal-600",
    
    features: [
      {
        icon: Briefcase,
        title: "Industry Analysis",
        description: "Deep dive into career paths and industry trends to guide your professional journey."
      },
      {
        icon: TrendingUp,
        title: "Skills Development",
        description: "Identify and develop the key skills needed for your target career field."
      },
      {
        icon: Users,
        title: "Professional Network",
        description: "Connect with industry professionals and potential mentors in your field."
      }
    ],
    
    benefits: [
      {
        title: "Industry Placement",
        description: "Direct connections to internships and entry-level positions at top companies worldwide."
      },
      {
        title: "Professional Skills",
        description: "Develop essential workplace skills including leadership, communication, and technical expertise."
      },
      {
        title: "Salary Optimization",
        description: "Learn negotiation strategies and market insights to maximize your earning potential."
      },
      {
        title: "Career Pivoting",
        description: "Strategic guidance for career changes and professional transitions at any stage."
      }
    ],
    
    packages: [
      {
        name: "Starter",
        price: 1499,
        duration: "2 months",
        gradient: "from-emerald-500 to-emerald-600",
        features: [
          "Career assessment & planning",
          "Resume & LinkedIn optimization",
          "Interview preparation",
          "Industry insights",
          "Job search strategy"
        ]
      },
      {
        name: "Professional",
        price: 2999,
        duration: "4 months",
        popular: true,
        gradient: "from-teal-500 to-emerald-600",
        features: [
          "Everything in Starter",
          "Industry mentor matching",
          "Networking event access",
          "Skill development plan",
          "Company introduction",
          "Salary negotiation training"
        ]
      },
      {
        name: "Executive",
        price: 4999,
        duration: "6 months",
        gradient: "from-emerald-600 to-teal-700",
        features: [
          "Everything in Professional",
          "C-suite mentor access",
          "Executive coaching",
          "Board preparation",
          "Leadership development",
          "Long-term career strategy"
        ]
      }
    ],
    
    overview: "Our Career Consulting program bridges the gap between education and professional success. We provide strategic career planning, industry connections, and professional development to accelerate your career trajectory.",
    
    targetAudience: [
      "University students planning career paths",
      "Recent graduates seeking employment",
      "Professionals considering career changes",
      "Entrepreneurs building businesses"
    ],
    
    curriculum: [
      "Career assessment and goal identification",
      "Industry research and market analysis",
      "Professional branding and networking",
      "Resume and portfolio development",
      "Interview skills and salary negotiation",
      "Long-term career strategy planning"
    ],
    
    testimonials: [
      {
        name: "David Park",
        role: "Google Software Engineer",
        university: "Tech Industry",
        content: "The career consulting program helped me land my dream job at Google. The industry connections and interview prep were game-changing.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Lisa Wang",
        role: "Investment Banking VP",
        university: "Finance Industry",
        content: "Their career guidance helped me transition from consulting to investment banking. I'm now a VP at a top-tier firm.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Alex Johnson",
        role: "Startup Founder",
        university: "Entrepreneurship",
        content: "The executive coaching and networking opportunities were invaluable for launching my startup. We've now raised $2M in funding.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      }
    ],
    
    stats: {
      students: "300+",
      satisfaction: "96%",
      placement: "92%",
      duration: "2-6mo"
    }
  },

  "mentorship": {
    title: "ELITE",
    subtitle: "Mentorship Program",
    description: "One-on-one guidance from successful professionals and industry leaders worldwide.",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    gradient: "from-orange-600 to-red-600",
    badge: "EXCLUSIVE MENTORSHIP • GLOBAL LEADERS",
    primaryColor: "text-orange-600",
    secondaryColor: "text-red-600",
    
    features: [
      {
        icon: Users,
        title: "Expert Mentors",
        description: "Connect with accomplished professionals from your target industry or university."
      },
      {
        icon: Target,
        title: "Personalized Goals",
        description: "Customized mentorship program tailored to your specific objectives and timeline."
      },
      {
        icon: Globe,
        title: "Global Network",
        description: "Access to our worldwide network of successful alumni and industry leaders."
      }
    ],
    
    benefits: [
      {
        title: "Industry Insights",
        description: "Learn from real-world experience and get insider knowledge about your chosen field."
      },
      {
        title: "Accelerated Growth",
        description: "Fast-track your development with personalized guidance and strategic advice."
      },
      {
        title: "Professional Network",
        description: "Build valuable connections that last throughout your career journey."
      },
      {
        title: "Confidence Building",
        description: "Develop leadership skills and confidence through expert mentorship and support."
      }
    ],
    
    packages: [
      {
        name: "Foundation",
        price: 999,
        duration: "3 months",
        gradient: "from-orange-500 to-orange-600",
        features: [
          "Monthly mentor sessions",
          "Goal setting & tracking",
          "Resource recommendations",
          "Email support",
          "Progress reviews"
        ]
      },
      {
        name: "Premium",
        price: 1999,
        duration: "6 months",
        popular: true,
        gradient: "from-red-500 to-orange-600",
        features: [
          "Everything in Foundation",
          "Bi-weekly sessions",
          "Industry event invitations",
          "Peer networking access",
          "Skills assessment",
          "Career planning support"
        ]
      },
      {
        name: "Elite",
        price: 3499,
        duration: "12 months",
        gradient: "from-orange-600 to-red-700",
        features: [
          "Everything in Premium",
          "Weekly mentor access",
          "Multiple mentor matching",
          "Executive coaching",
          "Speaking opportunities",
          "Alumni network access"
        ]
      }
    ],
    
    overview: "Our Elite Mentorship Program connects ambitious students with successful professionals who provide personalized guidance, industry insights, and career acceleration opportunities.",
    
    targetAudience: [
      "Ambitious students seeking guidance",
      "Young professionals starting careers",
      "Entrepreneurs building ventures",
      "Anyone seeking personal development"
    ],
    
    curriculum: [
      "Goal setting and strategic planning",
      "Industry-specific skill development",
      "Professional networking strategies",
      "Leadership and communication skills",
      "Career acceleration techniques",
      "Personal branding and visibility"
    ],
    
    testimonials: [
      {
        name: "Jessica Liu",
        role: "McKinsey Consultant",
        university: "Consulting",
        content: "My mentor helped me navigate the consulting recruitment process and land my dream job at McKinsey. The guidance was invaluable.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Marcus Thompson",
        role: "Medical Student",
        university: "Johns Hopkins",
        content: "The mentorship program connected me with a doctor who guided my pre-med journey. I'm now at Johns Hopkins Medical School.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Sophia Kim",
        role: "Tech Entrepreneur",
        university: "Startup Founder",
        content: "My Silicon Valley mentor helped me refine my startup idea and connect with investors. We've now successfully launched and scaled.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      }
    ],
    
    stats: {
      students: "800+",
      satisfaction: "99%",
      placement: "94%",
      duration: "3-12mo"
    }
  },

  "cambridge-training": {
    title: "CAMBRIDGE",
    subtitle: "Elite Training",
    description: "Official Cambridge University certified programs for academic and professional excellence.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    gradient: "from-indigo-600 to-blue-600",
    badge: "CAMBRIDGE CERTIFIED • WORLD-CLASS EDUCATION",
    primaryColor: "text-indigo-600",
    secondaryColor: "text-blue-600",
    
    features: [
      {
        icon: GraduationCap,
        title: "Cambridge Faculty",
        description: "Learn directly from Cambridge University professors and certified instructors."
      },
      {
        icon: Award,
        title: "Official Certification",
        description: "Earn recognized Cambridge certificates that enhance your academic profile."
      },
      {
        icon: BookOpen,
        title: "Rigorous Curriculum",
        description: "Experience the same academic rigor and excellence as Cambridge students."
      }
    ],
    
    benefits: [
      {
        title: "University Recognition",
        description: "Cambridge certification is globally recognized and highly valued by top universities."
      },
      {
        title: "Academic Excellence",
        description: "Develop critical thinking and analytical skills through world-class curriculum."
      },
      {
        title: "Research Skills",
        description: "Learn advanced research methodologies and academic writing techniques."
      },
      {
        title: "Global Network",
        description: "Connect with Cambridge alumni and international student community."
      }
    ],
    
    packages: [
      {
        name: "Certificate",
        price: 2499,
        duration: "4 weeks",
        gradient: "from-indigo-500 to-indigo-600",
        features: [
          "Cambridge curriculum access",
          "Faculty-led sessions",
          "Academic writing training",
          "Research methodology",
          "Official certificate"
        ]
      },
      {
        name: "Diploma",
        price: 4999,
        duration: "12 weeks",
        popular: true,
        gradient: "from-blue-500 to-indigo-600",
        features: [
          "Everything in Certificate",
          "Extended curriculum",
          "One-on-one tutorials",
          "Research project",
          "Cambridge diploma",
          "Alumni network access"
        ]
      },
      {
        name: "Fellowship",
        price: 7999,
        duration: "6 months",
        gradient: "from-indigo-600 to-blue-700",
        features: [
          "Everything in Diploma",
          "Cambridge campus visit",
          "Advanced research project",
          "Publication opportunity",
          "Fellowship certificate",
          "Ongoing mentorship"
        ]
      }
    ],
    
    overview: "Our Cambridge Training program offers authentic Cambridge University education through certified courses, distinguished faculty, and rigorous academic standards that prepare students for world-class university success.",
    
    targetAudience: [
      "Students applying to top universities",
      "Academic high achievers",
      "International students",
      "Future researchers and scholars"
    ],
    
    curriculum: [
      "Cambridge academic methodology",
      "Critical thinking and analysis",
      "Research design and execution",
      "Academic writing and presentation",
      "Peer review and collaboration",
      "Independent research project"
    ],
    
    testimonials: [
      {
        name: "Oliver Martin",
        role: "Oxford Student",
        university: "University of Oxford",
        content: "The Cambridge training gave me the academic foundation I needed for Oxford. The rigor and quality were exceptional.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "Priya Patel",
        role: "Research Scholar",
        university: "Cambridge University",
        content: "This program prepared me perfectly for my PhD at Cambridge. The research methodology training was invaluable.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      },
      {
        name: "James Wilson",
        role: "Harvard Graduate",
        university: "Harvard University",
        content: "The Cambridge certification was a key factor in my Harvard admission. The academic training exceeded all expectations.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5
      }
    ],
    
    stats: {
      students: "250+",
      satisfaction: "100%",
      placement: "98%",
      duration: "4-24wks"
    }
  }

  // Additional program configs would continue here for:
  // - summer-schools
  // - sat-act-camps  
  // - project-olympiads
  // - experiential-learning
  // - model-un
  // - pre-college-programs
};

export default programConfigs; 