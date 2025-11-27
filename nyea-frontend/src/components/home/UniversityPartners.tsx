import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const UniversityPartners: React.FC = () => {
    const universityPartners = [
        '/images/partner1.png',
        '/images/partner2.png',
        '/images/partner3.png',
        '/images/partner4.png',
        '/images/partner5.png',
        '/images/partner6.png',
        '/images/partner7.png',
        '/images/partner8.png',
        '/images/partner9.png',
        '/images/partner10.png',
        '/images/partner11.png',
        '/images/partner12.png',
        '/images/partner13.png'
    ];

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#FFFFFF] relative overflow-hidden">
            <div className="relative z-10 mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12 md:mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 md:px-6 py-2 bg-[#C3D6FF33] rounded-full text-[#1D4ED8] text-xs md:text-sm font-medium mb-4 md:mb-8 border border-[#BFDBFE80]">
                        <Award className="w-4 h-4 mr-2" />
                        UNIVERSITY PARTNERSHIPS
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto font-extrabold text-[#000000] mb-6 md:mb-8 leading-tight">
                        WHERE EXCELLENCE IS FORGED
                    </h2>
                    <p className="text-sm md:text-lg lg:text-xl text-[#000000] max-w-full md:max-w-4xl mx-auto leading-relaxed">
                        Our alumni excel at the world's top universities.
                        From Harvard's halls to MIT's labs, NYEA graduates are achieving academic excellence.
                    </p>
                </motion.div>

                {/* Continuous Scrolling Layout */}
                <div className="overflow-hidden relative">
                    <motion.div 
                        className="flex items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                        style={{ width: "200%" }}
                    >
                        {/* First set of partners */}
                        {universityPartners.map((partner, index) => (
                            <div key={`first-${index}`} className="flex-shrink-0 w-16 md:w-20 lg:w-24 mx-6 md:mx-8 lg:mx-10 xl:mx-12 flex items-center justify-center">
                                <img
                                    src={partner}
                                    alt={`Partner ${index + 1}`}
                                    className="w-full h-auto object-contain filter transition-all duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {universityPartners.map((partner, index) => (
                            <div key={`second-${index}`} className="flex-shrink-0 w-16 md:w-20 lg:w-24 mx-6 md:mx-8 lg:mx-10 xl:mx-12 flex items-center justify-center">
                                <img
                                    src={partner}
                                    alt={`Partner ${index + 1}`}
                                    className="w-full h-auto object-contain filter transition-all duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default UniversityPartners;