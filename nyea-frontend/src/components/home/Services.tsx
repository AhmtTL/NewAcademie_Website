import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
    const services = [
        {
            title: 'Academic Consulting',
            description: 'Personalized assessment of talents, learning styles, and optimal educational pathways.',
            buttonText: 'LEARN MORE',
            imagePosition: 'left',
            image: '/images/service1.webp',
            link: '/programs/academic-consulting'
        },
        {
            title: 'Elite Mentorship',
            description: 'One-on-one guidance from successful professionals and industry leaders.',
            buttonText: 'LEARN MORE',
            imagePosition: 'right',
            image: '/images/service2.webp',
            link: '/programs/mentorship'
        },
        {
            title: 'Career Acceleration',
            description: 'Strategic career planning and professional development opportunities.',
            buttonText: 'LEARN MORE',
            imagePosition: 'left',
            image: '/images/service3.webp',
            link: '/programs/career-consulting'
        }
    ];

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 md:px-6 py-2 bg-[#C3D6FF33] rounded-full text-[#1D4ED8] text-xs md:text-sm font-medium mb-6 md:mb-8 border border-[#BFDBFE80]">
                        <Rocket className="w-4 h-4 mr-2" />
                        OUR SERVICES
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#000000] mb-4 md:mb-6 leading-tight">
                        WHERE POTENTIAL MEETS PREPARATION
                    </h2>
                    <p className="text-sm md:text-lg lg:text-xl text-[#000000] max-w-full md:max-w-3xl mx-auto">
                        Comprehensive educational solutions tailored to unlock your full potential
                    </p>
                </motion.div>

                {/* Services */}
                <div className="space-y-12 md:space-y-14 lg:space-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`flex flex-col lg:flex-row items-center gap-2 md:gap-6 lg:gap-10 ${service.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image */}
                            <div className="flex-1 w-full">
                                <div className="relative overflow-hidden p-2 md:p-4 aspect-[16/9] rounded-full bg-blue-100">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center justify-center">
                                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left px-4 md:px-0">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-sm md:text-md text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                                    {service.description}
                                </p>
                                <Button variant="primary" className="group/btn font-bold border-0 shadow-lg text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                                    <Link to={service.link} className="flex items-center">
                                        LEARN MORE
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;