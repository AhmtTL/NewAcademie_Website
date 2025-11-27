import { motion } from "framer-motion"

const GlobalPresence: React.FC = () => {
    const locations = [
        {
            city: "NEW YORK",
            country: "UNITED STATES",
            image: "/images/newyork.webp"
        },
        {
            city: "LONDON", 
            country: "UNITED KINGDOM",
            image: "/images/london.webp"
        },
        {
            city: "SEOUL",
            country: "SOUTH KOREA", 
            image: "/images/seoul.webp"
        },
        {
            city: "BAKU",
            country: "AZERBAIJAN",
            image: "/images/baku.webp"
        },
        {
            city: "CYPRUS",
            country: "REPUBLIC OF CYPRUS",
            image: "/images/cyprus.webp"
        },
        {
            city: "LAHORE",
            country: "PAKISTAN",
            image: "/images/lahore.webp"
        }
    ];

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                        Global Presence
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Serving students across six strategic locations worldwide
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {locations.map((location, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            className="relative group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-xl">
                                {/* Background Image */}
                                <img
                                    src={location.image}
                                    alt={`${location.city}, ${location.country}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                
                                {/* Text Content */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-white mb-2 drop-shadow-lg">
                                        {location.city}
                                    </h3>
                                    <p className="text-xs md:text-sm text-white/90 font-medium uppercase tracking-wider drop-shadow-md">
                                        {location.country}
                                    </p>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-white/0 rounded-3xl group-hover:border-white/20 transition-all duration-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GlobalPresence