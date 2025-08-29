import { Target, Users, Award, Lightbulb } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every calculation is meticulously crafted for maximum accuracy and reliability.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Built by professionals, for professionals. Your feedback shapes our tools.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Award-winning platform recognized by industry leaders worldwide.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge features and AI-powered capabilities.'
    }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Former Goldman Sachs analyst with 15 years in fintech'
    },
    {
      name: 'Dr. Maria Santos',
      role: 'Head of Mathematics',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'PhD in Applied Mathematics from MIT, 20+ published papers'
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Ex-Google engineer specializing in high-performance computing'
    },
    {
      name: 'Sophie Chen',
      role: 'UX Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Design lead at Airbnb, expert in user-centered design'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calcly World</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize access to professional-grade calculation tools, 
            making complex computations simple and accessible to everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Founded in 2020 by a team of mathematicians, engineers, and financial experts, 
                Calcly World was born from a simple observation: most online calculators were 
                either too basic or too complicated.
              </p>
              <p className="text-lg leading-relaxed">
                We believed there was a better way. A platform that could offer institutional-grade 
                calculations with consumer-friendly interfaces. Today, we serve over 2 million users 
                across 150+ countries.
              </p>
              <p className="text-lg leading-relaxed">
                Our commitment to accuracy, speed, and user experience has made us the go-to 
                destination for professionals and students alike.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Team working"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">Tools & Calculators</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">2M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-600">The experts behind Calcly World</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
