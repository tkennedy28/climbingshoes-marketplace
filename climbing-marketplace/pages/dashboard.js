import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageUpload from '../components/ImageUpload';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [listingImages, setListingImages] = useState([]);

  // Sample user data and orders
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2025-01-15',
      items: [
        { name: 'La Sportiva Solution', size: 'US 9', quantity: 1, price: 199 }
      ],
      total: 199,
      status: 'Delivered',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      items: [
        { name: 'Scarpa Instinct', size: 'US 8.5', quantity: 1, price: 179 }
      ],
      total: 179,
      status: 'Shipped',
      trackingNumber: 'TRK987654321'
    }
  ]);

  const [listings] = useState([
    {
      id: 'LST-001',
      name: 'Evolv Shaman (Used)',
      price: 85,
      originalPrice: 120,
      condition: 'Good',
      size: 'US 9',
      status: 'Active',
      views: 24,
      posted: '2025-01-12'
    },
    {
      id: 'LST-002',
      name: 'Five Ten Hiangle',
      price: 130,
      originalPrice: 160,
      condition: 'Like New',
      size: 'US 8',
      status: 'Sold',
      views: 45,
      posted: '2025-01-08'
    }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
      setLoading(false);
    } else {
      // Also check for 'user' key (from signup)
      const userDataAlt = localStorage.getItem('user');
      if (userDataAlt) {
        setUser(JSON.parse(userDataAlt));
        setLoading(false);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/climbing-shoes');
  };

  const handleImagesChange = (images) => {
    setListingImages(images);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (listingImages.length === 0) {
      alert('Please add at least one photo of your shoes');
      return;
    }
    alert(`Listing created with ${listingImages.length} images!`);
    setListingImages([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'Shipped': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'Processing': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Active': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      case 'Sold': return 'text-gray-700 bg-gray-100 border-gray-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-amber-50 to-stone-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const handleCartClick = () => {
    console.log('🛒 Cart clicked');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-stone-100">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .outdoor-gradient {
          background: linear-gradient(135deg, #2C5F2D 0%, #5B8C85 100%);
        }
        
        .earth-gradient {
          background: linear-gradient(135deg, #8B7355 0%, #A0826D 100%);
        }
        
        .forest-shadow {
          box-shadow: 0 10px 40px rgba(44, 95, 45, 0.12);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(44, 95, 45, 0.15);
        }
      `}</style>

      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <nav className="hidden md:flex space-x-8">
              <button
              onClick={() => router.push('/climbing-shoes')}
              className="text-2xl font-bold text-green-800 hover:text-amber-900 transition-colors"
            >
              The Climbing Shoe Shop
            </button>
              <button 
                onClick={() => router.push('/marketplace')}
                className="text-stone-700 hover:text-green-700 font-medium transition-colors"
              >
                Marketplace
              </button>
              <button
                onClick={() => router.push('/about')}
                className="text-stone-700 hover:text-green-700 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="text-stone-700 hover:text-green-700 font-medium transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => router.push('/giving-back')}
                className="text-stone-700 hover:text-green-700 font-medium transition-colors"
              >
                1% for the Planet
              </button>
            </nav>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleCartClick}
                className="relative text-stone-700 hover:text-green-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              <span className="text-gray-700 font-medium">Welcome, {user?.firstName || user?.username || 'User'}!</span>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden forest-shadow">
              {/* Profile Section with Gradient Background */}
              <div className="outdoor-gradient p-6 text-white">
                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                  <span className="text-3xl font-bold text-white">
                    {user?.firstName?.[0] || user?.username?.[0] || 'U'}{user?.lastName?.[0] || ''}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-center">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'User'}
                </h2>
                <p className="text-green-100 text-center text-sm">{user?.email || ''}</p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-xl font-bold">2</p>
                    <p className="text-xs text-green-100">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">5</p>
                    <p className="text-xs text-green-100">Sold</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">4.8★</p>
                    <p className="text-xs text-green-100">Rating</p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'orders'
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">📦</span> My Orders
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'listings'
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">🏷️</span> My Listings
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'sell'
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">💰</span> Sell Shoes
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'profile'
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">⚙️</span> Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-lg p-8 forest-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover-lift">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">${item.price}</p>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-semibold text-gray-900">Total: ${order.total}</p>
                            {order.trackingNumber && (
                              <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                          <div className="space-x-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Track Order
                            </button>
                            <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div className="bg-white rounded-xl shadow-lg p-8 forest-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                  <button
                    onClick={() => setActiveTab('sell')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    + Create New Listing
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listings.map((listing) => (
                    <div key={listing.id} className="border border-gray-200 rounded-xl p-6 hover-lift">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(listing.status)}`}>
                          {listing.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600">Size: <span className="font-medium text-gray-900">{listing.size}</span></p>
                        <p className="text-gray-600">Condition: <span className="font-medium text-gray-900">{listing.condition}</span></p>
                        <p className="text-gray-600">Views: <span className="font-medium text-gray-900">{listing.views}</span></p>
                        <p className="text-gray-600">Posted: <span className="font-medium text-gray-900">{new Date(listing.posted).toLocaleDateString()}</span></p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
                          {listing.originalPrice > listing.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                          )}
                        </div>
                        <div className="space-x-2">
                          <button className="text-green-600 hover:text-green-700 font-medium">Edit</button>
                          <button className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sell Tab - WITH YOUR REQUESTED CHANGES */}
            {activeTab === 'sell' && (
              <div className="bg-white rounded-xl shadow-lg p-8 forest-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sell Your Climbing Shoes</h2>
                <form onSubmit={handleCreateListing} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shoe Brand</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option className="text-gray-900">Select Brand</option>
                        <option className="text-gray-900">La Sportiva</option>
                        <option className="text-gray-900">Scarpa</option>
                        <option className="text-gray-900">Black Diamond</option>
                        <option className="text-gray-900">Evolv</option>
                        <option className="text-gray-900">Five Ten</option>
                        <option className="text-gray-900">Mad Rock</option>
                        <option className="text-gray-900">Butora</option>
                        <option className="text-gray-900">Tenaya</option>
                        <option className="text-gray-900">So iLL</option>
                        <option className="text-gray-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Solution, Instinct, Momentum"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shoe Size (US)</label>
                      <input
                        type="text"
                        placeholder="e.g., 9, 9.5, 10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option className="text-gray-900">Select Condition</option>
                        <option className="text-gray-900">New</option>
                        <option className="text-gray-900">Like New</option>
                        <option className="text-gray-900">Excellent</option>
                        <option className="text-gray-900">Good</option>
                        <option className="text-gray-900">Needs Resole</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows="4"
                      placeholder="Describe the shoes, their condition, any wear, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <ImageUpload 
                      onImagesChange={handleImagesChange}
                      maxImages={5}
                      maxSizeInMB={10}
                    />
                  </div>

                  {/* Additional Options */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-3" />
                        <span className="text-gray-700">Accept offers from buyers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 mr-3" defaultChecked />
                        <span className="text-gray-700">Donate 1% to environmental causes 🌍</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Save Draft
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-lg p-8 forest-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          placeholder="123 Main Street"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          placeholder="Boulder"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          placeholder="CO"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          placeholder="80301"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Cards - Modern Earthy Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <span className="text-green-600 text-sm font-medium">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$1,245</p>
            <p className="text-gray-600 text-sm">Total Sales</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
              <span className="text-blue-600 text-sm font-medium">+8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">342</p>
            <p className="text-gray-600 text-sm">Profile Views</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <span className="text-amber-600 text-sm font-medium">New</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">18</p>
            <p className="text-gray-600 text-sm">Messages</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-purple-600 text-sm font-medium">4.8</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-gray-600 text-sm">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}