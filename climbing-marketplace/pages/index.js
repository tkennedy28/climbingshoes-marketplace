import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function GearWallLanding() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Thanks for joining our community!');
    setEmail('');
  };

  return (
    <>
      <Head>
        <title>The Gear Wall - Specialized Outdoor Marketplaces</title>
        <meta name="description" content="The Gear Wall connects outdoor enthusiasts through specialized marketplaces. Starting with The Climbing Shoe Shop and expanding to all outdoor gear." />
        <meta name="keywords" content="outdoor gear marketplace, climbing shoes, ski swap, used outdoor equipment, buy sell gear" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-zinc-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-black text-gray-900">THE GEAR WALL</div>
              </div>
              <nav className="flex items-center gap-6">
                <button 
                  onClick={() => router.push('/about')}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => router.push('/signup')}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-16 pb-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Specialized Marketplaces for Outdoor Gear
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              The Gear Wall is building focused marketplaces for every outdoor community. 
              Deep expertise, trusted transactions, better gear connections.
            </p>
          </div>
        </section>

        {/* Marketplace Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* The Climbing Shoe Shop - Active */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-1">
                    <div className="bg-white p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                          NOW LIVE
                        </span>
                        <span className="text-4xl">🧗</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        The Climbing Shoe Shop
                      </h3>
                      <p className="text-gray-600 mb-6 min-h-[48px]">
                        The trusted marketplace for climbing shoes. Buy and sell from La Sportiva to Scarpa, 
                        new to needs-resole.
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>500+ active listings</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>Detailed condition grading</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>Size conversion charts</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => router.push('/climbing-shoes')}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Enter Marketplace →
                      </button>
                      
                      <p className="text-xs text-green-600 mt-4 text-center font-medium">
                        1% of sales donated to Access Fund
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ski Swap - Coming Soon */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-1">
                    <div className="bg-white p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                          COMING FALL 2025
                        </span>
                        <span className="text-4xl">⛷️</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Ski Swap Online
                      </h3>
                      <p className="text-gray-600 mb-6 min-h-[48px]">
                        The year-round ski swap. Buy and sell skis, boots, and winter gear 
                        without waiting for the annual event.
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="text-gray-400">○</span>
                          <span>Ski & snowboard gear</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="text-gray-400">○</span>
                          <span>Binding compatibility checker</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="text-gray-400">○</span>
                          <span>Local pickup options</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setEmail('')}
                        className="w-full bg-gray-100 text-gray-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Get Notified →
                      </button>
                      
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        Join 200+ waiting for launch
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Future Marketplaces */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">More Specialized Marketplaces Coming Soon</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/60 backdrop-blur rounded-lg p-4 border border-gray-200">
                  <span className="text-2xl mb-2 block">🏔️</span>
                  <p className="text-sm font-medium text-gray-700">Mountain Gear</p>
                  <p className="text-xs text-gray-500">2025</p>
                </div>
                <div className="bg-white/60 backdrop-blur rounded-lg p-4 border border-gray-200">
                  <span className="text-2xl mb-2 block">🚴</span>
                  <p className="text-sm font-medium text-gray-700">Bike Exchange</p>
                  <p className="text-xs text-gray-500">2025</p>
                </div>
                <div className="bg-white/60 backdrop-blur rounded-lg p-4 border border-gray-200">
                  <span className="text-2xl mb-2 block">🏃</span>
                  <p className="text-sm font-medium text-gray-700">Trail Running</p>
                  <p className="text-xs text-gray-500">2026</p>
                </div>
                <div className="bg-white/60 backdrop-blur rounded-lg p-4 border border-gray-200">
                  <span className="text-2xl mb-2 block">🛶</span>
                  <p className="text-sm font-medium text-gray-700">Paddle Sports</p>
                  <p className="text-xs text-gray-500">2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Specialized Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Why Specialized Marketplaces?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Generic marketplaces treat climbing shoes like any other shoe. 
              We build marketplaces that understand the gear, the community, and what matters.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Deep Expertise</h3>
                  <p className="text-gray-600 text-sm">
                    Condition grading specific to each sport. Size charts for every brand. 
                    Features that actually matter to the community.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Trusted Community</h3>
                  <p className="text-gray-600 text-sm">
                    Buyers and sellers who know the gear. Ratings from people who understand 
                    what "needs resole" actually means.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Better Discovery</h3>
                  <p className="text-gray-600 text-sm">
                    Search and filters designed for each sport. Find exactly what you need 
                    without wading through irrelevant listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Growing the Outdoor Marketplace Ecosystem</h3>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">2,000+</p>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">$75K+</p>
                  <p className="text-gray-600">Gear Traded</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">1%</p>
                  <p className="text-gray-600">To Environmental Causes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">5</p>
                  <p className="text-gray-600">Marketplaces by 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Get Early Access to New Marketplaces
            </h3>
            <p className="text-gray-600 mb-6">
              Be first to know when we launch your sport's marketplace.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold mb-4">THE GEAR WALL</h4>
                <p className="text-gray-400 text-sm">
                  Building specialized marketplaces for outdoor communities.
                </p>
              </div>
              
              <div>
                <h5 className="font-bold mb-4">Active Marketplaces</h5>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="/climbing-shoes" className="hover:text-white transition-colors">
                      The Climbing Shoe Shop
                    </a>
                  </li>
                  <li className="opacity-60">Ski Swap Online (Winter 2025)</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold mb-4">Company</h5>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="/giving-back" className="hover:text-white transition-colors">Environmental Impact</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold mb-4">Resources</h5>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/seller-guide" className="hover:text-white transition-colors">Seller Guide</a></li>
                  <li><a href="/safety" className="hover:text-white transition-colors">Trust & Safety</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>© 2025 The Gear Wall, LLC. All rights reserved.</p>
              <p className="mt-2">Each marketplace operates independently with specialized features for its community.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}