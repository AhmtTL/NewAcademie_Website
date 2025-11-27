import { motion } from "framer-motion"
import { Users, Globe, BookOpen } from "lucide-react";

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: Users,
      number: '255+',
      label: 'Students Mentored',
      description: 'Across 6 global locations',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      number: '98%',
      label: 'Success Rate',
      description: 'University admissions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Globe,
      number: '$12M+',
      label: 'Scholarships',
      description: 'Secured for students',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: BookOpen,
      number: '50+',
      label: 'Top Universities',
      description: 'Partner institutions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#FAFCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pr-8 bg-[#FFFFFF] p-4 md:p-8 rounded-3xl border border-[#E9EBF3]"
          >
            <div className="inline-flex items-center text-blue-600 text-sm font-bold mb-6">
              How It Started
            </div>
            
            <h1 className="text-xl md:text-3xl lg:text-6xl font-bold text-[#111827] mb-8 leading-relaxed lg:mb-[10rem]">
              Our Dream is Global Learning Transformation
            </h1>

            <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
              <p className="">
                NYEA is an independent education coaching & consulting firm that founded 2016 in New York, USA. NYEA offers 
                individual learners valuable and most recent and most demand programs which help our learner to be qualified for top 
                notch education institutions around the world.
              </p>
              
              <p className="">
                NYEA currently has several branches across the globe.
              </p>
              
              <p className="">
                NYEA offers tailored programs as a NASA Space Training Workshop, AI & Coding, Art Workshops, Summer School, 
                Internship, Experiential Learning Programs, Model United Nations in New York, ACT/SAT Crash Camps, Project 
                Olympiads.
              </p>
              
              <p className="">
                NYEA also provide custom programs for local Middle Schools, High Schools, and other institutes.
              </p>
            </div>
          </motion.div>

          {/* Right Section - Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            {/* Graduation Image */}
            <div className="relative rounded-3xl overflow-hidden mb-12">
              <img
                src="/images/graduates.webp"
                alt="Graduates celebrating"
                className="w-full h-72 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 bg-[#FFFFFF] p-2 md:p-4 rounded-3xl border border-[#E9EBF3]">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                  className="text-center bg-[#FAFAFA] p-2 md:p-8 rounded-3xl"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 ${achievement.bgColor} rounded-xl`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                  </div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#111827] mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-xs md:text-md font-bold text-[#1F2937] mb-1 text-sm md:text-base">
                    {achievement.label}
                  </div>
                  <div className="text-xs md:text-sm text-[#4B5563]">
                    {achievement.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Achievements