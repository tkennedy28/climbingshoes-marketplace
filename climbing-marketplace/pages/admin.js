import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Sample admin data
  const [stats] = useState({
    totalUsers: 1247,
    totalOrders: 892,
    totalListings: 456,
    totalRevenue: 78420,
    monthlyGrowth: 12.5,
    activeListings: 234,
    pendingOrders: 23,
    newUsersToday: 8
  });

  const [users] = useState([
    {
      id: 'USR-001',
      name: 'John Climber',
      email: 'john@example.com',
      joinDate: '2024-12-15',
      orders: 3,
      listings: 2,
      status: 'Active',
      totalSpent: 567
    },
    {
      id: 'USR-002',
      name: 'Sarah Boulder',
      email: 'sarah@example.com',
      joinDate: '2024-11-22',
      orders: 5,
      listings: 1,
      status: 'Active',
      totalSpent: 890
    },
    {
      id: 'USR-003',
      name: 'Mike Route',
      email: 'mike@example.com',
      joinDate: '2024-10-10',
      orders: 0,
      listings: 3,
      status: 'Suspended',
      totalSpent: 0
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Climber',
      date: '2025-01-15',
      items: 'La Sportiva Solution',
      total: 199,
      status: 'Delivered',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Boulder',
      date: '2025-01-14',
      items: 'Scarpa Instinct',
      total: 179,
      status: 'Shipped',
      paymentStatus: 'Paid'
    },
    {
      id: 'ORD-003',
      customer: 'Alex Sender',
      date: '2025-01-13',
      items: 'Black Diamond Momentum',
      total: 99,
      status: 'Processing',
      paymentStatus: 'Pending'
    }
  ]);

  const [listings] = useState([
    {
      id: 'LST-001',
      seller: 'John Climber',
      title: 'Evolv Shaman (Used)',
      price: 85,
      condition: 'Good',
      status: 'Active',
      posted: '2025-01-12',
      views: 24,
      flagged: false
    },
    {
      id: 'LST-002',
      seller: 'Mike Route',
      title: 'Five Ten Hiangle (Suspicious)',
      price: 50,
      condition: 'New',
      status: 'Pending Review',
      posted: '2025-01-10',
      views: 2,
      flagged: true
    },
    {
      id: 'LST-003',
      seller: 'Sarah Boulder',
      title: 'Mad Rock Drone HV',
      price: 120,
      condition: 'Like New',
      status: 'Sold',
      posted: '2025-01-08',
      views: 45,
      flagged: false
    }
  ]);

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // In a real app, check if user has admin role
      if (parsedUser.email === 'admin@climbgear.com' || parsedUser.role === 'admin' || parsedUser.isAdmin) {
        setUser(parsedUser);
        setLoading(false);
      } else {
        alert('Access denied. Admin privileges required.');
        router.push('/');
      }
    } else {
      router.push('/admin-auth');
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': case 'delivered': case 'paid': return 'text-green-600 bg-green-100';
      case 'shipped': case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': case 'pending review': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': case 'cancelled': return 'text-red-600 bg-red-100';
      case 'sold': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleApprove = (listingId) => {
    alert(`Approved listing ${listingId}`);
  };

  const handleReject = (listingId) => {
    alert(`Rejected listing ${listingId}`);
  };

  const handleSuspendUser = (userId) => {
    alert(`Suspended user ${userId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700"
              >
                ClimbGear
              </button>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                ADMIN PANEL
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin: {user?.firstName}</span>
              <button 
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-800 mr-2"
              >
                Back to Site
              </button>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'users'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  👥 Users
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'orders'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📦 Orders
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'listings'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🏷️ Listings
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'reports'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📈 Reports
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium ${
                    activeTab === 'settings'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ⚙️ Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        👥
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        📦
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        🏷️
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Active Listings</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        💰
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setActiveTab('listings')}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
                      >
                        Review Pending Listings ({listings.filter(l => l.status === 'Pending Review').length})
                      </button>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
                      >
                        Process Orders ({stats.pendingOrders})
                      </button>
                      <button 
                        onClick={() => setActiveTab('listings')}
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700"
                      >
                        View Flagged Content ({listings.filter(l => l.flagged).length})
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">New user registered</span>
                        <span className="text-sm text-gray-500">2 min ago</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Order completed</span>
                        <span className="text-sm text-gray-500">15 min ago</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Listing flagged</span>
                        <span className="text-sm text-gray-500">1 hour ago</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Payment processed</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.orders}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.listings}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.totalSpent}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button 
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              {user.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>All Orders</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Listing Management</h2>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>All Listings</option>
                        <option>Active</option>
                        <option>Pending Review</option>
                        <option>Flagged</option>
                        <option>Sold</option>
                      </select>
                      <button 
                        onClick={() => alert('Showing flagged content for review')}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Review Flagged
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listings.map((listing) => (
                        <tr key={listing.id} className={listing.flagged ? 'bg-red-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {listing.flagged && <span className="text-red-500 mr-2">🚩</span>}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                                <div className="text-sm text-gray-500">{listing.condition}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.seller}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${listing.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(listing.posted).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.views}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {listing.status === 'Pending Review' && (
                              <>
                                <button 
                                  onClick={() => handleApprove(listing.id)}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  ✓ Approve
                                </button>
                                <button 
                                  onClick={() => handleReject(listing.id)}
                                  className="text-red-600 hover:text-red-900 mr-3"
                                >
                                  ✗ Reject
                                </button>
                              </>
                            )}
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Platform Reports & Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Analytics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-bold text-gray-900">$12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Month</span>
                        <span className="font-bold text-gray-900">$10,890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth</span>
                        <span className="font-bold text-green-600">+14.3%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">New Users (30 days)</span>
                        <span className="font-bold text-gray-900">124</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-bold text-gray-900">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retention Rate</span>
                        <span className="font-bold text-blue-600">78%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Top Selling Brands</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>La Sportiva</span>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Scarpa</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Black Diamond</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Five Ten</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Others</span>
                        <span className="font-medium">8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Popular Sizes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>US 9</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>US 8.5</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>US 10</span>
                        <span className="font-medium">16%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>US 8</span>
                        <span className="font-medium">14%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Others</span>
                        <span className="font-medium">30%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Revenue Trends</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>January</span>
                        <span className="font-medium text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>December</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>November</span>
                        <span className="font-medium text-green-600">+8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>October</span>
                        <span className="font-medium text-red-600">-3%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => alert('Exporting sales report...')}
                      className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
                    >
                      📊 Sales Report (CSV)
                    </button>
                    <button 
                      onClick={() => alert('Exporting user report...')}
                      className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
                    >
                      👥 User Report (CSV)
                    </button>
                    <button 
                      onClick={() => alert('Exporting listing report...')}
                      className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700"
                    >
                      🏷️ Listing Report (CSV)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                          type="text"
                          defaultValue="ClimbGear"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input
                          type="email"
                          defaultValue="admin@climbgear.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="maintenance"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="maintenance" className="ml-2 text-sm text-gray-700">
                          Maintenance Mode
                        </label>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          alert('General settings saved!');
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>

                  {/* Listing Settings */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Listing Settings</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                        <input
                          type="number"
                          defaultValue="5"
                          min="0"
                          max="20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Listing Price ($)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="autoApprove"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="autoApprove" className="ml-2 text-sm text-gray-700">
                          Auto-approve trusted sellers
                        </label>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Listing settings saved!');
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
                      <input
                        type="text"
                        placeholder="pk_live_..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
                      <input
                        type="password"
                        placeholder="sk_live_..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Security Note:</strong> Store sensitive keys in environment variables, not in the database.
                    </p>
                  </div>
                  <button 
                    onClick={() => alert('Payment settings updated!')}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Update Payment Settings
                  </button>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Moderation</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Auto-flag suspicious listings</h4>
                        <p className="text-sm text-gray-500">Automatically flag listings with suspicious keywords or prices</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email notifications for admin</h4>
                        <p className="text-sm text-gray-500">Get notified of flagged content and disputes</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Rate limiting</h4>
                        <p className="text-sm text-gray-500">Limit API requests per user to prevent abuse</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Security settings saved!')}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Security Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}