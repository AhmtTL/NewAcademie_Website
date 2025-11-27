import { motion } from "framer-motion"

const MissionVision: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#111827] via-[#1E3A8A] to-[#581C87] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center mb-10 md:mb-16 lg:mb-24">
                    {/* Left - Overlapping Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative lg:order-1"
                    >
                        {/* Main Image Card */}
                        <div className="relative">
                            <div className="p-4">
                                <img
                                    src="/images/mission.webp"
                                    alt="Graduate celebrating"
                                    className="w-full sm:h-auto rounded-2xl"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Mission Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:order-2"
                    >
                        <div className="text-[#AAC4FA] text-xs md:text-sm font-bold mb-2 md:mb-4">
                            Our Mission
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-6 leading-tight">
                            Learning for All, Everywhere
                        </h2>
                        <p className="text-xs md:text-base text-[#FFFFFFB2] leading-relaxed">
                            To empower students worldwide through innovative education programs, expert mentorship, and strategic
                            partnerships with top universities and organizations. We believe every student has the potential to achieve
                            greatness.
                        </p>
                    </motion.div>
                </div>

                {/* Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Vision Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:order-1"
                    >
                        <div className="text-[#AAC4FA] text-xs md:text-sm font-bold mb-2 md:mb-4">
                            Our Vision
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-6 leading-tight">
                            Transforming Lives Through Education
                        </h2>
                        <p className="text-xs md:text-base text-[#FFFFFFB2] leading-relaxed">
                            To be the world's leading educational consultancy, recognized for transforming lives and creating pathways
                            to success at the most prestigious institutions globally.
                        </p>
                    </motion.div>

                    {/* Right - Vision Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative lg:order-2"
                    >
                        {/* Single Image Card for Vision */}
                        <div className="relative">
                            <div className="p-4 rounded-3xl">
                                <img
                                    src="/images/vision.webp"
                                    alt="Educational consultation meeting"
                                    className="w-full sm:h-auto rounded-2xl"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </section>
    )
}

export default MissionVision