import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ResolersPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Comprehensive resoler data
  const resolers = [
    {
      id: 1,
      name: "Rock & Resole",
      region: "west",
      state: "Colorado",
      city: "Boulder",
      address: "1234 Climbing Way, Boulder, CO 80301",
      phone: "(303) 555-0100",
      email: "info@rockandresole.com",
      website: "https://rockandresole.com",
      turnaround: "2-3 weeks",
      priceRange: "$40-65",
      specialties: ["Performance", "Crack Climbing", "Approach Shoes"],
      brands: ["Vibram XS Edge", "Vibram XS Grip2", "Stealth C4", "Stealth HF"],
      services: [
        "Half sole",
        "Full sole", 
        "Rand repair",
        "Toe cap",
        "Custom modifications"
      ],
      shipping: true,
      localDropoff: true,
      description: "Boulder's premier resoler with 20+ years experience. Known for precise edging work and fast turnaround times.",
      rating: 4.9,
      reviews: 127,
      featured: true,
      instagram: "@rockandresole",
      tips: "They offer 10% off for 3+ pairs. Great for aggressive downturns."
    },
    {
      id: 2,
      name: "Yosemite Bum Resoles",
      region: "west",
      state: "California", 
      city: "Bishop",
      address: "567 Sierra St, Bishop, CA 93514",
      phone: "(760) 555-0200",
      email: "resole@yosemitebum.com",
      website: "https://yosemitebum.com",
      turnaround: "3-4 weeks",
      priceRange: "$45-70",
      specialties: ["Trad Climbing", "Big Wall", "Approach Shoes"],
      brands: ["Vibram XS Edge", "Stealth C4", "Stealth Phantom"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair", 
        "Heel cup repair",
        "Velcro replacement"
      ],
      shipping: true,
      localDropoff: true,
      description: "Trusted by Yosemite climbers since 1995. Specialists in durable resoles for granite climbing.",
      rating: 4.8,
      reviews: 89,
      featured: true,
      instagram: "@yosemitebum",
      tips: "Ask about their 'bomber package' for big wall shoes - extra durable."
    },
    {
      id: 3,
      name: "The Rubber Room",
      region: "west",
      state: "Utah",
      city: "Salt Lake City",
      address: "890 Desert Rd, Salt Lake City, UT 84101",
      phone: "(801) 555-0300",
      email: "info@rubberroom.com",
      website: "https://rubberroom.com",
      turnaround: "2-3 weeks",
      priceRange: "$35-60",
      specialties: ["Sport Climbing", "Bouldering", "Competition"],
      brands: ["Vibram XS Grip2", "Stealth HF", "Stealth Mi6"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Toe rubber",
        "Performance tuning"
      ],
      shipping: true,
      localDropoff: true,
      description: "High-performance resoles with options for custom rubber selection. Popular with competition climbers.",
      rating: 4.7,
      reviews: 156,
      featured: false,
      instagram: "@rubberroomresoles",
      tips: "They can do split rubber - different compounds for toe and heel."
    },
    {
      id: 4,
      name: "Sendtown Resoles",
      region: "southeast",
      state: "Tennessee",
      city: "Chattanooga",
      address: "123 Sandstone Ave, Chattanooga, TN 37402",
      phone: "(423) 555-0400",
      email: "resole@sendtown.com",
      website: "https://sendtown.com",
      turnaround: "3-4 weeks",
      priceRange: "$40-65",
      specialties: ["Sport Climbing", "Bouldering", "Sandstone"],
      brands: ["Vibram XS Edge", "Vibram XS Grip", "Stealth HF"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Toe cap",
        "Heel tension adjustment"
      ],
      shipping: true,
      localDropoff: true,
      description: "Southeast's go-to resoler. Experts in maintaining aggressive downturns and heel tension.",
      rating: 4.8,
      reviews: 203,
      featured: true,
      instagram: "@sendtownresoles",
      tips: "Great for La Sportiva and Scarpa models. They maintain the original last shape well."
    },
    {
      id: 5,
      name: "Northeast Climbing Repairs",
      region: "northeast",
      state: "New Hampshire",
      city: "North Conway",
      address: "456 Granite Way, North Conway, NH 03860",
      phone: "(603) 555-0500",
      email: "info@neclimbingrepairs.com",
      website: "https://neclimbingrepairs.com",
      turnaround: "2-3 weeks",
      priceRange: "$45-70",
      specialties: ["Trad Climbing", "Ice Climbing", "Alpine"],
      brands: ["Vibram XS Edge", "Stealth C4", "Vibram Mont"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Boot modifications",
        "Approach shoe repair"
      ],
      shipping: true,
      localDropoff: true,
      description: "New England's trusted resoler. Also services approach shoes and light mountaineering boots.",
      rating: 4.6,
      reviews: 94,
      featured: false,
      instagram: "@neclimbingrepairs",
      tips: "They do approach shoes and can add sticky rubber to approach boots."
    },
    {
      id: 6,
      name: "Midwest Grip",
      region: "midwest",
      state: "Illinois",
      city: "Chicago",
      address: "789 Urban St, Chicago, IL 60601",
      phone: "(312) 555-0600",
      email: "resole@midwestgrip.com",
      website: "https://midwestgrip.com",
      turnaround: "3-5 weeks",
      priceRange: "$35-55",
      specialties: ["Gym Climbing", "Bouldering"],
      brands: ["Vibram XS Grip2", "Stealth Mi6"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Velcro replacement"
      ],
      shipping: true,
      localDropoff: true,
      description: "Affordable resoles with solid craftsmanship. Popular with gym climbers and students.",
      rating: 4.5,
      reviews: 67,
      featured: false,
      instagram: "@midwestgrip",
      tips: "Budget-friendly option. They offer student discounts with ID."
    },
    {
      id: 7,
      name: "Pacific Northwest Resoles",
      region: "northwest",
      state: "Washington",
      city: "Seattle",
      address: "321 Cascade Blvd, Seattle, WA 98101",
      phone: "(206) 555-0700",
      email: "info@pnwresoles.com",
      website: "https://pnwresoles.com",
      turnaround: "2-4 weeks",
      priceRange: "$40-65",
      specialties: ["Alpine", "Trad Climbing", "Approach Shoes"],
      brands: ["Vibram XS Edge", "Stealth C4", "Vibram Megagrip"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Waterproofing",
        "Boot modifications"
      ],
      shipping: true,
      localDropoff: true,
      description: "PNW's alpine and trad specialists. Excellent work on approach shoes and light mountaineering boots.",
      rating: 4.7,
      reviews: 112,
      featured: false,
      instagram: "@pnwresoles",
      tips: "They can add rubber to the arch for crack climbing."
    },
    {
      id: 8,
      name: "Desert Sole Solutions",
      region: "southwest",
      state: "Nevada",
      city: "Las Vegas",
      address: "555 Red Rock Way, Las Vegas, NV 89101",
      phone: "(702) 555-0800",
      email: "resole@desertsole.com",
      website: "https://desertsole.com",
      turnaround: "2-3 weeks",
      priceRange: "$35-60",
      specialties: ["Sport Climbing", "Bouldering", "Sandstone"],
      brands: ["Stealth HF", "Stealth Mi6", "Vibram XS Grip"],
      services: [
        "Half sole",
        "Full sole",
        "Rand repair",
        "Custom toe patches"
      ],
      shipping: true,
      localDropoff: true,
      description: "Red Rock locals' favorite. Experts in high-friction rubber for sandstone.",
      rating: 4.8,
      reviews: 178,
      featured: true,
      instagram: "@desertsoles",
      tips: "Ask for extra toe rubber if you climb a lot of sandstone."
    }
  ];

  // Filter resolers based on selection
  const filteredResolers = resolers.filter(resoler => {
    const regionMatch = selectedRegion === 'all' || resoler.region === selectedRegion;
    const specialtyMatch = selectedSpecialty === 'all' || 
      resoler.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    return regionMatch && specialtyMatch;
  });

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'west', label: 'West' },
    { value: 'northwest', label: 'Northwest' },
    { value: 'southwest', label: 'Southwest' },
    { value: 'midwest', label: 'Midwest' },
    { value: 'southeast', label: 'Southeast' },
    { value: 'northeast', label: 'Northeast' }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'performance', label: 'Performance/Competition' },
    { value: 'trad', label: 'Trad Climbing' },
    { value: 'bouldering', label: 'Bouldering' },
    { value: 'sport', label: 'Sport Climbing' },
    { value: 'approach', label: 'Approach Shoes' },
    { value: 'alpine', label: 'Alpine/Mountaineering' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Recommended Climbing Shoe Resolers - Climbing Shoe Shop</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-amber-700 hover:text-amber-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recommended Climbing Shoe Resolers</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't throw away your favorite climbing shoes! These trusted resolers can give them new life. 
            Most climbers can get 3-5 resoles before needing new shoes.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-900 mb-2">💰 Save Money</h3>
            <p className="text-sm text-amber-800">
              Resoling costs $40-70 vs $150-200 for new shoes. Save money and reduce waste!
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">♻️ Eco-Friendly</h3>
            <p className="text-sm text-green-800">
              Keep your broken-in uppers and reduce landfill waste. Better for the planet!
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">⚡ Custom Options</h3>
            <p className="text-sm text-blue-800">
              Choose different rubber compounds or thicknesses for your climbing style.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {regions.map(region => (
                  <option key={region.value} value={region.value}>{region.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty.value} value={specialty.value}>{specialty.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedSpecialty('all');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Resolers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredResolers.map(resoler => (
            <div 
              key={resoler.id} 
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                resoler.featured ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              {resoler.featured && (
                <div className="bg-amber-400 text-amber-900 text-xs font-semibold px-3 py-1 rounded-t-lg text-center">
                  ⭐ FEATURED RESOLER
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{resoler.name}</h3>
                    <p className="text-gray-600">{resoler.city}, {resoler.state}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(resoler.rating))}
                        {'☆'.repeat(5 - Math.floor(resoler.rating))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {resoler.rating} ({resoler.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">{resoler.priceRange}</p>
                    <p className="text-sm text-gray-500">{resoler.turnaround}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{resoler.description}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {resoler.specialties.map(specialty => (
                      <span 
                        key={specialty}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Services:</p>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                    {resoler.services.map(service => (
                      <div key={service} className="flex items-center">
                        <span className="text-green-500 mr-1">✓</span>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rubber Brands */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Rubber Options:</p>
                  <p className="text-sm text-gray-600">{resoler.brands.join(', ')}</p>
                </div>

                {/* Pro Tip */}
                {resoler.tips && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">💡 Pro Tip:</span> {resoler.tips}
                    </p>
                  </div>
                )}

                {/* Contact & Shipping */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phone:</span>
                    <a href={`tel:${resoler.phone}`} className="text-amber-700 hover:text-amber-800">
                      {resoler.phone}
                    </a>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Website:</span>
                    <a 
                      href={resoler.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-800"
                    >
                      Visit Site →
                    </a>
                  </div>
                  {resoler.instagram && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Instagram:</span>
                      <span className="text-gray-700">{resoler.instagram}</span>
                    </div>
                  )}
                  <div className="flex gap-4 mt-3">
                    {resoler.shipping && (
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        📦 Ships Nationwide
                      </span>
                    )}
                    {resoler.localDropoff && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        🏪 Local Drop-off
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* When to Resole Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">When Should You Resole?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold mb-2">Perfect Time</h3>
              <p className="text-sm text-gray-600">
                Rubber worn through at the toe, but rand (side rubber) is intact. 
                This is the ideal time - cheapest resole.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-semibold mb-2">Still OK</h3>
              <p className="text-sm text-gray-600">
                Small hole in the rand or slight damage to the toe cap. 
                Will need rand repair too - costs more but still worth it.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="font-semibold mb-2">Too Late</h3>
              <p className="text-sm text-gray-600">
                Holes through to the leather/synthetic upper, or structural damage. 
                May not be worth resoling - time for new shoes.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-3">How to Ship Your Shoes</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li><span className="font-semibold">1.</span> Clean your shoes (brush off chalk and dirt)</li>
              <li><span className="font-semibold">2.</span> Fill out the resoler's order form (usually on their website)</li>
              <li><span className="font-semibold">3.</span> Include the form inside with your shoes</li>
              <li><span className="font-semibold">4.</span> Pack in a box or padded envelope</li>
              <li><span className="font-semibold">5.</span> Ship with tracking (USPS Priority Mail is usually cheapest)</li>
              <li><span className="font-semibold">6.</span> Most resolers will email when they receive and complete your shoes</li>
            </ol>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much does resoling cost?</h3>
              <p className="text-gray-700">
                Most resoles cost between $40-70 depending on the type (half sole vs full sole) and any additional repairs needed. 
                This is typically 25-40% the cost of new shoes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long does resoling take?</h3>
              <p className="text-gray-700">
                Typical turnaround is 2-4 weeks, not including shipping time. Some resolers offer rush service for an additional fee.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between half sole and full sole?</h3>
              <p className="text-gray-700">
                Half sole replaces just the front portion of the sole (most common, cheaper). 
                Full sole replaces the entire bottom including the heel (needed if heel is worn or for thicker rubber).
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I choose different rubber?</h3>
              <p className="text-gray-700">
                Yes! Most resolers offer various rubber options. Softer rubber (like XS Grip2) is better for steep climbing and gym use. 
                Harder rubber (like XS Edge) lasts longer and is better for vertical climbing and edging.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many times can shoes be resoled?</h3>
              <p className="text-gray-700">
                Typically 3-5 times, depending on the shoe construction and how worn they get between resoles. 
                High-quality shoes with good rand condition can sometimes be resoled more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}