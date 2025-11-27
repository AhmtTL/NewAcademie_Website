import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Users,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
// import logo from '../assets/logo-white.svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // const programs = [
  //   { name: 'Academic Consulting', path: '/programs/academic-consulting' },
  //   { name: 'Career Consulting', path: '/programs/career-consulting' },
  //   { name: 'Mentorship', path: '/programs/mentorship' },
  //   { name: 'Cambridge Training', path: '/programs/cambridge-training' },
  //   { name: 'Summer Schools', path: '/programs/summer-schools' },
  //   { name: 'Project Olympiads', path: '/programs/project-olympiads' },
  //   { name: 'Experiential Learning', path: '/programs/experiential-learning' },
  //   { name: 'Model UN', path: '/programs/model-un' },
  //   { name: 'Pre-College Programs', path: '/programs/pre-college' },
  // ];

  return (
    <motion.header
      className="relative bg-[#1f2444] shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Modern Logo */}
              <img
                src="/images/logo-icon-new.svg"
                // src={logo}
                alt="NY Empire Academy Logo"
                className="h-12 w-auto mr-3 md:mr-4"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300 font-semibold text-sm">
                Home
              </Link>
            </motion.div> */}

            {/* Programs Dropdown */}
            <div
              className=""
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <motion.button
                className="flex items-center text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300 font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Programs
                <motion.div
                  animate={{ rotate: isProgramsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="ml-1 h-4 w-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isProgramsOpen && (
                  <motion.div
                    className="absolute left-1/2 top-full mt-3 w-[900px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                    style={{ transformOrigin: "50% 0%" }}
                    initial={{ opacity: 0, y: 8, scale: 0.98, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, y: 8, scale: 0.98, x: "-50%" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Three Column Layout */}
                    <div className="grid grid-cols-3 divide-x divide-gray-200/30">
                      {/* Left Column - Browse by Category */}
                      <div className="p-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-200/50 pb-2">
                          Browse by Category
                        </h3>
                        <div className="space-y-1">
                          <Link
                            to="/programs"
                            className="block text-[#9f162e] hover:text-[#7a1020] font-semibold text-sm py-2 px-3 rounded-lg hover:bg-red-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            VIEW ALL PROGRAMS
                          </Link>
                          <Link
                            to="/programs/academic-consulting"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Academic Consulting
                          </Link>
                          <Link
                            to="/programs/career-consulting"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Career Consulting
                          </Link>
                          <Link
                            to="/programs/mentorship"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Mentorship
                          </Link>
                          <Link
                            to="/programs/cambridge-training"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Cambridge Training
                          </Link>
                          <Link
                            to="/programs/pre-college"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Pre-College Programs
                          </Link>
                        </div>
                      </div>

                      {/* Middle Column - Featured Programs */}
                      <div className="p-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-200/50 pb-2">
                          Featured Programs
                        </h3>
                        <div className="space-y-1">
                          <Link
                            to="/elite-workshops"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200 font-medium"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Elite Workshops
                          </Link>

                          {/* Harvard Workshop Links - Featured */}
                          <Link
                            to="/workshop-booking/leadership-negotiation-communication"
                            className="block text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 text-sm py-2 px-3 rounded-lg transition-all duration-200 font-semibold border border-blue-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            👑Ivy League Negotiation Workshop.
                          </Link>

                          <Link
                            to="/harvard-future-ceo"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Future CEO Training Camp
                          </Link>
                          {/* <Link 
                            to="/workshop-booking/cambridge-leadership-workshop" 
                            className="block text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 text-sm py-2 px-3 rounded-lg transition-all duration-200 font-semibold border border-purple-200" 
                            onClick={() => setIsProgramsOpen(false)}
                          >
                             Cambridge Leadership Workshop
                          </Link> */}

                          <Link
                            to="/programs/summer-schools"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Summer Schools
                          </Link>
                          <Link
                            to="/programs/project-olympiads"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Project Olympiads
                          </Link>
                          <Link
                            to="/programs/model-un"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Model UN
                          </Link>
                          <Link
                            to="/programs/experiential-learning"
                            className="block text-gray-700 hover:text-[#9f162e] text-sm py-2 px-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            Experiential Learning
                          </Link>
                        </div>
                      </div>

                      {/* Right Column - CTA */}
                      <div className="p-6 bg-gradient-to-br from-[#1f2444] via-[#2a3154] to-[#9f162e] text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-red-600/20 backdrop-blur-sm"></div>
                        <div className="relative h-full flex flex-col justify-center">
                          <h3 className="text-lg font-bold mb-3 leading-tight">
                            Ready to get started?
                          </h3>
                          <p className="text-sm mb-5 text-white/90 leading-relaxed">
                            Get in touch with our expert team to discuss your
                            educational goals
                          </p>
                          <Link
                            to="/contact"
                            className="inline-block bg-white text-[#1f2444] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105"
                            onClick={() => setIsProgramsOpen(false)}
                          >
                            CONTACT US
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/about"
                className="text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300 font-semibold text-sm"
              >
                About
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/nasa-programs"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md"
              >
                NASA
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/contact"
                className="text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300 font-semibold text-sm flex items-center"
              >
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative p-2 text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <motion.span
                    className="absolute top-[1rem] right-0 bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300"
                  >
                    <User className="h-6 w-6" />
                  </Link>
                </motion.div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-[#FFFFFFB2] hover:text-[#FFFFFF]"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#FFFFFFB2] hover:text-[#1f2444]"
                >
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button variant="transparent" size="sm" className="shadow-md">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative p-2 text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-all duration-300"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <motion.span
                    className="absolute top-[1rem] right-0 bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-6 border-t border-[#FFFFFFB2]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="h-4 w-4 mr-3" />
                    Home
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    to="/about"
                    className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="h-4 w-4 mr-3" />
                    About
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/programs"
                    className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <GraduationCap className="h-4 w-4 mr-3" />
                    Programs
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/workshop-booking/leadership-negotiation-communication"
                    className="block text-[#9f162e] hover:text-blue-700 transition-colors font-bold py-2 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ivy League Negotiation Workshop
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/harvard-future-ceo"
                    className="block text-blue-600 hover:text-blue-700 transition-colors font-bold py-2 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Harvard Future CEO
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/nasa-programs"
                    className="block text-orange-600 hover:text-orange-700 transition-colors font-bold py-2 pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NASA Programs
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    to="/contact"
                    className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    Contact
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/cart"
                    className="flex items-center text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Cart ({getTotalItems()})
                  </Link>
                </motion.div>

                {user ? (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Link
                        to="/dashboard"
                        className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block text-left text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2 w-full"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Link
                        to="/signin"
                        className="block text-[#FFFFFFB2] hover:text-[#FFFFFF] transition-colors font-semibold py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        to="/signup"
                        className="inline-block bg-transparent border border-white text-white hover:bg-white hover:text-[#1f2444] px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
