import { motion } from "framer-motion";

const Stats: React.FC = () => {
    const achievements = [
        { number: '500+', label: 'Students Trained' },
        { number: '15', label: 'NASA Partnerships' },
        { number: '95%', label: 'STEM Career Rate' },
        { number: '25', label: 'Research Publications' }
    ];

    return (
        <div className="py-12 md:py-16 lg:py-20 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {achievements.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl text-[#01003A] font-extrabold mb-2">
                                {stat.number}
                            </div>
                            <div className="text-[#575758] font-semibold uppercase tracking-wider text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stats