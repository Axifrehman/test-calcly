import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Financial Advisor',
      company: 'Wells Financial',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Calcly World has revolutionized how I work with clients. The financial calculators are incredibly accurate and save me hours every week.',
      rating: 5,
      featured: true
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Research Scientist',
      company: 'MIT Labs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'The engineering and math tools are phenomenal. I use them daily for complex calculations and they never let me down.',
      rating: 5,
      featured: true
    },
    {
      name: 'Emily Rodriguez',
      role: 'Health Coach',
      company: 'FitLife Solutions',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'My clients love the health calculators. They\'re easy to use and provide instant, accurate results that help with their fitness goals.',
      rating: 5,
      featured: true
    },
    {
      name: 'James Wilson',
      role: 'Small Business Owner',
      company: 'Wilson Construction',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The business calculators have been a game-changer for my construction company. ROI, markup, and project cost calculations made simple.',
      rating: 5,
      featured: false
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Mathematics Professor',
      company: 'Stanford University',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      content: 'I recommend Calcly World to all my students. The math tools are pedagogically sound and help students understand complex concepts.',
      rating: 5,
      featured: false
    },
    {
      name: 'Robert Kumar',
      role: 'Investment Analyst',
      company: 'Goldman Sachs',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      content: 'Professional-grade financial calculators that deliver institutional-quality results. An essential tool for any serious investor.',
      rating: 5,
      featured: false
    }
  ];

  const stats = [
    { number: '2M+', label: 'Happy Users' },
    { number: '10M+', label: 'Calculations Done' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -translate-x-48 -translate-y-48 opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-48 translate-y-48 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professionals</span> Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            See what our users are saying about their experience with Calcly World
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.filter(t => t.featured).map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 mb-6">
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.filter(t => !t.featured).map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
                <div className="ml-auto flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
