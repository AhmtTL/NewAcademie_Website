import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, DollarSign } from 'lucide-react';
import { useCart } from '../context/CartContext';
import apiClient from '../services/api';
import ProgramCard from '../components/ProgramCard';

const Programs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const { addToCart } = useCart();

  const categories = [
    'all',
    'Academic Consulting',
    'Career Consulting',
    'Mentorship',
    'Academic Excellence',
    'STEM Programs',
    'Professional Development',
    'Youth Programs',
    'Test Preparation',
    'Competition Programs',
    'Experiential Learning',
    'Leadership Programs',
    'Pre-College Programs'
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.getPrograms(page);
        setPrograms(response.data.data || []);
        setPagination(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load programs.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [page]);

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    let matchesPrice = true;
    const price = typeof program.price === 'string' ? parseFloat(program.price) : program.price;
    if (priceRange === 'under-1000') matchesPrice = price < 1000;
    else if (priceRange === '1000-2000') matchesPrice = price >= 1000 && price <= 2000;
    else if (priceRange === 'over-2000') matchesPrice = price > 2000;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Clock className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-16">
      {/* Hero Background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
          alt="Elite operations center"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
            ACADEMIC EXCELLENCE
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              PROGRAMS
            </span>
          </h1>
          <p className="text-sm md:text-md lg:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover comprehensive educational programs designed for academic excellence and career success. 
            Each program is carefully crafted for transformational learning experiences.
          </p>
        </div>
        {/* Program Filters */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-blue-400/20 p-4 md:p-6 lg:p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-2">PROGRAM FILTERS</h3>
            <p className="text-gray-400 text-sm md:text-base">Find the perfect program for your educational goals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-medium text-sm md:text-md"
              />
            </div>
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5 z-10" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none font-medium text-sm md:text-md"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category === 'all' ? 'ALL PROGRAMS' : category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            {/* Price Filter */}
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5 z-10" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none font-medium text-sm md:text-md"
              >
                <option value="all" className="bg-gray-800">ALL PRICES</option>
                <option value="under-1000" className="bg-gray-800">UNDER $1,000</option>
                <option value="1000-2000" className="bg-gray-800">$1,000 - $2,000</option>
                <option value="over-2000" className="bg-gray-800">OVER $2,000</option>
              </select>
            </div>
          </div>
        </div>
        {/* Program Status */}
        <div className="mb-8">
          <div className="bg-blue-400/10 backdrop-blur-md rounded-xl border border-blue-400/20 p-4">
            <p className="text-blue-400 font-bold uppercase tracking-wider text-center text-xs md:text-sm lg:text-md">
              <span className="text-white">{filteredPrograms.length}</span> PROGRAMS AVAILABLE • 
              <span className="text-white">{pagination?.total || 0}</span> TOTAL PROGRAMS
            </p>
          </div>
        </div>
        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPrograms.map((program, index) => (
            <ProgramCard key={program.id} program={program} onAddToCart={addToCart} />
          ))}
        </div>
        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/20 p-8 md:p-12 max-w-2xl mx-auto">
              <div className="text-4xl md:text-6xl mb-6">⚠️</div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase tracking-wider">NO PROGRAMS FOUND</h3>
              <p className="text-gray-400 text-base md:text-lg mb-8">No programs match your current search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black uppercase tracking-wider hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-300 shadow-lg text-sm md:text-base"
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        )}
        {/* Pagination Controls */}
        {pagination && (
          <div className="flex justify-center mt-16">
            <nav className="inline-flex rounded-xl shadow-lg bg-black/60 backdrop-blur-md border border-blue-400/20 px-2 py-2 space-x-2" aria-label="Pagination">
              {pagination.links && pagination.links.map((link: any, idx: number) => {
                if (!link.url) return null;
                const isPrev = link.label.includes('Previous');
                const isNext = link.label.includes('Next');
                return (
                  <button
                    key={idx}
                    className={`
                      px-5 py-3 font-bold text-sm rounded-xl transition-all duration-200
                      border-none focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${link.active
                        ? 'bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white shadow-xl scale-105'
                        : 'bg-white/90 text-blue-700 hover:bg-blue-50 hover:text-blue-900'}
                      ${isPrev || isNext ? 'font-black uppercase tracking-wider' : ''}
                    `}
                    disabled={link.active}
                    onClick={() => {
                      const url = new URL(link.url);
                      const pageParam = url.searchParams.get('page');
                      if (pageParam) setPage(Number(pageParam));
                    }}
                  >
                    {isPrev && <span className="mr-2">&larr;</span>}
                    {isNext && <span className="ml-2">&rarr;</span>}
                    {link.label.replace(/&laquo;|&raquo;|Previous|Next/g, '').trim() || (isPrev ? 'Prev' : isNext ? 'Next' : link.label)}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
        
        {/* Custom Programs CTA Section */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 backdrop-blur-md rounded-3xl border border-blue-400/20 p-6 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25v50L50 100L6.7 75V25z' fill='none' stroke='%236366f1' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              }}></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-blue-400/20 backdrop-blur-md rounded-full text-blue-400 text-xs md:text-sm lg:text-md font-bold mb-6 border border-blue-400/30 uppercase tracking-wider">
                <Search className="w-4 h-4 mr-2" />
                CUSTOM PROGRAMS
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                NEED SPECIALIZED
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  PROGRAMS?
                </span>
              </h2>
              <p className="text-sm md:text-md lg:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                We design custom educational programs for institutions and organizations. 
                Contact our academic team to discuss your specific educational requirements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-sm md:text-lg uppercase tracking-wider hover:from-[#1f2444] hover:to-[#9f162e] transition-all duration-300 shadow-2xl"
              >
                CONTACT US
                <Search className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs; 