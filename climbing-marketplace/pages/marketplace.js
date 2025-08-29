import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../contexts/CartContext';

export default function MarketplacePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    sizeEU: '',
    condition: '',
    category: '',
    type: '',
    gender: '',
    sortBy: 'newest'
  });
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  // Enhanced sample listings with new fields
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
      condition: 'likenew',
      size: 'US 9',
      sizeUS: '9',
      sizeEU: '42',
      category: 'Sport Climbing',
      type: 'aggressive',
      gender: 'mens',
      description: 'Barely used La Sportiva Solutions. Only worn indoors for about 10 sessions. Still have the original box and tags. Perfect for aggressive sport climbing and bouldering.',
      images: [{ url: '/listing-1.jpg' }, { url: '/listing-2.jpg' }],
      posted: '2025-01-12',
      location: 'Boulder, CO',
      views: 45,
      favorited: 12,
      status: 'available'
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
      condition: 'good',
      size: 'US 8',
      sizeUS: '8',
      sizeEU: '41',
      category: 'All-Around',
      type: 'moderate',
      gender: 'womens',
      description: 'Great all-around climbing shoes. Some wear on the toe but plenty of rubber left. Perfect for someone looking for a reliable pair at a good price.',
      images: [{ url: '/listing-3.jpg' }],
      posted: '2025-01-10',
      location: 'Salt Lake City, UT',
      views: 67,
      favorited: 8,
      status: 'available'
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
      condition: 'fair',
      size: 'US 10',
      sizeUS: '10',
      sizeEU: '43',
      category: 'Bouldering',
      type: 'aggressive',
      gender: 'mens',
      description: 'These shoes have been well-loved but still have life left in them. Great for someone looking for an affordable pair to try out the brand.',
      images: [{ url: '/listing-4.jpg' }],
      posted: '2025-01-08',
      location: 'Yosemite, CA',
      views: 23,
      favorited: 3,
      status: 'available'
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
      condition: 'excellent',
      size: 'US 9.5',
      sizeUS: '9.5',
      sizeEU: '42.5',
      category: 'Bouldering',
      type: 'aggressive',
      gender: 'unisex',
      description: 'These Shamans are in excellent condition. Used maybe 15 times outdoors. Love the aggressive downturn but sizing up to a different shoe.',
      images: [{ url: '/listing-5.jpg' }, { url: '/listing-6.jpg' }],
      posted: '2025-01-06',
      location: 'Joshua Tree, CA',
      views: 89,
      favorited: 15,
      status: 'available'
    }
  ];

  // Enhanced brand list
  const brands = [
    'La Sportiva', 'Scarpa', 'Five Ten', 'Evolv', 'Black Diamond',
    'Butora', 'Mad Rock', 'Tenaya', 'Ocun', 'Red Chili', 'So iLL', 'Unparallel'
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'likenew', label: 'Like New (worn 1-3x)' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  const types = [
    { value: 'aggressive', label: 'Aggressive/Downturned' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'neutral', label: 'Neutral/Flat' },
  ];

  const sizesUS = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];
  const sizesEU = ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch listings from API or use sample data
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const queryParams = new URLSearchParams(router.query);
      
      try {
        const response = await fetch(`${apiUrl}/api/products/search?${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setListings(data.products);
            setFilteredListings(data.products);
            setPagination(data.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalItems: data.products.length,
              itemsPerPage: 12
            });
            setLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('API not available, using sample data');
      }

      // Fall back to sample data if API fails
      setListings(sampleListings);
      setFilteredListings(sampleListings);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: sampleListings.length,
        itemsPerPage: 12
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFiltersAndSearch();
  }, [filters, searchTerm, listings]);

  const applyFiltersAndSearch = () => {
    let filtered = [...listings];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    filtered = filtered.filter(listing => {
      if (filters.brand && listing.brand !== filters.brand) return false;
      if (filters.size && listing.sizeUS !== filters.size) return false;
      if (filters.sizeEU && listing.sizeEU !== filters.sizeEU) return false;
      if (filters.condition && listing.condition !== filters.condition) return false;
      if (filters.category && listing.category !== filters.category) return false;
      if (filters.type && listing.type !== filters.type) return false;
      if (filters.gender && listing.gender !== filters.gender) return false;
      if (filters.minPrice && listing.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && listing.price > parseInt(filters.maxPrice)) return false;
      return listing.status === 'available';
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
    setPagination(prev => ({
      ...prev,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage)
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFiltersAndSearch();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      sizeEU: '',
      condition: '',
      category: '',
      type: '',
      gender: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'sortBy'
  ).length;

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

  const getConditionLabel = (condition) => {
    const found = conditions.find(c => c.value === condition);
    return found ? found.label : condition;
  };

  const getConditionColor = (condition) => {
    const colors = {
      'new': 'bg-green-100 text-green-800',
      'likenew': 'bg-blue-100 text-blue-800',
      'excellent': 'bg-teal-100 text-teal-800',
      'good': 'bg-yellow-100 text-yellow-800',
      'fair': 'bg-orange-100 text-orange-800'
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleBuyNow = (productId) => {
    console.log('🔗 Navigating to checkout for:', productId);
    router.push(`/checkout/${productId}`);
  };

  const handleSignIn = () => {
    console.log('🔐 Sign in clicked');
    router.push('/auth');
  };

  const handleCartClick = () => {
    console.log('🛒 Cart clicked');
    router.push('/cart');
  };

  const { getCartCount } = useCart();


  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push('/climbing-shoes')}
              className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              The Climbing Shoe Shop
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/marketplace')}
                className="text-stone-700 hover:text-amber-700 transition-colors"
              >
                Shop
              </button>
              <button
                onClick={() => router.push('/about')}
                className="text-stone-700 hover:text-amber-700 transition-colors"
                >
                  About
              </button>
              <button
              onClick={() => router.push('contact')}
              className="text-stone-700 hover:text-amber-700 transition-colors"
              >
                Contact
              </button>
              <button 
              onClick={() => router.push('giving-back')}
                className="text-stone-700 hover:text-amber-700 transition-colors"
                >
                1% Back
                </button>
              {/* <button 
                onClick={() => router.push('/admin-auth')}
                className="text-red-700 hover:text-red-800 text-sm transition-colors"
              >
                Admin
              </button> */}
              <div className="flex items-center space-x-4">
              <button 
                onClick={handleCartClick}
                className="relative text-stone-700 hover:text-amber-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
              {user ? (
                <>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="text-stone-700 hover:text-amber-700 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => router.push('/dashboard')}
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

      {/* Search Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for climbing shoes, brands, or models..."
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
            >
              Search
            </button>
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden px-4 py-2 border border-stone-300 rounded-lg flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            {searchTerm ? `Search results for "${searchTerm}"` : 'Climbing Shoe Marketplace'}
          </h1>
          <p className="text-stone-600">Buy and sell climbing shoes from fellow climbers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-warm p-6 sticky top-24 border border-stone-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-stone-800">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amber-700 hover:text-amber-800"
                  >
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>
              
              {/* Brand Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size Filters */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">US Size</label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">All</option>
                    {sizesUS.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">EU Size</label>
                  <select
                    value={filters.sizeEU}
                    onChange={(e) => handleFilterChange('sizeEU', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">All</option>
                    {sizesEU.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Conditions</option>
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All</option>
                  <option value="mens">Men's</option>
                  <option value="womens">Women's</option>
                  <option value="unisex">Unisex</option>
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
                    className="px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                onClick={clearFilters}
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

            {/* Active Filters Display */}
            {(activeFilterCount > 0 || searchTerm) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:text-amber-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || key === 'sortBy') return null;
                  
                  let displayValue = value;
                  if (key === 'condition') {
                    displayValue = conditions.find(c => c.value === value)?.label || value;
                  } else if (key === 'type') {
                    displayValue = types.find(t => t.value === value)?.label || value;
                  } else if (key === 'minPrice') {
                    displayValue = `Min: $${value}`;
                  } else if (key === 'maxPrice') {
                    displayValue = `Max: $${value}`;
                  }

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                    >
                      {displayValue}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="hover:text-amber-600"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-warm overflow-hidden hover:shadow-warm-lg transition-shadow border border-stone-200">
                  {/* Listing Image */}
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {listing.images && listing.images[0] ? (
                        <img
                          src={listing.images[0].url || listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">Shoe Image</span>
                      )}
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
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getConditionColor(listing.condition)}`}>
                        {getConditionLabel(listing.condition)}
                      </span>
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                    
                    {/* Price and Size */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
                        {listing.originalPrice > listing.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">US {listing.sizeUS || listing.size}</div>
                        {listing.sizeEU && (
                          <div className="text-xs text-gray-500">EU {listing.sizeEU}</div>
                        )}
                      </div>
                    </div>

                    {/* Type and Gender Tags */}
                    <div className="flex gap-2 mb-3">
                      {listing.type && (
                        <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded">
                          {types.find(t => t.value === listing.type)?.label || listing.type}
                        </span>
                      )}
                      {listing.gender && (
                        <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded">
                          {listing.gender === 'mens' ? "Men's" : listing.gender === 'womens' ? "Women's" : 'Unisex'}
                        </span>
                      )}
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-sm font-medium text-amber-700">
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
                        onClick={() => {
                          // Add to cart or go directly to checkout
                          router.push(`/checkout/${listing.id}`);
                        }}
                        className="flex-1 bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 text-sm font-medium transition-colors"
                      >
                        Buy Now
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

            {/* No Results State */}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No shoes found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No results for "${searchTerm}". Try different search terms.`
                    : 'Try adjusting your filters to see more results'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredListings.length > 0 && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                    disabled={pagination.currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      pagination.currentPage > 1
                        ? 'bg-white border border-stone-300 hover:bg-stone-50'
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-stone-700">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      pagination.currentPage < pagination.totalPages
                        ? 'bg-white border border-stone-300 hover:bg-stone-50'
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}

            {/* Summary Stats */}
            {filteredListings.length > 0 && (
              <div className="mt-8 p-4 bg-white rounded-lg border border-stone-200">
                <h3 className="font-semibold text-stone-800 mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-stone-500">Avg Price</p>
                    <p className="font-semibold text-stone-800">
                      ${Math.round(filteredListings.reduce((sum, l) => sum + l.price, 0) / filteredListings.length)}
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-500">Most Common Brand</p>
                    <p className="font-semibold text-stone-800">
                      {filteredListings.reduce((acc, l) => {
                        acc[l.brand] = (acc[l.brand] || 0) + 1;
                        return acc;
                      }, {}) && Object.entries(filteredListings.reduce((acc, l) => {
                        acc[l.brand] = (acc[l.brand] || 0) + 1;
                        return acc;
                      }, {})).sort((a, b) => b[1] - a[1])[0]?.[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-500">Most Common Size</p>
                    <p className="font-semibold text-stone-800">
                      US {filteredListings.reduce((acc, l) => {
                        const size = l.sizeUS || l.size;
                        acc[size] = (acc[size] || 0) + 1;
                        return acc;
                      }, {}) && Object.entries(filteredListings.reduce((acc, l) => {
                        const size = l.sizeUS || l.size;
                        acc[size] = (acc[size] || 0) + 1;
                        return acc;
                      }, {})).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace('US ', '')}
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-500">New Listings</p>
                    <p className="font-semibold text-stone-800">
                      {filteredListings.filter(l => {
                        const daysOld = Math.floor((Date.now() - new Date(l.posted)) / (1000 * 60 * 60 * 24));
                        return daysOld <= 7;
                      }).length} this week
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}