import { motion } from "framer-motion"
import { Clock, DollarSign, Users, Rocket } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const Details: React.FC<{ nasaProgram: any }> = ({ nasaProgram }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
      addToCart(nasaProgram);
      navigate('/cart');
    };

  return (
    <div className="relative py-12 lg:py-20 bg-cover bg-center" style={{
        backgroundImage: "url('/images/seek-signs.webp')"
      }}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=""
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-8">
              SEEK SIGNS OF
              <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                LIFE MISSION
              </span>
            </h2>
            <p className="max-w-2xl text-sm md:text-md lg:text-lg text-gray-300 mb-8 leading-relaxed">
              Join NASA's groundbreaking mission to search for signs of life beyond Earth.
              This program combines cutting-edge astrobiology research with hands-on space
              technology development.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 max-w-2xl">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-400 mr-2" />
                <div>
                  <div className="text-white text-sm font-bold">Duration</div>
                  <div className="text-gray-300 text-sm">10-14 Days</div>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-orange-400 mr-2" />
                <div>
                  <div className="text-white text-sm font-bold">Investment</div>
                  <div className="text-gray-300 text-sm">{nasaProgram.formatted_price}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-orange-400 mr-2" />
                <div>
                  <div className="text-white text-sm font-bold">Class Size</div>
                  <div className="text-gray-300 text-sm">Max 20</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <Rocket className="mr-3 h-5 w-5" />
                ENROLL NOW
              </button>
              <Link
                to="/contact"
                className="border border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
  )
}

export default Details