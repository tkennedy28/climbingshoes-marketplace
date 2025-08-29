import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function OnePercentForClimbingPage() {
  const [selectedYear, setSelectedYear] = useState('2025');

  // EDITABLE CONTENT - Update these values as your program grows
  const programStats = {
    totalDonated: '$2,847',
    projectsFunded: 5,
    youthSupported: 23,
    cragsProtected: 8,
    startDate: 'January 2025'
  };

  // Current partners - add/remove as needed
  const partners = [
    {
      name: 'Access Fund',
      description: 'Protecting America\'s climbing areas',
      impact: 'Helped secure permanent access to 3 local crags',
      logo: '🏔️',
      website: 'https://www.accessfund.org'
    },
    {
      name: 'Youth Climbing Initiative',
      description: 'Making climbing accessible to underserved youth',
      impact: 'Sponsored 15 kids with gear and gym memberships',
      logo: '🧗‍♀️',
      website: '#'
    },
    {
      name: 'Local Crag Coalition',
      description: 'Maintaining and developing local climbing areas',
      impact: 'Funded bolt replacement at 5 popular routes',
      logo: '⚒️',
      website: '#'
    },
    {
      name: 'Climb for Change',
      description: 'Supporting diversity and inclusion in climbing',
      impact: 'Supported 2 BIPOC climbing meetups and clinics',
      logo: '🤝',
      website: '#'
    }
  ];

  // Impact stories - real examples work best
  const impactStories = [
    {
      title: 'New Routes for Everyone',
      date: 'March 2025',
      amount: '$500',
      description: 'Funded hardware for 10 new beginner-friendly routes at the local crag, making climbing more accessible to newcomers.',
      image: '🧗'
    },
    {
      title: 'Youth Summer Program',
      date: 'February 2025',
      amount: '$750',
      description: 'Provided climbing shoes and harnesses for 8 kids in the after-school climbing program who couldn\'t afford gear.',
      image: '👟'
    },
    {
      title: 'Trail Maintenance Day',
      date: 'January 2025',
      amount: '$300',
      description: 'Organized and funded a community trail day, improving access to popular bouldering areas.',
      image: '🌲'
    }
  ];

  // Future goals
  const futureGoals = [
    { goal: 'Sponsor a full youth climbing team', target: '$10,000', progress: 28 },
    { goal: 'Fund new climbing area development', target: '$5,000', progress: 45 },
    { goal: 'Support 50 youth climbers with gear', target: '$7,500', progress: 31 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>1% for Climbing - Giving Back | Climbing Shoe Shop</title>
        <meta name="description" content="Learn how every purchase on Climbing Shoe Shop supports climbing access, youth programs, and crag conservation through our 1% for Climbing initiative." />
      </Head>

      {/* Hero Section with Mountain Background */}
      <div className="bg-gradient-to-b from-green-700 to-green-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 w-full">
            <svg viewBox="0 0 1440 320" className="w-full">
              <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link href="/climbing-shoes" className="text-green-100 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              1% for Climbing
            </h1>
            <p className="text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Every shoe sold plants seeds for the future of climbing
            </p>
            <div className="inline-block bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <p className="text-lg">
                We donate <span className="font-bold text-2xl">1%</span> to protect climbing areas 
                and support youth climbers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      {/* <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{programStats.totalDonated}</div>
              <div className="text-gray-600 mt-2">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{programStats.projectsFunded}</div>
              <div className="text-gray-600 mt-2">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{programStats.youthSupported}</div>
              <div className="text-gray-600 mt-2">Youth Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{programStats.cragsProtected}</div>
              <div className="text-gray-600 mt-2">Crags Protected</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* How It Works */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👟</span>
              </div>
              <h3 className="font-bold text-lg mb-2">You Buy or Sell</h3>
              <p className="text-gray-600">
                Every transaction on our marketplace, whether buying or selling climbing shoes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="font-bold text-lg mb-2">We Donate 1%</h3>
              <p className="text-gray-600">
                Automatically calculated and set aside from every successful sale
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Climbing Thrives</h3>
              <p className="text-gray-600">
                Funds go directly to organizations protecting and growing our sport
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Our Commitment</h3>
            <p className="text-green-800">
              Since {programStats.startDate}, we've committed to donating 1% to climbing-related causes. 
              This isn't marketing—it's our way of ensuring the sport we love remains accessible and protected for 
              future generations. When you buy or sell through Climbing Shoe Shop, you're directly supporting 
              the climbing community.
            </p>
          </div>
        </div>
      </div>

      {/* Our Partners */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{partner.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">{partner.name}</h3>
                    <p className="text-gray-600 mb-3">{partner.description}</p>
                    {/* <div className="bg-green-50 border-l-4 border-green-500 p-3">
                      <p className="text-sm text-green-800">
                        <strong>Our Impact:</strong> {partner.impact}
                      </p>
                    </div> */}
                    {partner.website !== '#' && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" 
                         className="text-green-700 hover:text-green-800 text-sm mt-3 inline-block">
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Impact Stories */}
      {/* <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {impactStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-5xl">{story.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{story.title}</h3>
                    <span className="text-green-700 font-bold">{story.amount}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{story.description}</p>
                  <p className="text-sm text-gray-500">{story.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Future Goals */}
      {/* <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Future Goals</h2>
          
          <div className="space-y-6">
            {futureGoals.map((goal, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{goal.goal}</h3>
                  <span className="text-green-700 font-bold">{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{goal.progress}% funded</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* How You Can Help */}
      <div className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Every Transaction Makes a Difference</h2>
          
          {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl font-bold text-green-700 mb-2">$50 Sale</div>
              <div className="text-gray-600">= $0.50 donated</div>
              <p className="text-sm mt-2">Buys new holds for youth program</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl font-bold text-green-700 mb-2">$100 Sale</div>
              <div className="text-gray-600">= $1.00 donated</div>
              <p className="text-sm mt-2">Maintains 10ft of climbing trail</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-2xl font-bold text-green-700 mb-2">$200 Sale</div>
              <div className="text-gray-600">= $2.00 donated</div>
              <p className="text-sm mt-2">Replaces one bolt at local crag</p>
            </div>
          </div> */}

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Small actions add up to big impact. Every pair of shoes bought or sold through our marketplace 
            directly supports the climbing community we all love.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition">
              Start Shopping
            </Link>
            <Link href="/dashboard" className="bg-white text-green-700 border-2 border-green-700 px-8 py-3 rounded-lg hover:bg-green-50 transition">
              List Your Shoes
            </Link>
          </div>
        </div>
      </div>

      {/* Transparency Report */}
      {/* <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Transparency Promise</h2>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-gray-700 mb-6">
              We believe in complete transparency about where your contributions go. Every quarter, we publish 
              a detailed report showing exactly how much was donated and which projects were funded.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold mb-3">📊 Quarterly Reports</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Total sales and donations</li>
                  <li>• Partner organizations supported</li>
                  <li>• Specific projects funded</li>
                  <li>• Impact metrics and outcomes</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold mb-3">✉️ Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get quarterly impact reports and stories from the climbing community.
                </p>
                <button className="text-green-700 hover:text-green-800 font-medium text-sm">
                  Sign up for updates →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 text-green-100">
            Every climbing shoe transaction is a vote for accessible, protected climbing areas.
          </p>
          <Link href="/marketplace" className="inline-block bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition">
            Shop with Purpose
          </Link>
        </div>
      </div>

      {/* FAQ */}
      {/* <div className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Questions About 1% for Climbing</h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow">
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium">
                How is the 1% calculated?
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                We calculate 1% of the final sale price (excluding shipping) on every successful transaction. 
                This applies to both buyers and sellers equally.
              </div>
            </details>
            
            <details className="bg-white rounded-lg shadow">
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium">
                Can I choose where my contribution goes?
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                Currently, we distribute funds quarterly to our partner organizations based on current needs. 
                We're working on a feature to let users vote on future projects!
              </div>
            </details>
            
            <details className="bg-white rounded-lg shadow">
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium">
                Is this tax-deductible?
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                The 1% is donated by Climbing Shoe Shop, not individual users, so it's not tax-deductible 
                for buyers or sellers. We handle all the donation logistics.
              </div>
            </details>
            
            <details className="bg-white rounded-lg shadow">
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium">
                How do you choose partner organizations?
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                We partner with established 501(c)(3) organizations that have proven track records in 
                climbing access, youth programs, or conservation. All partners are vetted for impact and efficiency.
              </div>
            </details>
          </div>
        </div>
      </div> */}
    </div>
  );
}