import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  Plane, 
  Wrench, 
  Home, 
  Bus, 
  Sparkles, 
  Shield, 
  Award, 
  MapPin,
  Rocket,
  Check,
  Ticket,
} from 'lucide-react';

const Training: React.FC<{ nasaProgram: any }> = ({ nasaProgram }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);

  const handleAddToCart = () => {
    addToCart(nasaProgram);
    navigate('/cart');
  };

  const trainingPackages = [
    {
      duration: "10",
      unit: "DAYS",
      features: [
        { icon: Ticket, text: "Tickets and Visa Included" },
        { icon: Plane, text: "Airport Pick up and Drop" },
        { icon: Wrench, text: "All Workshop and Materials" },
        { icon: Home, text: "Accommodation" },
        { icon: Bus, text: "Transportation" },
        { icon: Sparkles, text: "Entrance to Attraction and Activities" },
        { icon: Shield, text: "Travel Medical Insurance" },
        { icon: Award, text: "Certificate" },
        { icon: MapPin, text: "Miami, Orlando" }
      ]
    },
    // {
    //   duration: "14",
    //   unit: "DAYS", 
    //   features: [
    //     { icon: Plane, text: "Airport Pick up and Drop" },
    //     { icon: Wrench, text: "All Workshop and Materials" },
    //     { icon: Home, text: "Accommodation" },
    //     { icon: Bus, text: "Transportation" },
    //     { icon: Sparkles, text: "Entrance to Attraction and Activities" },
    //     { icon: Shield, text: "Travel Medical Insurance" },
    //     { icon: Award, text: "Certificate" },
    //     { icon: MapPin, text: "Miami, Orlando, New York" }
    //   ]
    // }
  ];

  return (
    <div className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/training.webp"
          alt="Astronaut in Space"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0000001A] via-[#000000CC] to-[#0000001A]"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:-mb-6 lg:-mb-8"
        >
          <h2 className="text-white text-md md:text-xl font-bold mb-2">
            NASA Summer
          </h2>
          <h1 className="text-4xl md:text-[6rem] lg:text-[10rem] font-extrabold text-white leading-tight">
            Training
          </h1>
        </motion.div>

        {/* Training Cards */}
        {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"> */}
        <div className="flex justify-center max-w-5xl mx-auto">
          {trainingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              //  className="group"
              className="group w-full max-w-md"
            >
              <div className="bg-[#11182766] backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-orange-500/50 transition-all duration-300">
                {/* Limited Tickets */}
                <div className="text-center mb-6">
                  <p className="text-gray-300 text-sm font-medium">
                    * Limited tickets available
                  </p>
                </div>

                {/* Duration */}
                <div className="text-center mb-8">
                  <div className="text-6xl md:text-7xl font-black text-white leading-none">
                    {pkg.duration}
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white/80 mt-2">
                    {pkg.unit}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center text-white/90 group-hover:text-white transition-colors"
                    >
                      <div className="w-6 h-6 mr-4 flex-shrink-0">
                        <feature.icon className="w-full h-full text-orange-500" />
                      </div>
                      <span className="text-sm md:text-base font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Terms Agreement */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer group/checkbox">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={index === 0 ? agreement1 : agreement2}
                        onChange={(e) => index === 0 ? setAgreement1(e.target.checked) : setAgreement2(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 ${
                        (index === 0 ? agreement1 : agreement2) 
                          ? 'bg-orange-500 border-orange-500' 
                          : 'border-white/50 group-hover/checkbox:border-orange-500'
                      } transition-colors flex items-center justify-center`}>
                        {(index === 0 ? agreement1 : agreement2) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-white/80 group-hover/checkbox:text-white transition-colors">
                      I agree to the{' '}
                      <span className="text-orange-500 hover:text-orange-400 transition-colors">
                        Terms of use
                      </span>
                    </span>
                  </label>
                </div>

                {/* Get Ticket Button */}
                <button 
                  onClick={() => {
                    if (index === 0 ? agreement1 : agreement2) {
                      handleAddToCart();
                    }
                  }}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center transition-all duration-300 ${
                    (index === 0 ? agreement1 : agreement2)
                      ? 'hover:from-orange-600 hover:to-red-600 hover:scale-105 hover:shadow-xl' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!(index === 0 ? agreement1 : agreement2)}
                >
                  <Rocket className="mr-3 h-5 w-5" />
                  GET TICKET
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;