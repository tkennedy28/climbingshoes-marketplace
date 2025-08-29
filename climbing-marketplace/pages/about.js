import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Tom Kennedy',
      role: 'Founder',
      bio: 'Climber for 15+ years, passionate about making quality gear accessible to everyone.',
      experience: 'Over 7 years in the industry',
      favorite: 'Scarpa Instinct VSR',
      image: '/team/alex.jpg'
    },
    {
      name: 'Sarah Martinez',
      role: 'Head of Community',
      bio: 'Dedicated to building a supportive climbing community and connecting buyers with sellers.',
      experience: 'V8 Boulder, Trad Enthusiast',
      favorite: 'Scarpa Instinct VS',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Gear Expert',
      bio: 'Former climbing shop manager with deep knowledge of shoe construction and fit.',
      experience: '20 years in the industry',
      favorite: 'Evolv Shaman',
      image: '/team/mike.jpg'
    }
  ];

  const milestones = [
    { year: 'June 2025', event: 'Founded with a mission to reduce gear waste', icon: '🌱' },
    { year: 'August 2025', event: 'Launched marketplace with 500+ climbers', icon: '🚀' },
    { year: 'June 2025', event: 'Partnered with local climbing gyms', icon: '🤝' },
    { year: '2027', event: '10,000+ shoes found new homes', icon: '🎯' }
  ];

  const values = [
    {
      title: 'Sustainability',
      description: 'Every reused shoe is one less in a landfill. We believe in extending gear life.',
      icon: '♻️'
    },
    {
      title: 'Community',
      description: 'Climbers helping climbers. We foster trust and connection in our marketplace.',
      icon: '🤝'
    },
    {
      title: 'Accessibility',
      description: 'Quality climbing gear should be accessible to everyone, regardless of budget.',
      icon: '🎯'
    },
    {
      title: 'Transparency',
      description: 'Honest listings, fair prices, and clear communication between buyers and sellers.',
      icon: '💎'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Active Climbers' },
    { number: '8,500+', label: 'Shoes Sold' },
    { number: '92%', label: 'Satisfaction Rate' },
    { number: '$450K', label: 'Saved by Community' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Climbing Shoe Shop | Our Story & Mission</title>
        <meta name="description" content="Learn about Climbing Shoe Shop's mission to make climbing gear more accessible and sustainable through our peer-to-peer marketplace." />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/climbing-shoes" className="text-amber-100 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About The Climbing Shoe Shop</h1>
          <p className="text-xl text-amber-50 max-w-3xl">
            We're climbers on a mission to make quality gear accessible to everyone while reducing waste in our community!
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Climbing Shoe Shop exists to connect climbers with the gear they need at prices they can afford. 
            We believe that financial barriers shouldn't keep anyone from pursuing their climbing passion. 
            By creating a trusted marketplace for buying and selling used climbing shoes, we're making the sport 
            more accessible while promoting sustainability in our community.
          </p>
        </div>
      </div>

       {/* Stats Section */}
      {/* <div className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-700">{stat.number}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Story Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  The Climbing Shoe Shop started in a climbing gym in Ohio. As lifelong climbers and local outfitter employees, 
                  we noticed two problems: new climbers struggling to afford quality gear, and experienced 
                  climbers with closets full of barely-worn shoes.
                </p>
                <p className="mb-4">
                  We built this marketplace to solve both problems. Now, climbers can easily sell shoes 
                  they've outgrown or no longer use, while others can find quality gear at fair prices.
                </p>
                <p>
                  What started as a simple idea we hope will grow into a thriving community of climbers 
                  who believe in sharing resources and supporting each other's climbing journey.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="font-bold text-xl mb-6">Our Journey</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-4">{milestone.icon}</span>
                    <div>
                      <div className="font-semibold text-amber-700">{milestone.year}</div>
                      <div className="text-gray-600">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-amber-800">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-amber-700 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-3">{member.bio}</p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">🧗 {member.experience}</p>
                  <p>👟 Favorite: {member.favorite}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Community Section */}
      <div className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're looking for your first pair of climbing shoes or selling your collection, 
            you're part of something bigger. Every transaction supports a climber and reduces waste.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition">
              Browse Marketplace
            </Link>
            <Link href="/dashboard" className="bg-white text-amber-700 border-2 border-amber-700 px-6 py-3 rounded-lg hover:bg-amber-50 transition">
              Start Selling
            </Link>
            <Link href="/how-it-works" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
              How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Local Gyms</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Gear Shops</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Climbing Clubs</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-20 flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Conservation Groups</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
          <p className="text-xl mb-8 text-amber-50">
            Start buying and selling climbing shoes today. Be part of a community that climbs together.
          </p>
          <Link href="/auth" className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}