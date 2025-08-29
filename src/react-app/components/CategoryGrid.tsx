import { contentCategories } from '@/shared/types';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export default function CategoryGrid({ onCategorySelect, selectedCategory }: CategoryGridProps) {
  const categories = Object.entries(contentCategories).map(([key, value]) => ({
    id: key,
    ...value,
    icon: getCategoryIcon(key),
    color: getCategoryColor(key),
    tools: getCategoryToolCount(key)
  }));

  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      financial: '💰',
      health: '🏥',
      math: '📐',
      conversion: '🔄',
      engineering: '⚙️',
      business: '📊'
    };
    return icons[category] || '🧮';
  }

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      financial: 'from-green-500 to-emerald-600',
      health: 'from-red-500 to-pink-600',
      math: 'from-blue-500 to-indigo-600',
      conversion: 'from-purple-500 to-violet-600',
      engineering: 'from-orange-500 to-amber-600',
      business: 'from-gray-500 to-slate-600'
    };
    return colors[category] || 'from-blue-500 to-purple-600';
  }

  function getCategoryToolCount(category: string) {
    const counts: Record<string, number> = {
      financial: 120,
      health: 85,
      math: 200,
      conversion: 150,
      engineering: 95,
      business: 110
    };
    return counts[category] || 50;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular Categories
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Calculator Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful tools across diverse industries. Each category contains 
            dozens of specialized calculators designed by experts.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
              onClick={() => onCategorySelect?.(category.id)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Category Icon */}
              <div className="relative z-10 mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
              </div>

              {/* Category Info */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Tool Count */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-500">
                    {category.tools}+ Tools Available
                  </span>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                    <span className="mr-1">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Subcategories Preview */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Popular Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs rounded-full">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            View All Categories
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
