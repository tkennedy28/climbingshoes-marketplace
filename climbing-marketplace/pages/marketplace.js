import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MarketplacePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    condition: '',
    category: '',
    sortBy: 'newest'
  });
  const [loading, setLoading] = useState(true);

  // Sample user listings data
  const sampleListings = [
    {
      id: 'LST-001',
      sellerId: 'USR-001',
      seller: {
        name: 'John Climber',
        rating: 4.8,
        reviewCount: 23,
        verified: true
      },
      title: 'La Sportiva Solution - Like New',
      brand: 'La Sportiva',
      model: 'Solution',
      price: 150,
      originalPrice: 199,
      condition: 'Like New',
      size: 'US 9',
      category: 'Sport Climbing',
      description: 'Barely used La Sportiva Solutions. Only worn indoors for about 10 sessions. Still have the original box and tags. Perfect for aggressive sport climbing and bouldering.',
      images: ['/listing-1.jpg', '/listing-2.jpg'],
      posted: '2025-01-12',
      location: 'Boulder, CO',
      views: 45,
      favorited: 12,
      status: 'Active'
    },
    {
      id: 'LST-002',
      sellerId: 'USR-002',
      seller: {
        name: 'Sarah Boulder',
        rating: 4.9,
        reviewCount: 18,
        verified: true
      },
      title: 'Scarpa Instinct VS - Good Condition',
      brand: 'Scarpa',
      model: 'Instinct VS',
      price: 120,
      originalPrice: 179,
      condition: 'Good',
      size: 'US 8',
      category: 'All-Around',
      description: 'Great all-around climbing shoes. Some wear on the toe but plenty of rubber left. Perfect for someone looking for a reliable pair at a good price.',
      images: ['/listing-3.jpg'],
      posted: '2025-01-10',
      location: 'Salt Lake City, UT',
      views: 67,
      favorited: 8,
      status: 'Active'
    },
    {
      id: 'LST-003',
      sellerId: 'USR-003',
      seller: {
        name: 'Mike Route',
        rating: 4.6,
        reviewCount: 31,
        verified: false
      },
      title: 'Five Ten Hiangle - Well Used',
      brand: 'Five Ten',
      model: 'Hiangle',
      price: 80,
      originalPrice: 160,
      condition: 'Well Used',
      size: 'US 10',
      category: 'Bouldering',
      description: 'These shoes have been well-loved but still have life left in them. Great for someone looking for an affordable pair to try out the brand.',
      images: ['/listing-4.jpg'],
      posted: '2025-01-08',
      location: 'Yosemite, CA',
      views: 23,
      favorited: 3,
      status: 'Active'
    },
    {
      id: 'LST-004',
      sellerId: 'USR-004',
      seller: {
        name: 'Alex Sender',
        rating: 5.0,
        reviewCount: 7,
        verified: true
      },
      title: 'Evolv Shaman - Excellent Condition',
      brand: 'Evolv',
      model: 'Shaman',
      price: 110,
      originalPrice: 165,
      condition: 'Excellent',
      size: 'US 9.5',
      category: 'Bouldering',
      description: 'These Shamans are in excellent condition. Used maybe 15 times outdoors. Love the aggressive downturn but sizing up to a different shoe.',
      images: ['/listing-5.jpg', '/listing-6.jpg'],
      posted: '2025-01-06',
      location: 'Joshua Tree, CA',
      views: 89,
      favorited: 15,
      status: 'Active'
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load listings
    setListings(sampleListings);
    setFilteredListings(sampleListings);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = listings.filter(listing => {
      if (filters.brand && listing.brand !== filters.brand) return false;
      if (filters.size && listing.size !== filters.size) return false;
      if (filters.condition && listing.condition !== filters.condition) return false;
      if (filters.category && listing.category !== filters.category) return false;
      if (filters.minPrice && listing.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && listing.price > parseInt(filters.maxPrice)) return false;
      return true;
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        break;
    }

    setFilteredListings(filtered);
  }, [filters, listings]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleContactSeller = (listing) => {
    if (!user) {
      alert('Please sign in to contact sellers');
      router.push('/auth');
      return;
    }
    alert(`Contacting ${listing.seller.name} about ${listing.title}`);
  };

  const handleFavorite = (listingId) => {
    if (!user) {
      alert('Please sign in to save favorites');
      router.push('/auth');
      return;
    }
    alert(`Added to favorites: ${listingId}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              Climbing Shoe Shop
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="text-stone-700 hover:text-amber-700 transition-colors"
              >
                Store
              </button>
              <button 
                onClick={() => router.push('/marketplace')}
                className="text-amber-700 font-medium"
              >
                Marketplace
              </button>
              {user ? (
                <>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="text-stone-700 hover:text-amber-700 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => setActiveTab('sell')}
                    className="bg-moss-600 text-white px-4 py-2 rounded-md hover:bg-moss-700 transition-colors"
                  >
                    Sell Shoes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => router.push('/auth')}
                  className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Climbing Shoe Shop</h1>
          <p className="text-stone-600">Buy and sell climbing shoes from fellow climbers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-warm p-6 sticky top-8 border border-stone-200">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Filters</h3>
              
              {/* Brand Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Brands</option>
                  <option value="La Sportiva">La Sportiva</option>
                  <option value="Scarpa">Scarpa</option>
                  <option value="Five Ten">Five Ten</option>
                  <option value="Evolv">Evolv</option>
                  <option value="Black Diamond">Black Diamond</option>
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sizes</option>
                  <option value="US 7">US 7</option>
                  <option value="US 8">US 8</option>
                  <option value="US 9">US 9</option>
                  <option value="US 9.5">US 9.5</option>
                  <option value="US 10">US 10</option>
                  <option value="US 11">US 11</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Conditions</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Well Used">Well Used</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Sport Climbing">Sport Climbing</option>
                  <option value="Bouldering">Bouldering</option>
                  <option value="All-Around">All-Around</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  brand: '', minPrice: '', maxPrice: '', size: '', condition: '', category: '', sortBy: 'newest'
                })}
                className="w-full bg-stone-200 text-stone-800 py-2 px-4 rounded-md hover:bg-stone-300 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-stone-600">{filteredListings.length} shoes found</p>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-warm overflow-hidden hover:shadow-warm-lg transition-shadow border border-stone-200">
                  {/* Listing Image */}
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Shoe Image</span>
                    </div>
                    <button
                      onClick={() => handleFavorite(listing.id)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {listing.condition}
                      </span>
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
                        {listing.originalPrice > listing.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{listing.size}</span>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-sm font-medium text-blue-600">
                            {listing.seller.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{listing.seller.name}</span>
                            {listing.seller.verified && (
                              <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center">
                            {renderStars(listing.seller.rating)}
                            <span className="text-xs text-gray-500 ml-1">({listing.seller.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{listing.location}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleContactSeller(listing)}
                        className="flex-1 bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 text-sm font-medium transition-colors"
                      >
                        Contact Seller
                      </button>
                      <button
                        onClick={() => router.push(`/listing/${listing.id}`)}
                        className="flex-1 bg-stone-200 text-stone-800 py-2 px-4 rounded-md hover:bg-stone-300 text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">{listing.views} views</span>
                      <span className="text-xs text-gray-500">{listing.favorited} favorites</span>
                      <span className="text-xs text-gray-500">
                        {Math.floor((Date.now() - new Date(listing.posted)) / (1000 * 60 * 60 * 24))} days ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.886-6.125-2.344" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No shoes found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => setFilters({
                    brand: '', minPrice: '', maxPrice: '', size: '', condition: '', category: '', sortBy: 'newest'
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}