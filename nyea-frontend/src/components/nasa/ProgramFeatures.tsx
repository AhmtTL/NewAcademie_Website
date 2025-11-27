import { motion } from "framer-motion";
import { Rocket, Search, Atom, Globe, Users, Zap } from "lucide-react";

const ProgramFeatures: React.FC = () => {
  const programFeatures = [
    {
      icon: Rocket,
      title: "NASA Partnership",
      description:
        "Direct collaboration with NASA scientists and engineers for authentic space exploration experience.",
      backgroundImage: "./images/program-1.png",
    },
    {
      icon: Search,
      title: "Space Science Research",
      description:
        "Hands-on research projects including astrobiology, planetary science, and space technology.",
      backgroundImage: "./images/program-2.png",
    },
    {
      icon: Atom,
      title: "STEM Excellence",
      description:
        "Advanced physics, chemistry, mathematics, and engineering concepts applied to space exploration.",
      backgroundImage: "./images/program-3.png",
    },
    {
      icon: Globe,
      title: "Mission Simulation",
      description:
        "Real-world mission planning and execution using NASA methodologies and technologies.",
      backgroundImage: "./images/program-4.png",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description:
        "Guidance from NASA scientists, astronauts, and space industry professionals.",
      backgroundImage: "./images/program-5.png",
    },
    {
      icon: Zap,
      title: "Innovation Lab",
      description:
        "Design and build space technology prototypes using cutting-edge tools and methods.",
      backgroundImage: "./images/program-6.png",
    },
  ];

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-[#01003A] mb-4">
              Program Features
            </h2>
            <p className="text-sm md:text-md lg:text-lg text-[#1B1B1B] leading-relaxed">
              Experience authentic NASA missions through comprehensive space
              science education
            </p>
          </motion.div>
        </div>

        <div className="overflow-x-auto hide-scrollbar gap-6">
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8 pb-4 min-w-max">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "backInOut" },
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative w-[350px] h-[480px] rounded-3xl overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={feature.backgroundImage}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.background =
                          "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)";
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/20"></div>

                  <div className="relative h-full p-8 flex flex-col">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-auto group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramFeatures;
