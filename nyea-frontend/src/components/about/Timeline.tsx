import { motion } from "framer-motion";
import { Building2, Globe, Lightbulb, Rocket, Network } from "lucide-react";

const Timeline: React.FC = () => {
    const timeline = [
        {
            year: '2016',
            title: 'Foundation',
            description: 'NY Empire Academy founded in New York with a vision to transform global education.',
            icon: Building2
        },
        {
            year: '2018',
            title: 'Global Expansion',
            description: 'Opened offices in London and Seoul, establishing our international presence.',
            icon: Globe
        },
        {
            year: '2020',
            title: 'Digital Innovation',
            description: 'Launched comprehensive online programs and virtual mentorship platforms.',
            icon: Lightbulb
        },
        {
            year: '2022',
            title: 'NASA Partnership',
            description: 'Established exclusive partnership for space training and STEM programs.',
            icon: Rocket
        },
        {
            year: '2024',
            title: 'Global Network',
            description: 'Expanded to 6 locations worldwide with 255+ successful alumni.',
            icon: Network
        }
    ];

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#111827] via-[#1E3A8A] to-[#581C87] relative overflow-hidden">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-10 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-[#AAC4FA] text-sm font-medium mb-2">
                        Our Journey
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#FFFFFF] leading-relaxed max-w-full md:max-w-4xl mx-auto">
                        From a Small Startup in New York to a Global Education Powerhouse
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Timeline Line - Hidden on mobile, visible on md+ */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-white/30"></div>

                    <div className="space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
                        {timeline.map((item, index) => {
                            const isEven = index % 2 === 0;
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    {/* Mobile Layout (sm and below) */}
                                    <div className="block md:hidden">
                                        <div className="flex items-start space-x-4">
                                            {/* Icon */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.2 + 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                                                viewport={{ once: true }}
                                                className="flex-shrink-0 mt-1"
                                            >
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                                                    <item.icon className="w-5 h-5 text-[#2563EB]" />
                                                </div>
                                            </motion.div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <motion.div
                                                    initial={{ opacity: 0, x: 30 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                                        {item.year}
                                                    </div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-[#FAFAFA] text-sm sm:text-base leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Layout (md and above) */}
                                    <div className="hidden md:flex items-center">
                                        {isEven ? (
                                            // Even items: Year left, Content right
                                            <>
                                                {/* Left side - Year */}
                                                <div className="w-1/2 pr-4 md:pr-6 lg:pr-8 xl:pr-12 text-right">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
                                                        viewport={{ once: true }}
                                                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white"
                                                    >
                                                        {item.year}
                                                    </motion.div>
                                                </div>

                                                {/* Center - Icon */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.2 + 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                                                    viewport={{ once: true }}
                                                    className="relative z-10 flex-shrink-0"
                                                >
                                                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                                                        <item.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#2563EB]" />
                                                    </div>
                                                </motion.div>

                                                {/* Right side - Content */}
                                                <div className="w-1/2 pl-4 md:pl-6 lg:pl-8 xl:pl-12">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[#FAFAFA] text-sm md:text-base lg:text-lg leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </motion.div>
                                                </div>
                                            </>
                                        ) : (
                                            // Odd items: Content left, Year right
                                            <>
                                                {/* Left side - Content */}
                                                <div className="w-1/2 pr-4 md:pr-6 lg:pr-8 xl:pr-12 text-right">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[#FAFAFA] text-sm md:text-base lg:text-lg leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </motion.div>
                                                </div>

                                                {/* Center - Icon */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.2 + 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                                                    viewport={{ once: true }}
                                                    className="relative z-10 flex-shrink-0"
                                                >
                                                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                                                        <item.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#2563EB]" />
                                                    </div>
                                                </motion.div>

                                                {/* Right side - Year */}
                                                <div className="w-1/2 pl-4 md:pl-6 lg:pl-8 xl:pl-12">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 30 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.2 + 0.2, duration: 0.6 }}
                                                        viewport={{ once: true }}
                                                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white"
                                                    >
                                                        {item.year}
                                                    </motion.div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Timeline