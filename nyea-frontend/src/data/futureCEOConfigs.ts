export interface FutureCEODay {
  day: number;
  title: string;
  activities: string[];
}

export interface FutureCEOInstructor {
  name: string;
  title: string;
  credentials: string;
  image: string;
  bio: string;
}

export interface FutureCEOConfig {
  id: number;
  university: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  capacity: number;
  duration: string;
  startDate: string;
  endDate: string;
  registrationDate: string;
  location: string;
  category: string;
  
  // Introduction
  introduction: {
    title: string;
    content: string[];
    image: string;
  };
  
  // Program Details
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  
  // Instructors
  instructors: FutureCEOInstructor[];
  
  // Why Join
  whyJoin: {
    title: string;
    reasons: {
      icon: string;
      title: string;
      description: string;
      image?: string;
    }[];
  };
  
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  
  itinerary: FutureCEODay[];
  
  // Media
  heroImage?: string;
  heroVideo?: string;
  
  // Additional Info
  ledBy: string;
  certificate: string;
  
  features: string[];
}

export const futureCEOConfigs: Record<string, FutureCEOConfig> = {
  harvard: {
    id: 100,
    university: "Harvard University",
    title: "Future CEO Training Program",
    subtitle: "An Exclusive Two-Week Training Program at Harvard University",
    description: "Join an elite 2-week intensive leadership program at Harvard University. Limited to just 30 students worldwide, this exclusive training combines real-world CEO simulations, Harvard case method instruction, and hands-on leadership challenges led by Harvard University professors.",
    price: 9999.99,
    capacity: 42,
    duration: "2 weeks",
    startDate: "January 11, 2026",
    endDate: "January 23, 2026",
    registrationDate: "October 31, 2025",
    location: "Harvard University, Cambridge, MA",
    category: "Executive Training",
    ledBy: "Harvard University Professors",
    certificate: "CPD-accredited certificate signed by the professors",
    
    heroImage: "/images/harvard2.png",
    
    introduction: {
      title: "What is the Future CEO Training Program?",
      content: [
        "The Future CEO Training Program is an exclusive two-week immersive experience designed to transform ambitious students into tomorrow's business leaders. Limited to just 30 participants worldwide, this elite program combines Harvard's world-renowned teaching methods with real-world CEO challenges.",
        "Join students from around the globe for an unforgettable journey of personal and professional transformation at one of the world's most prestigious universities.",
      ],
      image: "/images/graduates.webp"
    },
    
    instructors: [
      {
        name: "Nicholas Coburn-Palo",
        title: "Lead Instructor",
        credentials: "Harvard University Instructor & Leadership Expert",
        image: "/images/nicholas-coburn-palo.svg",
        bio: "Nicholas Coburn-Palo brings over 15 years of experience teaching leadership and negotiation at Harvard. His expertise in executive education has transformed thousands of emerging leaders worldwide."
      },
      {
        name: "Harvard Faculty Team",
        title: "Supporting Instructors",
        credentials: "Harvard University Professors",
        image: "/images/cambridge-teacher.webp",
        bio: "Our distinguished faculty includes Harvard professors specializing in business strategy, organizational behavior, and executive leadership. Each brings decades of real-world experience and academic excellence."
      }
    ],
    
    whyJoin: {
      title: "Why Join the Future CEO Program?",
      reasons: [
        {
          icon: "TrendingUp",
          title: "Transform Your Leadership Potential",
          description: "Discover and develop your unique leadership identity through Harvard's proven methodologies. Learn to think, decide, and act like a CEO.",
          image: "/images/graduates.webp"
        },
        {
          icon: "Award",
          title: "Gain Harvard Credentials",
          description: "Earn a CPD-accredited certificate signed by Harvard professors. Add prestigious credentials that stand out on university applications and resumes.",
          image: "/images/graduation-cap.webp"
        },
        {
          icon: "Users",
          title: "Build a Global Network",
          description: "Connect with 29 other ambitious students from around the world. Build lifelong friendships and professional relationships that span continents.",
          image: "/images/networking.jpg"
        },
        {
          icon: "Globe",
          title: "Experience Ivy League Universities",
          description: "Tour Harvard, Yale, MIT, and Columbia. Experience campus life at the world's top universities and get insider tips for admissions.",
          image: "/images/london.webp"
        },
        {
          icon: "Brain",
          title: "Master Real CEO Skills",
          description: "Learn decision-making under pressure, strategic thinking, and effective communication through real-world simulations and case studies.",
          image: "/images/mission.webp"
        },
        {
          icon: "Rocket",
          title: "Create Your CEO Roadmap",
          description: "Leave with a personalized strategic plan for your leadership journey. Know exactly what steps to take to achieve your executive goals.",
          image: "/images/vision.webp"
        }
      ]
    },
    
    highlights: [
      {
        icon: "User",
        title: "Discover Your Leadership Identity",
        description: "Uncover your unique leadership style and learn how to leverage it for maximum impact in executive settings."
      },
      {
        icon: "Brain",
        title: "Learn How Harvard Leaders Make Decisions",
        description: "Master the decision-making frameworks used by Harvard-trained executives and business leaders worldwide."
      },
      {
        icon: "Target",
        title: "Engage in Real-Time Case Simulations",
        description: "Apply leadership principles through interactive simulations based on real CEO challenges and scenarios."
      },
      {
        icon: "TrendingUp",
        title: "Build Your Personal 'Future CEO' Roadmap",
        description: "Create a personalized strategic plan for your leadership journey and executive career development."
      }
    ],
    
    benefits: [
      {
        icon: "Zap",
        title: "Develop Core Leadership Skills",
        description: "Build essential leadership capabilities through active challenges and real-world business scenarios."
      },
      {
        icon: "Award",
        title: "Master Decision-Making Under Pressure",
        description: "Learn to make critical decisions quickly and confidently in high-stakes business environments."
      },
      {
        icon: "BookOpen",
        title: "Think Like a CEO Using Harvard Case Method",
        description: "Apply the renowned Harvard case method to analyze complex business problems like top executives."
      },
      {
        icon: "Users",
        title: "Boost Communication & Team-Building Skills",
        description: "Enhance your ability to communicate effectively and build high-performing teams across cultures."
      },
      {
        icon: "GraduationCap",
        title: "Receive CPD-Accredited Certificate",
        description: "Earn a certificate of participation signed by Harvard professors, recognized globally for professional development."
      }
    ],
    
    itinerary: [
      {
        day: 1,
        title: "Sunday - Welcome & Orientation",
        activities: [
          "Arrivals & Pick up at Boston Logan Airport",
          "Program Orientation",
          "Welcome Dinner"
        ]
      },
      {
        day: 2,
        title: "Monday - Foundation & Discovery",
        activities: [
          "Breakfast",
          "9am - 12pm: Leadership Fundamentals Class",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Projects Introduction",
          "Museum of Science, Boston",
          "Dinner"
        ]
      },
      {
        day: 3,
        title: "Tuesday - Strategic Thinking",
        activities: [
          "Breakfast",
          "9am - 12pm: Decision-Making Frameworks",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Projects",
          "Boston Aquarium Visit",
          "Dinner"
        ]
      },
      {
        day: 4,
        title: "Wednesday - Innovation & Technology",
        activities: [
          "Breakfast",
          "9am - 12pm: Innovation Leadership Class",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Projects",
          "MIT Admission Tour",
          "Dinner"
        ]
      },
      {
        day: 5,
        title: "Thursday - Harvard Excellence",
        activities: [
          "Breakfast",
          "9am - 12pm: Harvard Case Method Workshop",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Projects",
          "Harvard Museum & Admission Tour",
          "Dinner"
        ]
      },
      {
        day: 6,
        title: "Friday - Ivy League Exploration",
        activities: [
          "Breakfast",
          "Yale University Admission Tour",
          "Lunch",
          "Columbia University Tour",
          "Natural History Museum",
          "Times Square Experience",
          "Dinner"
        ]
      },
      {
        day: 7,
        title: "Saturday - New York City Leadership",
        activities: [
          "Breakfast",
          "Statue of Liberty Tour",
          "Wall Street Financial District",
          "Lunch",
          "Brooklyn Bridge Walk",
          "Vanderbilt Summit",
          "Times Square & NBA Store Visit",
          "Dinner"
        ]
      },
      {
        day: 8,
        title: "Sunday - Cultural Experience",
        activities: [
          "Breakfast",
          "Full Day Shopping at Premium Outlet Stores",
          "Cultural Immersion Activities",
          "Dinner"
        ]
      },
      {
        day: 9,
        title: "Monday - CEO Simulations Begin",
        activities: [
          "Breakfast",
          "9am - 12pm: Executive Leadership Class",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Project Simulations",
          "Guest Visitor - Industry Leader Session",
          "Dinner"
        ]
      },
      {
        day: 10,
        title: "Tuesday - Advanced Strategy",
        activities: [
          "Breakfast",
          "9am - 12pm: Strategic Management Class",
          "12pm - 1pm: Lunch",
          "1pm - 3pm: Group Project Simulations",
          "Tax-Free Shopping Mall",
          "Dinner"
        ]
      },
      {
        day: 11,
        title: "Wednesday - Final Preparations",
        activities: [
          "Breakfast",
          "9am - 12pm: Communication & Influence Class",
          "Group Project Simulation Refinement",
          "12pm - 1pm: Lunch",
          "Free Time for Project Work",
          "Dinner"
        ]
      },
      {
        day: 12,
        title: "Thursday - Presentations & Celebration",
        activities: [
          "Breakfast",
          "9am - 12pm: Final Class - Group Projects Simulation Submission",
          "Lunch",
          "Project Presentations & Feedback",
          "Certificate Ceremony",
          "Farewell Dinner"
        ]
      },
      {
        day: 13,
        title: "Friday - Departure",
        activities: [
          "Breakfast",
          "Program Conclusion & Feedback",
          "Airport Transfers",
          "Return to Home"
        ]
      }
    ],
    
    features: [
      "Harvard University Professors",
      "CPD-Accredited Certificate",
      "Real CEO Simulations",
      "Ivy League Tours"
    ]
  },
  
  // Template for future universities
  // stanford: { ... },
  // yale: { ... },
  // oxford: { ... },
};

export default futureCEOConfigs;

