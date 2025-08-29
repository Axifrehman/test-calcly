import { Shield, Zap, Users, Globe, Clock, CheckCircle } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant results with our optimized calculation engines. No waiting, no delays.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your data is protected with enterprise-grade security. We never store personal information.',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      icon: Users,
      title: 'User Friendly',
      description: 'Intuitive interfaces designed for both beginners and professionals. Easy to use, hard to put down.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide, 24/7. Multi-language support and region-specific calculations.',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Clock,
      title: 'Always Updated',
      description: 'Our tools are constantly updated with the latest formulas, rates, and regulations.',
      gradient: 'from-red-400 to-pink-500',
    },
    {
      icon: CheckCircle,
      title: 'Accurate Results',
      description: '99.9% accuracy guaranteed. Trusted by millions of users and verified by experts.',
      gradient: 'from-teal-400 to-green-500',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calcly World</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most comprehensive calculation platform with features that matter to you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
