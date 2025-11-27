import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Star, ArrowRight } from "lucide-react"

const CTA: React.FC<{ nasaProgram: any }> = ({ nasaProgram }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    const handleAddToCart = () => {
      addToCart(nasaProgram);
      navigate('/cart');
    };
    
    return (
        <section className="relative py-12 md:py-20 lg:py-24 ">
            <div className="absolute inset-0">
                <img
                    src="/images/galaxy.webp"
                    alt="Galaxy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0000001A] via-[#000000CC] to-[#0000001A]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                        Ready to Explore the Cosmos?
                    </h2>
                    <p className="text-sm md:text-lg lg:text-xl mb-12 max-w-full md:max-w-3xl mx-auto leading-relaxed opacity-90">
                        Join the next generation of space explorers and contribute to humanity's
                        greatest quest: finding life beyond Earth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={handleAddToCart}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-black text-sm md:text-md hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl flex items-center justify-center"
                        >
                            <Star className="mr-3 h-6 w-6" />
                            START YOUR JOURNEY
                        </button>
                        <Link
                            to="/programs"
                            className="border border-white text-white px-8 py-4 rounded-xl font-bold text-sm md:text-md hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
                        >
                            VIEW ALL PROGRAMS
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA