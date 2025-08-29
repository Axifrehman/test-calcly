import { useState, useEffect } from 'react';
import { Calculator, Menu, X, Search, Star, Zap } from 'lucide-react';
import MegaMenu from '@/react-app/components/MegaMenu';

interface HeaderProps {
  onCategorySelect?: (category: string, tool?: string) => void;
  currentCategory?: string;
}

export default function Header({ onCategorySelect, currentCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'financial', name: 'Financial', icon: '💰', count: 200 },
    { id: 'health', name: 'Health', icon: '🏥', count: 150 },
    { id: 'math', name: 'Math', icon: '📐', count: 180 },
    { id: 'conversion', name: 'Conversion', icon: '🔄', count: 120 },
    { id: 'engineering', name: 'Engineering', icon: '⚙️', count: 200 },
    { id: 'business', name: 'Business', icon: '📊', count: 150 },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Calculator className="w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Calcly World
              </h1>
              <div className="flex items-center space-x-2 -mt-1">
                <p className="text-xs font-semibold text-gray-600">Ultimate Calculator Hub</p>
                <div className="flex items-center space-x-1 bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-0.5 rounded-full">
                  <Zap className="w-2.5 h-2.5 text-green-600" />
                  <span className="text-xs font-bold text-green-700">1000+ Tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Mega Menu */}
          <div className="hidden lg:block">
            <MegaMenu onCategorySelect={onCategorySelect} />
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center relative">
            <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="flex items-center px-5 py-3 w-80">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search 1000+ calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm font-medium placeholder-gray-500"
                />
                <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                  ⌘K
                </div>
              </div>
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-2 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-3 py-2">Quick Results</div>
                    {['BMI Calculator', 'Loan Calculator', 'Percentage Calculator'].map((tool, i) => (
                      <div key={i} className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-b-2xl shadow-2xl backdrop-blur-xl">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search calculators..."
                    className="bg-transparent outline-none flex-1 text-sm"
                  />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Calculator Categories</h3>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategorySelect?.(category.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        currentCategory === category.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-2 border-blue-200' 
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-semibold">{category.name}</span>
                      </div>
                      <div className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-gray-600">
                        {category.count}+ tools
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Access</h3>
                <div className="flex flex-wrap gap-2">
                  {['BMI', 'Loan EMI', 'Percentage', 'Currency'].map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
