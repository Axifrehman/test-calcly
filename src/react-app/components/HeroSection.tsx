import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { value: '1000+', label: 'Calculators & Tools' },
    { value: '50+', label: 'Categories' },
    { value: '1M+', label: 'Calculations Made' },
    { value: '24/7', label: 'Available' }
  ];

  const features = [
    { icon: Calculator, text: 'Advanced calculators for every need' },
    { icon: Zap, text: 'Lightning-fast calculations' },
    { icon: Target, text: 'Precise and accurate results' },
    { icon: Sparkles, text: 'AI-powered smart features' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Ultimate Calculator & Tools Hub
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calcly World
            </span>
            <br />
            <span className="text-gray-700">Your One-Stop</span>
            <br />
            <span className="text-gray-700">Calculation Hub</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access 1000+ professional calculators, converters, and AI-powered tools. 
            From financial planning to engineering calculations, we've got you covered.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={onGetStarted}
            className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            Browse Tools
          </button>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-500 ${
                index === currentStat 
                  ? 'bg-white shadow-lg scale-105 border border-blue-200' 
                  : 'bg-white/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-gray-700 font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
