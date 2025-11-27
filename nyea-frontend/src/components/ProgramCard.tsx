import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export interface ProgramCardProps {
  program: {
    id: number;
    title: string;
    slug?: string;
    description: string;
    price: string | number;
    formatted_price?: string;
    duration: string;
    category: string;
    image: string;
    features: string[];
    available_tickets?: number;
    sold_tickets?: number;
    remaining_tickets?: number;
    is_sold_out?: boolean;
  };
  onAddToCart?: (program: any) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onAddToCart }) => {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 hover:border-blue-400/30 transition-all duration-500 overflow-hidden">
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">PREMIUM</span>
          </div>
        </div>
        {/* Mission Duration & Availability */}
        <div className="absolute top-4 right-4 z-20 space-y-2">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
            <div className="flex items-center text-white text-xs font-bold">
              <Clock className="h-3 w-3 mr-1" />
              {program.duration}
            </div>
          </div>
          {/* Scarcity Indicator */}
          {program.available_tickets && program.remaining_tickets !== undefined && (
            <div className={`bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border ${
              program.remaining_tickets <= 5 ? 'border-red-400/50' : 
              program.remaining_tickets <= 15 ? 'border-orange-400/50' : 
              'border-green-400/50'
            }`}>
              <div className={`flex items-center text-xs font-bold ${
                program.remaining_tickets <= 5 ? 'text-red-400' : 
                program.remaining_tickets <= 15 ? 'text-orange-400' : 
                'text-green-400'
              }`}>
                🎟️ {program.remaining_tickets} left
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            style={{ aspectRatio: '4/3' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-blue-400/20 backdrop-blur-md text-blue-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-400/30">
              {program.category}
            </span>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
            {program.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{program.description}</p>
          <div className="mb-6">
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">PROGRAM FEATURES:</h4>
            <ul className="space-y-2">
              {program.features.slice(0, 3).map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                  <span className="text-blue-400 mr-3">▸</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between space-y-1 mb-4">
              <div className="text-gray-400 text-xs uppercase tracking-wider">PRICE</div>
              <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {program.formatted_price ? program.formatted_price : `$${typeof program.price === 'string' ? parseFloat(program.price).toLocaleString() : program.price}`}
              </span>
            </div>
            {/* Ticket Availability Bar */}
            {program.available_tickets && program.remaining_tickets !== undefined && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Availability</span>
                  <span className={`text-xs font-bold ${
                    program.remaining_tickets <= 5 ? 'text-red-400' : 
                    program.remaining_tickets <= 15 ? 'text-orange-400' : 
                    'text-green-400'
                  }`}>
                    {program.remaining_tickets} / {program.available_tickets} spots
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (program.sold_tickets || 0) / program.available_tickets > 0.8 ? 'bg-red-500' : 
                      (program.sold_tickets || 0) / program.available_tickets > 0.6 ? 'bg-orange-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(((program.sold_tickets || 0) / program.available_tickets) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {onAddToCart && !program.is_sold_out && (
                <button
                  onClick={() => onAddToCart(program)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border border-gray-600 hover:border-blue-400/50 flex-1 sm:flex-none"
                >
                  ADD TO CART
                </button>
              )}
              {onAddToCart && program.is_sold_out && (
                <button
                  disabled
                  className="bg-red-800/50 text-red-400 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider border border-red-600/50 flex-1 sm:flex-none cursor-not-allowed"
                >
                  SOLD OUT
                </button>
              )}
              <Link
                to={program.slug ? `/programs/${program.slug}` : `/programs/${program.id}`}
                className="bg-gradient-to-r from-[#1f2444] via-[#2d3d66] to-[#9f162e] text-white px-3 py-2 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex-1 sm:flex-none text-center"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard; 