import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeaturedPrograms: React.FC = () => {
  const featuredPrograms = [
    {
      id: "teacher-development",
      title: "Cambridge Teacher Development",
      description:
        "Official Cambridge Certificate of Professional Development with University-affiliated training.",
      image: "/images/acad-1.png",
      price: 2499,
      duration: "2-4 days",
      category: "Cambridge Certified",
      featured: true,
      bgColor: "#132241",
      categoryColor: "#394C73",
      durationColor: "#BC69F480",
    },
    {
      id: "nasa-space-training",
      title: "NASA Space Training 2025",
      description:
        "Kennedy Space Center experience with astronaut training and Mars exploration simulation.",
      image: "/images/acad-2.png",
      price: 5499,
      duration: "10-14 days",
      category: "NASA Partnership",
      featured: true,
      bgColor: "#7F1B28",
      categoryColor: "#A03543",
      durationColor: "#EE975199",
    },
    {
      id: "cambridge-training",
      title: "Elite Workshop Series",
      description:
        "World-class workshops led by professors from top universities. Tailored for schools, universities, and executives.",
      image: "/images/acad-3.png",
      price: "Custom",
      duration: "2 days+",
      category: "Professor-Led",
      featured: true,
      bgColor: "#132241",
      categoryColor: "#394C73",
      durationColor: "#BC69F480",
    },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white rounded-full text-[#7F1B28] text-xs md:text-sm font-medium mb-4 md:mb-8 border border-[#7F1B28]">
            <Rocket className="w-4 h-4 mr-2" />
            FEATURED PROGRAMS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-[#121212] mb-6 md:mb-8 leading-tight">
            ACADEMIC EXCELLENCE PROGRAMS
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-[#4B5563] max-w-full md:max-w-4xl mx-auto leading-relaxed">
            World-class education meets institutional excellence. These
            transformative programs are designed by leading universities and
            space agencies for educational innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative group">
                <Card
                  className="relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-md rounded-2xl md:rounded-3xl"
                  style={{ backgroundColor: program.bgColor }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-4 md:top-4 left-4 md:left-4">
                      <span
                        className="backdrop-blur-md text-white text-xs px-3 md:px-4 py-1 md:py-2 rounded-full font-medium uppercase tracking-wider"
                        style={{ backgroundColor: program.categoryColor }}
                      >
                        {program.category}
                      </span>
                    </div>

                    <div className="absolute top-4 md:top-4 right-4 md:right-4">
                      <span
                        className="backdrop-blur-md text-white text-xs px-3 md:px-4 py-1 md:py-2 rounded-full font-medium uppercase tracking-wider"
                        style={{ backgroundColor: program.durationColor }}
                      >
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="relative p-4">
                    <CardTitle className="text-lg md:text-xl font-extrabold text-white group-hover:text-yellow-400 transition-colors">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-[#FAFAFACC] text-sm leading-relaxed line-clamp-2">
                      {program.description}
                    </CardDescription>

                    <div className="border-b border-[#BFBFBF1F] pt-4" />
                  </CardHeader>

                  <CardContent className="pt-0 p-4 md:px-6 md:py-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {typeof program.price === "number" ? (
                          <>
                            <span className="text-2xl md:text-3xl lg:text-4xl text-[#FFF675] font-semibold">
                              ${program.price.toLocaleString()}
                            </span>
                            <div className="text-[#FFFFFFB2] text-xs uppercase tracking-wider">
                              INVESTMENT
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="text-2xl md:text-3xl lg:text-4xl text-[#FFF675] font-semibold">
                              {program.price}
                            </span>
                            <div className="text-[#FFFFFFB2] text-xs uppercase tracking-wider">
                              QUOTE
                            </div>
                          </>
                        )}
                      </div>

                      <Link
                        to={
                          program.id === "teacher-development"
                            ? "/teacher-development"
                            : program.id === "nasa-space-training"
                            ? "/nasa-programs"
                            : program.id === "cambridge-training"
                            ? "/elite-workshops"
                            : `/programs/${program.id}`
                        }
                      >
                        <div
                          className={`rounded-full p-2 w-11 h-11 flex items-center justify-center ${
                            program.id === "nasa-space-training"
                              ? "bg-white"
                              : "bg-[#7F1B28]"
                          }`}
                        >
                          <ChevronRight
                            className={`w-6 h-6 ${
                              program.id === "nasa-space-training"
                                ? "text-[#7F1B28]"
                                : "text-white"
                            }`}
                          />
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12 md:mt-16 lg:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button variant="learn_more" size="lg" className="group">
            <Link to="/programs" className="flex items-center gap-x-2">
              VIEW ALL PROGRAMS
              <img
                src="/images/view-all.svg"
                alt="Arrow Right"
                width={24}
                height={24}
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
