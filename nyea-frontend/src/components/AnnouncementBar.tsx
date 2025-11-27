import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white py-1.5 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="text-xs md:text-sm font-medium">
          Upcoming: Ivy League Negotiation Workshop. 
          <Link 
            to="/workshop-booking/leadership-negotiation-communication" 
            className="ml-2 font-bold underline hover:text-gray-200 transition-colors duration-200"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
