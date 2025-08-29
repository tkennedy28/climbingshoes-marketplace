import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SizeGuidePage() {
  const [streetSize, setStreetSize] = useState('');
  const [gender, setGender] = useState('mens');
  const [climbingStyle, setClimbingStyle] = useState('moderate');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Brand-specific sizing data
  const brandSizing = {
    'La Sportiva': {
      generalFit: 'Runs small, narrow',
      sizeAdvice: 'Size up 0.5-1 from street shoe',
      models: {
        'Solution': { fit: 'Very tight, aggressive', stretch: 'Minimal', advice: 'Size up 0.5-1 sizes' },
        'Miura': { fit: 'Narrow, precise', stretch: 'Minimal', advice: 'Size up 0.5 sizes' },
        'Katana': { fit: 'Moderate, versatile', stretch: 'Moderate', advice: 'Size up 0.5-1 sizes' },
        'Tarantula': { fit: 'Comfort fit', stretch: 'Moderate', advice: 'Size up 1-1.5 sizes' },
        'Skwama': { fit: 'Wide forefoot', stretch: 'High', advice: 'Start tight, size up 0.5' },
        'Theory': { fit: 'Aggressive, narrow', stretch: 'Minimal', advice: 'Size up 0.5 sizes' }
      }
    },
    'Scarpa': {
      generalFit: 'European sizing, medium width',
      sizeAdvice: 'True to size or up 0.5',
      models: {
        'Instinct VS': { fit: 'Aggressive, medium', stretch: 'Moderate', advice: 'True to size or up 0.5' },
        'Drago': { fit: 'Soft, sensitive', stretch: 'High', advice: 'Size down 0.5 for performance' },
        'Vapor V': { fit: 'Narrow, precise', stretch: 'Minimal', advice: 'Size up 0.5 sizes' },
        'Helix': { fit: 'Comfort fit', stretch: 'Moderate', advice: 'Size up 1 size' },
        'Boostic': { fit: 'Moderate, all-day', stretch: 'Moderate', advice: 'True to size' },
        'Furia S': { fit: 'Very soft, aggressive', stretch: 'High', advice: 'Size tight, down 0.5' }
      }
    },
    'Five Ten': {
      generalFit: 'Runs large, wide',
      sizeAdvice: 'True to size or down 0.5',
      models: {
        'Hiangle': { fit: 'Aggressive, wide', stretch: 'Minimal', advice: 'True to size' },
        'Aleon': { fit: 'Aggressive, narrow', stretch: 'Minimal', advice: 'Size down 0.5' },
        'Quantum': { fit: 'Stiff, moderate', stretch: 'Minimal', advice: 'True to size' },
        'Crawe': { fit: 'Moderate, wide', stretch: 'Moderate', advice: 'True to size or down 0.5' },
        'NIAD VCS': { fit: 'Soft, wide', stretch: 'High', advice: 'Size down 0.5-1' }
      }
    },
    'Evolv': {
      generalFit: 'American sizing, medium-wide',
      sizeAdvice: 'True to street shoe size',
      models: {
        'Shaman': { fit: 'Wide, aggressive', stretch: 'Moderate', advice: 'True to size' },
        'Phantom': { fit: 'Aggressive, medium', stretch: 'High', advice: 'Size down 0.5' },
        'Zenist': { fit: 'Moderate, all-day', stretch: 'Moderate', advice: 'True to size' },
        'Rave': { fit: 'Comfort, beginner', stretch: 'Moderate', advice: 'Size up 0.5' },
        'Oracle': { fit: 'Aggressive, narrow', stretch: 'Minimal', advice: 'True to size' }
      }
    },
    'Butora': {
      generalFit: 'Wide toebox, narrow heel',
      sizeAdvice: 'True to size',
      models: {
        'Acro': { fit: 'Wide, aggressive', stretch: 'Moderate', advice: 'True to size' },
        'Altura': { fit: 'Wide, moderate', stretch: 'Moderate', advice: 'True to size' },
        'Endeavor': { fit: 'All-day comfort', stretch: 'Moderate', advice: 'Size up 0.5' },
        'Gomi': { fit: 'Narrow, aggressive', stretch: 'Minimal', advice: 'True to size or down 0.5' }
      }
    },
    'Black Diamond': {
      generalFit: 'Medium width, comfort-focused',
      sizeAdvice: 'Size up 0.5-1 sizes',
      models: {
        'Shadow': { fit: 'Moderate, all-day', stretch: 'Moderate', advice: 'Size up 0.5' },
        'Zone': { fit: 'Aggressive, medium', stretch: 'Moderate', advice: 'True to size' },
        'Momentum': { fit: 'Comfort, beginner', stretch: 'Moderate', advice: 'Size up 1 size' }
      }
    }
  };

  // Size conversion chart
  const sizeChart = {
    mens: [
      { us: '4', eu: '36', uk: '3', cm: '22.1' },
      { us: '4.5', eu: '36.5', uk: '3.5', cm: '22.5' },
      { us: '5', eu: '37', uk: '4', cm: '22.9' },
      { us: '5.5', eu: '37.5', uk: '4.5', cm: '23.3' },
      { us: '6', eu: '38', uk: '5', cm: '23.7' },
      { us: '6.5', eu: '38.5', uk: '5.5', cm: '24.1' },
      { us: '7', eu: '39', uk: '6', cm: '24.5' },
      { us: '7.5', eu: '40', uk: '6.5', cm: '24.9' },
      { us: '8', eu: '40.5', uk: '7', cm: '25.4' },
      { us: '8.5', eu: '41', uk: '7.5', cm: '25.8' },
      { us: '9', eu: '42', uk: '8', cm: '26.2' },
      { us: '9.5', eu: '42.5', uk: '8.5', cm: '26.6' },
      { us: '10', eu: '43', uk: '9', cm: '27' },
      { us: '10.5', eu: '44', uk: '9.5', cm: '27.4' },
      { us: '11', eu: '44.5', uk: '10', cm: '27.8' },
      { us: '11.5', eu: '45', uk: '10.5', cm: '28.3' },
      { us: '12', eu: '46', uk: '11', cm: '28.7' },
      { us: '12.5', eu: '46.5', uk: '11.5', cm: '29.1' },
      { us: '13', eu: '47', uk: '12', cm: '29.5' }
    ],
    womens: [
      { us: '5', eu: '35', uk: '2.5', cm: '21.6' },
      { us: '5.5', eu: '35.5', uk: '3', cm: '22.1' },
      { us: '6', eu: '36', uk: '3.5', cm: '22.5' },
      { us: '6.5', eu: '36.5', uk: '4', cm: '22.9' },
      { us: '7', eu: '37', uk: '4.5', cm: '23.3' },
      { us: '7.5', eu: '37.5', uk: '5', cm: '23.7' },
      { us: '8', eu: '38', uk: '5.5', cm: '24.1' },
      { us: '8.5', eu: '38.5', uk: '6', cm: '24.5' },
      { us: '9', eu: '39', uk: '6.5', cm: '24.9' },
      { us: '9.5', eu: '40', uk: '7', cm: '25.4' },
      { us: '10', eu: '40.5', uk: '7.5', cm: '25.8' },
      { us: '10.5', eu: '41', uk: '8', cm: '26.2' },
      { us: '11', eu: '42', uk: '8.5', cm: '26.6' },
      { us: '11.5', eu: '42.5', uk: '9', cm: '27' },
      { us: '12', eu: '43', uk: '9.5', cm: '27.4' }
    ]
  };

  // Calculate recommended size
  const calculateRecommendedSize = () => {
    if (!streetSize) return null;
    
    let adjustment = 0;
    
    // Style adjustment
    if (climbingStyle === 'aggressive') {
      adjustment -= 0.5;
    } else if (climbingStyle === 'comfort') {
      adjustment += 0.5;
    }
    
    // Experience adjustment
    if (experienceLevel === 'beginner') {
      adjustment += 0.5;
    } else if (experienceLevel === 'advanced') {
      adjustment -= 0.5;
    }
    
    const baseSize = parseFloat(streetSize);
    const recommendedSize = baseSize + adjustment;
    
    return {
      size: recommendedSize,
      explanation: getExplanation(adjustment)
    };
  };

  const getExplanation = (adjustment) => {
    if (adjustment < 0) {
      return "Based on your aggressive style and experience, we recommend sizing down for better performance.";
    } else if (adjustment > 0) {
      return "Based on your preferences, we recommend a more comfortable fit for longer climbing sessions.";
    }
    return "Based on your inputs, your street shoe size should work well.";
  };

  const recommendation = calculateRecommendedSize();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Climbing Shoe Size Guide - Find Your Perfect Fit</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-amber-700 hover:text-amber-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Climbing Shoe Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Finding the right climbing shoe size is crucial for performance and comfort. 
            Use our guide to find your perfect fit across different brands and models.
          </p>
        </div>

        {/* Size Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Size Calculator</h2>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-amber-700 hover:text-amber-800"
            >
              {showCalculator ? 'Hide' : 'Show'} Calculator
            </button>
          </div>

          {showCalculator && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Shoe Size (US)
                  </label>
                  <input
                    type="number"
                    value={streetSize}
                    onChange={(e) => setStreetSize(e.target.value)}
                    step="0.5"
                    min="4"
                    max="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 9.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="mens">Men's</option>
                    <option value="womens">Women's</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Climbing Style
                  </label>
                  <select
                    value={climbingStyle}
                    onChange={(e) => setClimbingStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="aggressive">Aggressive/Performance</option>
                    <option value="moderate">Moderate/All-Day</option>
                    <option value="comfort">Comfort/Beginner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {recommendation && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Your Recommended Size:</h3>
                  <p className="text-2xl font-bold text-amber-800 mb-2">
                    US {recommendation.size} ({gender === 'mens' ? "Men's" : "Women's"})
                  </p>
                  <p className="text-sm text-amber-700">{recommendation.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Size Conversion Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Size Conversion Chart</h2>
          
          <div className="mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setGender('mens')}
                className={`px-4 py-2 rounded-lg ${
                  gender === 'mens' 
                    ? 'bg-amber-700 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Men's Sizes
              </button>
              <button
                onClick={() => setGender('womens')}
                className={`px-4 py-2 rounded-lg ${
                  gender === 'womens' 
                    ? 'bg-amber-700 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Women's Sizes
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">US</th>
                  <th className="px-4 py-2 text-left">EU</th>
                  <th className="px-4 py-2 text-left">UK</th>
                  <th className="px-4 py-2 text-left">CM</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart[gender].map((size, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{size.us}</td>
                    <td className="px-4 py-2">{size.eu}</td>
                    <td className="px-4 py-2">{size.uk}</td>
                    <td className="px-4 py-2">{size.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand-Specific Sizing */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Brand-Specific Sizing Guide</h2>
          
          <div className="mb-4">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select a brand...</option>
              {Object.keys(brandSizing).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {selectedBrand && brandSizing[selectedBrand] && (
            <div>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedBrand}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">General Fit:</span> {brandSizing[selectedBrand].generalFit}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Size Advice:</span> {brandSizing[selectedBrand].sizeAdvice}
                </p>
              </div>

              <h4 className="font-semibold mb-3">Popular Models:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(brandSizing[selectedBrand].models).map(([model, info]) => (
                  <div key={model} className="border rounded-lg p-4">
                    <h5 className="font-semibold text-amber-700">{model}</h5>
                    <p className="text-sm text-gray-600 mb-2">{info.fit}</p>
                    <div className="flex justify-between text-sm">
                      <span>Stretch: <span className="font-medium">{info.stretch}</span></span>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">{info.advice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fitting Tips */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Fitting Tips & Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">🎯 How Tight Should They Be?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span><strong>Beginner:</strong> Snug but comfortable, minimal curled toes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span><strong>Intermediate:</strong> Tight with slightly curled toes, no pain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Advanced:</strong> Very tight, curled toes, some discomfort OK</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">⏰ When to Try On</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Try on shoes in the afternoon when feet are slightly swollen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Wear thin socks if you plan to climb with socks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Stand on small edges to test performance</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">📏 Stretch Expectations</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>Leather:</strong> Stretches up to 1 full size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>Synthetic:</strong> Minimal stretch, 0.5 size max</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>Lined leather:</strong> Moderate stretch, 0.5-0.75 size</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">⚠️ Common Mistakes</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Buying too big expecting break-in pain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Not accounting for stretch in leather shoes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Ignoring heel fit - should be snug with no dead space</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Problem Solver */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Fit Problem Solver</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-amber-700 mb-2">Problem: Heel slips out when heel hooking</h3>
              <p className="text-gray-700">
                <strong>Solution:</strong> Try a different model with a narrower heel cup, or use heel padding. 
                Brands like Scarpa and Tenaya often have narrower heels.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-amber-700 mb-2">Problem: Big toe knuckle hurts on top</h3>
              <p className="text-gray-700">
                <strong>Solution:</strong> Look for shoes with a higher toe box volume. 
                Models like La Sportiva Skwama or Butora Acro have more toe knuckle room.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-amber-700 mb-2">Problem: Pinky toe gets crushed</h3>
              <p className="text-gray-700">
                <strong>Solution:</strong> Try wider models or brands. Five Ten and Butora tend to have wider toe boxes. 
                Consider going up 0.5 size if the shoe fits well otherwise.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-amber-700 mb-2">Problem: Achilles pain from heel rand</h3>
              <p className="text-gray-700">
                <strong>Solution:</strong> Look for shoes with lower heel rand height or softer heel construction. 
                Some climbers cut a small slit in the heel rand for relief.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}