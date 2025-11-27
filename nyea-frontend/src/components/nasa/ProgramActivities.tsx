import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, ArrowUpRight } from "lucide-react"
import { useState } from "react"

const ProgramActivities: React.FC = () => {
    const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

    const activities = [
        {
            title: 'Astronaut Training Workshop',
            description: 'Launch operations, Mars operations, and microgravity training with Mission Control simulations.',
            features: ['Launch Training', 'Mars Surface VR', 'Microgravity Chairs', 'Emergency Protocols'],
            backgroundImage: '/images/Nasa Program 1.webp'
        },
        {
            title: 'Mars Base 1',
            description: 'Mars Base Operations Center with robot programming and indoor agriculture experiences.',
            features: ['Base Operations', 'Robot Programming', 'Solar Panel Maintenance', 'Botany Lab'],
            backgroundImage: '/images/Nasa Program 2.webp'
        },
        {
            title: 'To the Moon and Beyond',
            description: 'Kennedy Space Center visit with Apollo/Saturn V Center and Vehicle Assembly Building.',
            features: ['Saturn V Rocket', 'Apollo Center', 'Historical Exhibits', 'Future Missions'],
            backgroundImage: '/images/Nasa Program 3.webp'
        },
        {
            title: 'Low-Earth Orbit',
            description: 'Interactive NASA programs exploring space station operations and Earth observation.',
            features: ['Space Station Ops', 'Earth Sciences', 'Environmental Tech', 'STEM Challenges'],
            backgroundImage: '/images/Nasa Program 4.webp'
        },
        {
            title: 'Engineering Design Challenges',
            description: 'Hands-on engineering projects using NASA methodologies and cutting-edge technology.',
            features: ['Design Process', 'Problem Solving', 'Prototype Building', 'Testing & Iteration'],
            backgroundImage: '/images/Nasa Program 5.webp'
        },
        {
            title: 'STEM Challenges',
            description: 'Collaborative projects combining science, technology, engineering, and mathematics.',
            features: ['Critical Thinking', 'Team Collaboration', 'Communication', 'Real Applications'],
            backgroundImage: '/images/Nasa Program 6.webp'
        }
    ];

    const handleActivityClick = (index: number) => {
        setSelectedActivity(selectedActivity === index ? null : index);
    };

    return (
        <div className="py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#01003A] mb-6">
                            Program Activities
                        </h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Comprehensive space training activities designed by NASA experts
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            {selectedActivity === index ? (
                                // Detailed View with Background Image
                                <div 
                                    className="relative h-[300px] rounded-2xl overflow-hidden"
                                    onClick={() => handleActivityClick(index)}
                                >
                                    {/* Background Image with Reduced Opacity */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={activity.backgroundImage}
                                            alt={activity.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Strong Dark Overlay for Readability */}
                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-[#000000B2]"></div> */}
                                    
                                    {/* Content */}
                                    <div className="relative h-full p-6 flex flex-col">
                                        {/* Header with Close Button */}
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg lg:text-xl font-bold text-white flex-1">
                                                {activity.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Description */}
                                        <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                                            {activity.description}
                                        </p>
                                        
                                        {/* Features */}
                                        <ul className="space-y-2 flex-1 overflow-y-auto">
                                            {activity.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center text-gray-200 text-sm">
                                                    <CheckCircle className="h-4 w-4 text-orange-400 mr-3 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                // Image Card View (Design from Image)
                                <div 
                                    className="relative h-[300px] rounded-2xl overflow-hidden"
                                    onClick={() => handleActivityClick(index)}
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={activity.backgroundImage}
                                            alt={activity.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 via-[#000000B2] to-transparent"></div>
                                    
                                    {/* Content */}
                                    <div className="relative h-full p-6 flex flex-col justify-end">
                                        {/* Title and Arrow in Same Row */}
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-white leading-tight flex-1 mr-4">
                                                {activity.title}
                                            </h3>
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors flex-shrink-0">
                                                <ArrowRight className="h-5 w-5 text-white group-hover:hidden" />
                                                <ArrowUpRight className="h-5 w-5 text-white hidden group-hover:block" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProgramActivities