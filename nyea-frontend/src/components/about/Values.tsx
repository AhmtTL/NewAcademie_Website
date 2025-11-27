import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ArrowRight, Heart, Lightbulb, Rocket, Target } from "lucide-react";


const Values: React.FC = () => {
    const values = [
        {
            icon: Target,
            title: 'Excellence',
            description: 'We strive for the highest standards in everything we do, ensuring our students achieve their maximum potential.'
        },
        {
            icon: Heart,
            title: 'Integrity',
            description: 'We build trust through honest, transparent relationships with students, families, and educational partners.'
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We continuously evolve our programs to meet the changing demands of global education and career landscapes.'
        },
        {
            icon: Rocket,
            title: 'Empowerment',
            description: 'We believe in unlocking each student\'s unique potential and providing them with tools for lifelong success.'
        }
    ];
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#FFFFFF]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex justify-between items-center mb-4 md:mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                            Our Values
                        </h2>
                        <p className="text-xs md:text-sm lg:text-md text-gray-600 max-w-3xl">
                            The principles that guide everything we do and shape our approach to education
                        </p>
                    </div>
                    <div className="flex justify-end cursor-pointer">
                        <span className="text-xs md:text-sm text-[#1D4FD9] font-semibold flex items-center gap-2 hover:underline">Get in touch <ArrowRight className="w-4 h-4" /></span>
                    </div>
                </motion.div>

                {/* Horizontal Scrolling Layout */}
                <div className="overflow-x-auto hide-scrollbar">
                    <div className="flex flex-nowrap items-center justify-center space-x-4 md:space-x-6 pb-4 min-w-max">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="w-72 md:w-96 p-2 md:p-4 lg:p-6 border border-[#E9EBF3] hover:shadow-xl transition-all duration-300 bg-white/90 h-full cursor-pointer">
                                    <CardHeader className="">
                                        <div className="flex items-center mb-2 md:mb-4">
                                            <div className="p-2 md:p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mr-2 md:mr-4">
                                                <value.icon className="h-4 w-4 md:h-6 md:w-6" />
                                            </div>
                                            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                                                {value.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {value.description}
                                            <div className="flex justify-end mt-4">
                                                <img src="/images/arrow-right.svg" alt="values" className="w-4 h-4 object-cover" />
                                            </div>
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Values