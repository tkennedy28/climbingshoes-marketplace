import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState('');

  // Sample listings data
  const sampleListings = {
    'LST-001': {
      id: 'LST-001',
      sellerId: 'USR-001',
      seller: {
        name: 'John Climber',
        rating: 4.8,
        reviewCount: 23,
        verified: true,
        memberSince: '2023-05-15',
        location: 'Boulder, CO',
        responseTime: '2 hours',
        totalSales: 8
      },
      title: 'La Sportiva Solution - Like New',
      brand: 'La Sportiva',
      model: 'Solution',
      price: 150,
      originalPrice: 199,
      condition: 'Like New',
      size: 'US 9',
      category: 'Sport Climbing',
      description: `Barely used La Sportiva Solutions in excellent condition. Only worn indoors for about 10 sessions at my local gym. Still have the original box, tags, and documentation.

These are perfect for aggressive sport climbing and bouldering. The downturn is aggressive but they break in nicely. I'm only selling because I'm sizing up to a 9.5.

Features:
- Vibram XS Grip2 rubber outsole (still very grippy)
- Fast Lacing System for quick adjustments
- Lined leather upper for durability
- P3 midsole for power transmission

No repairs needed, no delamination, rubber is in great shape. Smoke-free home.`,
      specifications: {
        'Brand': 'La Sportiva',
        'Model': 'Solution',
        'Size': 'US 9 / EU 42',
        'Condition': 'Like New',
        'Color': 'White/Yellow',
        'Closure': 'Fast Lacing',
        'Rubber': 'Vibram XS Grip2',
        'Best For': 'Sport Climbing, Bouldering'
      },
      images: ['/listing-1.jpg', '/listing-2.jpg', '/listing-3.jpg'],
      posted: '2025-01-12',
      views: 45,
      favorited: 12,
      status: 'Active',
      shipping: {
        cost: 15,
        methods: ['Standard Shipping', 'Expedited'],
        handoff: true
      },
      returns: '3-day return policy if not as described'
    },
    'LST-002': {
      id: 'LST-002',
      sellerId: 'USR-002',
      seller: {
        name: 'Sarah Boulder',
        rating: 4.9,
        reviewCount: 18,
        verified: true,
        memberSince: '2023-08-22',
        location: 'Salt Lake City, UT',
        responseTime: '4 hours',
        totalSales: 12
      },
      title: 'Scarpa Instinct VS - Good Condition',
      brand: 'Scarpa',
      model: 'Instinct VS',
      price: 120,
      originalPrice: 179,
      condition: 'Good',
      size: 'US 8',
      category: 'All-Around',
      description: `Great all-around climbing shoes in good condition. Some wear on the toe but plenty of rubber left. Perfect for someone looking for a reliable pair at a good price.

I've used these for about a year of regular climbing, both indoor and outdoor. They've been resoled once professionally about 6 months ago, so the rubber is in good shape.

These are versatile shoes that work well for sport climbing, trad, and even some bouldering. The moderate downturn makes them comfortable for longer routes.`,
      specifications: {
        'Brand': 'Scarpa',
        'Model': 'Instinct VS',
        'Size': 'US 8 / EU 41',
        'Condition': 'Good',
        'Color': 'Turquoise/Black',
        'Closure': 'Velcro',
        'Rubber': 'Vibram XS Edge',
        'Best For': 'All-Around Climbing'
      },
      images: ['/listing-4.jpg'],
      posted: '2025-01-10',
      views: 67,
      favorited: 8,
      status: 'Active',
      shipping: {
        cost: 12,
        methods: ['Standard Shipping'],
        handoff: false
      },
      returns: 'All sales final'
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load listing
    if (id && sampleListings[id]) {
      setListing(sampleListings[id]);
      setLoading(false);
    } else if (id) {
      setLoading(false);
    }
  }, [id]);

  const handleContactSeller = () => {
    if (!user) {
      alert('Please sign in to contact sellers');
      router.push('/auth');
      return;
    }
    setShowContactForm(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    alert(`Message sent to ${listing.seller.name}:\n\n${message}${offer ? `\n\nOffer: ${offer}` : ''}`);
    setShowContactForm(false);
    setMessage('');
    setOffer('');
  };

  const handleFavorite = () => {
    if (!user) {
      alert('Please sign in to save favorites');
      router.push('/auth');
      return;
    }
    alert(`Added to favorites: ${listing.title}`);
  };

  const handleMakeOffer = () => {
    if (!user) {
      alert('Please sign in to make offers');
      router.push('/auth');
      return;
    }
    setShowContactForm(true);
    setMessage(`Hi! I'm interested in your ${listing.title}. Would you consider my offer?`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
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

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <button
            onClick={() => router.push('/marketplace')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              ClimbGear
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/marketplace')}
                className="text-gray-700 hover:text-gray-900"
              >
                ← Back to Marketplace
              </button>
              {user ? (
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/auth')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">Main Product Image</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200">
                      <span className="text-gray-400 text-xs">Img {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                {listing.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(listing.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Purchase Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center mb-3">
                    <span className="text-3xl font-bold text-gray-900">${listing.price}</span>
                    {listing.originalPrice > listing.price && (
                      <span className="ml-3 text-lg text-gray-500 line-through">${listing.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleFavorite}
                  className="bg-gray-100 rounded-full p-2 hover:bg-gray-200"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium text-gray-900">{listing.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium text-gray-900">{listing.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{listing.category}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={handleContactSeller}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Contact Seller
                </button>
                <button
                  onClick={handleMakeOffer}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700"
                >
                  Make Offer
                </button>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Shipping & Returns</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">${listing.shipping.cost}</span>
                  </div>
                  {listing.shipping.handoff && (
                    <p className="text-gray-600">Local pickup available</p>
                  )}
                  <p className="text-gray-600">{listing.returns}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{listing.views} views</span>
                  <span>{listing.favorited} favorites</span>
                  <span>{Math.floor((Date.now() - new Date(listing.posted)) / (1000 * 60 * 60 * 24))} days ago</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600">
                    {listing.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900">{listing.seller.name}</h4>
                    {listing.seller.verified && (
                      <svg className="w-5 h-5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center">
                    {renderStars(listing.seller.rating)}
                    <span className="text-sm text-gray-500 ml-2">({listing.seller.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900">{listing.seller.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-gray-900">
                    {new Date(listing.seller.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response time:</span>
                  <span className="text-gray-900">{listing.seller.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total sales:</span>
                  <span className="text-gray-900">{listing.seller.totalSales}</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Viewing ${listing.seller.name}&apos;s other listings`)}
                className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                View Other Listings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Seller</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Contacting: <strong>{listing.seller.name}</strong></p>
              <p className="text-sm text-gray-600">About: <strong>{listing.title}</strong></p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  placeholder="Hi! I'm interested in your climbing shoes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Offer (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder={listing.price.toString()}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave blank if asking full price</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}