import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ComparisonToolPage() {
  const [selectedShoes, setSelectedShoes] = useState([]);
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Comprehensive shoe database
  const shoeDatabase = [
    {
      id: 1,
      brand: 'La Sportiva',
      model: 'Solution',
      category: 'Aggressive',
      price: 199,
      weight: '425g (pair)',
      closure: 'Velcro (2 straps)',
      upper: 'Leather + Synthetic',
      midsole: '1.1mm LaspoFlex',
      sole: '4mm Vibram XS Grip2',
      downturn: 'Heavy',
      asymmetry: 'High',
      stiffness: 3,
      sensitivity: 4,
      edging: 3,
      smearing: 4,
      crack: 2,
      comfort: 2,
      durability: 3,
      stretch: 'Low (0.5 size)',
      bestFor: 'Steep sport, bouldering',
      terrain: ['Overhangs', 'Roofs', 'Compression'],
      level: 'Advanced',
      fit: 'Narrow',
      pros: ['Excellent on overhangs', 'Great heel', 'Precise toe'],
      cons: ['Not comfortable', 'Poor for cracks', 'Expensive'],
      rating: 4.7,
      reviews: 342,
      colors: ['Yellow/Black', 'White/Yellow'],
      sizes: '33-47 EU',
      image: '/images/solution.jpg'
    },
    {
      id: 2,
      brand: 'Scarpa',
      model: 'Instinct VS',
      category: 'Aggressive',
      price: 189,
      weight: '400g (pair)',
      closure: 'Velcro (1 strap)',
      upper: 'Synthetic',
      midsole: '1mm Flexan',
      sole: '3.5mm Vibram XS Edge',
      downturn: 'Moderate',
      asymmetry: 'Moderate',
      stiffness: 4,
      sensitivity: 3,
      edging: 5,
      smearing: 3,
      crack: 3,
      comfort: 3,
      durability: 4,
      stretch: 'Minimal',
      bestFor: 'All-around performance',
      terrain: ['Vertical', 'Slight overhang', 'Technical'],
      level: 'Intermediate-Advanced',
      fit: 'Medium',
      pros: ['Excellent edging', 'Versatile', 'Durable'],
      cons: ['Break-in period', 'Heel could be tighter'],
      rating: 4.6,
      reviews: 289,
      colors: ['Orange', 'Black/Azure'],
      sizes: '34-47 EU',
      image: '/images/instinct-vs.jpg'
    },
    {
      id: 3,
      brand: 'Five Ten',
      model: 'Hiangle',
      category: 'Aggressive',
      price: 165,
      weight: '450g (pair)',
      closure: 'Velcro (3 straps)',
      upper: 'Synthetic',
      midsole: '1.4mm',
      sole: '4.2mm Stealth C4',
      downturn: 'Heavy',
      asymmetry: 'High',
      stiffness: 3,
      sensitivity: 4,
      edging: 3,
      smearing: 5,
      crack: 2,
      comfort: 2,
      durability: 4,
      stretch: 'Minimal',
      bestFor: 'Competition, steep bouldering',
      terrain: ['Overhangs', 'Volumes', 'Smears'],
      level: 'Advanced',
      fit: 'Wide',
      pros: ['Amazing grip', 'Great on volumes', 'Wide toebox'],
      cons: ['Very aggressive', 'Not for beginners'],
      rating: 4.5,
      reviews: 187,
      colors: ['White/Black', 'Red'],
      sizes: '35-47 EU',
      image: '/images/hiangle.jpg'
    },
    {
      id: 4,
      brand: 'Evolv',
      model: 'Shaman',
      category: 'Aggressive',
      price: 175,
      weight: '430g (pair)',
      closure: 'Velcro (2 straps)',
      upper: 'Synthetic (Synthratek VX)',
      midsole: '1.2mm MX-P',
      sole: '4mm TRAX SAS',
      downturn: 'Moderate-Heavy',
      asymmetry: 'Moderate',
      stiffness: 3,
      sensitivity: 4,
      edging: 3,
      smearing: 4,
      crack: 3,
      comfort: 3,
      durability: 3,
      stretch: 'Low',
      bestFor: 'Bouldering, sport',
      terrain: ['Overhangs', 'Technical', 'Toe hooks'],
      level: 'Intermediate-Advanced',
      fit: 'Wide',
      pros: ['Great toe rubber', 'Comfortable for aggressive', 'Good heel'],
      cons: ['Less durable rubber', 'Can feel soft'],
      rating: 4.4,
      reviews: 156,
      colors: ['Blue/Orange', 'Black/White'],
      sizes: '35-47 EU',
      image: '/images/shaman.jpg'
    },
    {
      id: 5,
      brand: 'La Sportiva',
      model: 'Katana',
      category: 'Moderate',
      price: 185,
      weight: '460g (pair)',
      closure: 'Lace',
      upper: 'Leather',
      midsole: '1.8mm P3',
      sole: '4mm Vibram XS Edge',
      downturn: 'Slight',
      asymmetry: 'Low',
      stiffness: 4,
      sensitivity: 3,
      edging: 5,
      smearing: 3,
      crack: 4,
      comfort: 4,
      durability: 5,
      stretch: 'Moderate (0.5-1 size)',
      bestFor: 'All-day multipitch, trad',
      terrain: ['Vertical', 'Slabs', 'Cracks'],
      level: 'All levels',
      fit: 'Medium',
      pros: ['Excellent edging', 'Comfortable', 'Durable', 'Versatile'],
      cons: ['Not for steep terrain', 'Lacing takes time'],
      rating: 4.8,
      reviews: 423,
      colors: ['Yellow', 'Women: Mint'],
      sizes: '33-47 EU',
      image: '/images/katana.jpg'
    },
    {
      id: 6,
      brand: 'Scarpa',
      model: 'Helix',
      category: 'Comfort',
      price: 139,
      weight: '490g (pair)',
      closure: 'Lace',
      upper: 'Suede leather',
      midsole: '2mm',
      sole: '3.5mm Vibram XS Edge',
      downturn: 'Flat',
      asymmetry: 'None',
      stiffness: 3,
      sensitivity: 2,
      edging: 3,
      smearing: 3,
      crack: 5,
      comfort: 5,
      durability: 4,
      stretch: 'High (1-1.5 sizes)',
      bestFor: 'Beginners, all-day comfort',
      terrain: ['Vertical', 'Slabs', 'Long routes'],
      level: 'Beginner-Intermediate',
      fit: 'Wide',
      pros: ['Very comfortable', 'Great for beginners', 'Good value', 'All-day wear'],
      cons: ['Not for overhangs', 'Less precise'],
      rating: 4.5,
      reviews: 567,
      colors: ['Gray/Yellow', 'Women: Light Gray'],
      sizes: '32-48 EU',
      image: '/images/helix.jpg'
    },
    {
      id: 7,
      brand: 'Black Diamond',
      model: 'Momentum',
      category: 'Comfort',
      price: 99,
      weight: '510g (pair)',
      closure: 'Velcro (2 straps)',
      upper: 'Engineered Knit',
      midsole: '2.5mm',
      sole: '4.3mm BlackLabel',
      downturn: 'Flat',
      asymmetry: 'None',
      stiffness: 3,
      sensitivity: 2,
      edging: 3,
      smearing: 3,
      crack: 4,
      comfort: 5,
      durability: 3,
      stretch: 'Low',
      bestFor: 'Gym climbing, beginners',
      terrain: ['Vertical', 'Slabs', 'Gym'],
      level: 'Beginner',
      fit: 'Medium-Wide',
      pros: ['Great price', 'Comfortable', 'Breathable', 'Easy on/off'],
      cons: ['Not technical', 'Wears quickly'],
      rating: 4.3,
      reviews: 892,
      colors: ['Black', 'Women: Merlot'],
      sizes: '34-48 EU',
      image: '/images/momentum.jpg'
    },
    {
      id: 8,
      brand: 'Butora',
      model: 'Acro',
      category: 'Aggressive',
      price: 170,
      weight: '410g (pair)',
      closure: 'Velcro (2 straps)',
      upper: 'German leather',
      midsole: '1.5mm',
      sole: '4mm Butora Sticky',
      downturn: 'Heavy',
      asymmetry: 'High',
      stiffness: 3,
      sensitivity: 4,
      edging: 3,
      smearing: 4,
      crack: 2,
      comfort: 3,
      durability: 3,
      stretch: 'Moderate',
      bestFor: 'Bouldering, sport',
      terrain: ['Overhangs', 'Compression', 'Heel hooks'],
      level: 'Intermediate-Advanced',
      fit: 'Wide toebox',
      pros: ['Wide toebox', 'Great heel', 'Good value'],
      cons: ['Less known brand', 'Limited availability'],
      rating: 4.6,
      reviews: 98,
      colors: ['Orange', 'Blue'],
      sizes: '35-46 EU',
      image: '/images/acro.jpg'
    }
  ];

  const brands = [...new Set(shoeDatabase.map(shoe => shoe.brand))];
  const categories = [...new Set(shoeDatabase.map(shoe => shoe.category))];

  // Filter shoes
  const filteredShoes = shoeDatabase.filter(shoe => {
    const brandMatch = filterBrand === 'all' || shoe.brand === filterBrand;
    const categoryMatch = filterCategory === 'all' || shoe.category === filterCategory;
    return brandMatch && categoryMatch;
  });

  // Add/remove shoe from comparison
  const toggleShoeSelection = (shoe) => {
    if (selectedShoes.find(s => s.id === shoe.id)) {
      setSelectedShoes(selectedShoes.filter(s => s.id !== shoe.id));
    } else if (selectedShoes.length < 4) {
      setSelectedShoes([...selectedShoes, shoe]);
    } else {
      alert('You can compare up to 4 shoes at a time');
    }
  };

  // Clear comparison
  const clearComparison = () => {
    setSelectedShoes([]);
  };

  // Get rating stars
  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) stars.push('☆');
    
    return stars.join('');
  };

  // Get performance bar
  const getPerformanceBar = (value, maxValue = 5) => {
    const percentage = (value / maxValue) * 100;
    return (
      <div className="flex items-center">
        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
          <div 
            className="bg-amber-600 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{value}/5</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Climbing Shoe Comparison Tool - Compare Models Side by Side</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-amber-700 hover:text-amber-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Climbing Shoe Comparison Tool</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare up to 4 climbing shoes side by side. Select shoes from the list below to see detailed comparisons of features, performance, and specifications.
          </p>
        </div>

        {/* Selected Shoes Comparison */}
        {selectedShoes.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Comparison ({selectedShoes.length} shoes)</h2>
              <button
                onClick={clearComparison}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 sticky left-0 bg-white">Feature</th>
                    {selectedShoes.map(shoe => (
                      <th key={shoe.id} className="text-left py-2 px-4 min-w-[200px]">
                        <div>
                          <div className="font-bold">{shoe.brand}</div>
                          <div className="text-amber-700">{shoe.model}</div>
                          <button
                            onClick={() => toggleShoeSelection(shoe)}
                            className="text-red-500 text-sm mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-gray-50">Price</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        <span className="text-xl font-bold text-green-600">${shoe.price}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Category</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.category}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Best For</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4 text-sm">{shoe.bestFor}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Level</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.level}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Closure</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.closure}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Upper</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.upper}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Sole</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.sole}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Downturn</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.downturn}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Stretch</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.stretch}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Weight</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">{shoe.weight}</td>
                    ))}
                  </tr>
                  
                  {/* Performance Metrics */}
                  <tr className="border-b bg-blue-50">
                    <td colSpan={selectedShoes.length + 1} className="py-2 px-4 font-bold">
                      Performance Ratings
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Edging</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        {getPerformanceBar(shoe.edging)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Smearing</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        {getPerformanceBar(shoe.smearing)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Sensitivity</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        {getPerformanceBar(shoe.sensitivity)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Comfort</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        {getPerformanceBar(shoe.comfort)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Durability</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        {getPerformanceBar(shoe.durability)}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Pros and Cons */}
                  <tr className="border-b bg-green-50">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-green-50">Pros</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        <ul className="text-sm">
                          {shoe.pros.map((pro, i) => (
                            <li key={i} className="text-green-700">✓ {pro}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-red-50">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-red-50">Cons</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        <ul className="text-sm">
                          {shoe.cons.map((con, i) => (
                            <li key={i} className="text-red-700">✗ {con}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold sticky left-0 bg-white">Rating</td>
                    {selectedShoes.map(shoe => (
                      <td key={shoe.id} className="py-2 px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">{getRatingStars(shoe.rating)}</span>
                          <span className="text-sm text-gray-600">
                            {shoe.rating} ({shoe.reviews} reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Shoe Selection Grid */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Select Shoes to Compare</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Shoes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredShoes.map(shoe => {
              const isSelected = selectedShoes.find(s => s.id === shoe.id);
              return (
                <div
                  key={shoe.id}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                  onClick={() => toggleShoeSelection(shoe)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{shoe.brand}</h3>
                      <p className="text-amber-700 font-semibold">{shoe.model}</p>
                    </div>
                    {isSelected && (
                      <span className="text-amber-600 text-sm">✓ Selected</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{shoe.category} • ${shoe.price}</p>
                    <p>{shoe.bestFor}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">{getRatingStars(shoe.rating)}</span>
                      <span className="text-xs">{shoe.rating}</span>
                    </div>
                  </div>
                  
                  <button
                    className={`mt-3 w-full py-1 px-3 rounded text-sm font-medium transition ${
                      isSelected
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Add to Compare'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}