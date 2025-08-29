import { useState } from 'react';

export default function SellerOffersDashboard({ listings, currentUser }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [offers, setOffers] = useState([
    {
      id: 1,
      listingId: 'LST-001',
      listingTitle: 'La Sportiva Solution - Like New',
      buyerName: 'Alex Chen',
      buyerRating: 4.7,
      offerAmount: 130,
      originalPrice: 150,
      message: "Hi! I'm very interested in these shoes. Would you accept $130? I can pick them up today and pay cash.",
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 2).toISOString()
    },
    {
      id: 2,
      listingId: 'LST-001',
      listingTitle: 'La Sportiva Solution - Like New',
      buyerName: 'Sarah Johnson',
      buyerRating: 4.9,
      offerAmount: 140,
      originalPrice: 150,
      message: "These look perfect! I can offer $140 and pick up this weekend.",
      status: 'pending',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 2).toISOString()
    },
    {
      id: 3,
      listingId: 'LST-002',
      listingTitle: 'Scarpa Instinct VS',
      buyerName: 'Mike Thompson',
      buyerRating: 4.5,
      offerAmount: 100,
      originalPrice: 120,
      message: "Would you take $100 for quick sale?",
      status: 'declined',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const [counterOfferAmount, setCounterOfferAmount] = useState('');
  const [counterOfferMessage, setCounterOfferMessage] = useState('');
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const pendingOffers = offers.filter(o => o.status === 'pending');
  const acceptedOffers = offers.filter(o => o.status === 'accepted');
  const declinedOffers = offers.filter(o => o.status === 'declined');

  const handleAcceptOffer = (offerId) => {
    if (confirm('Are you sure you want to accept this offer? This will mark the item as sold.')) {
      setOffers(offers.map(offer => 
        offer.id === offerId 
          ? { ...offer, status: 'accepted' }
          : offer.listingId === offers.find(o => o.id === offerId).listingId 
            ? { ...offer, status: 'declined' }
            : offer
      ));
      alert('Offer accepted! The buyer will be notified and can proceed with payment.');
    }
  };

  const handleDeclineOffer = (offerId) => {
    if (confirm('Are you sure you want to decline this offer?')) {
      setOffers(offers.map(offer => 
        offer.id === offerId ? { ...offer, status: 'declined' } : offer
      ));
    }
  };

  const handleCounterOffer = (offer) => {
    setSelectedOffer(offer);
    setCounterOfferAmount(offer.offerAmount.toString());
    setShowCounterOfferModal(true);
  };

  const submitCounterOffer = () => {
    if (!counterOfferAmount || counterOfferAmount < 1) return;

    setOffers(offers.map(offer => 
      offer.id === selectedOffer.id 
        ? { 
            ...offer, 
            status: 'countered',
            counterOffer: {
              amount: parseFloat(counterOfferAmount),
              message: counterOfferMessage,
              timestamp: new Date().toISOString()
            }
          }
        : offer
    ));

    setShowCounterOfferModal(false);
    setCounterOfferAmount('');
    setCounterOfferMessage('');
    alert('Counter offer sent to the buyer!');
  };

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) return 'Expired';
    if (hours < 24) return `${hours}h remaining`;
    return `${Math.floor(hours / 24)}d remaining`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Offers</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Offers</p>
              <p className="text-2xl font-bold text-amber-700">{pendingOffers.length}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{acceptedOffers.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Declined</p>
              <p className="text-2xl font-bold text-gray-600">{declinedOffers.length}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Offer %</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  offers.reduce((sum, o) => sum + (o.offerAmount / o.originalPrice * 100), 0) / offers.length
                )}%
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Offers */}
      {pendingOffers.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Pending Offers - Action Required</h3>
          <div className="space-y-4">
            {pendingOffers.map(offer => (
              <div key={offer.id} className="bg-white rounded-lg shadow border border-amber-200 overflow-hidden">
                <div className="bg-amber-50 px-6 py-2 border-b border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-amber-800">{offer.listingTitle}</span>
                    <span className="text-sm text-amber-600">
                      ⏱️ {getTimeRemaining(offer.expiresAt)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{offer.buyerName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{offer.buyerName}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">{offer.buyerRating} rating</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-600 mb-1">Offer Message:</p>
                        <p className="text-gray-800">"{offer.message}"</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="mb-2">
                        <p className="text-3xl font-bold text-green-600">${offer.offerAmount}</p>
                        <p className="text-sm text-gray-500">Listed at ${offer.originalPrice}</p>
                        <p className="text-sm font-medium text-gray-700">
                          {Math.round((offer.offerAmount / offer.originalPrice) * 100)}% of asking
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 font-medium transition"
                    >
                      Accept Offer
                    </button>
                    <button
                      onClick={() => handleCounterOffer(offer)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                      Counter Offer
                    </button>
                    <button
                      onClick={() => handleDeclineOffer(offer.id)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offer History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Offer History</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {offers.map(offer => (
                <tr key={offer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {offer.listingTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.buyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${offer.offerAmount}
                    <span className="text-gray-500 ml-1">
                      ({Math.round((offer.offerAmount / offer.originalPrice) * 100)}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      offer.status === 'countered' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(offer.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Counter Offer Modal */}
      {showCounterOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Make Counter Offer</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Original offer: <span className="font-semibold">${selectedOffer.offerAmount}</span>
              </p>
              <p className="text-sm text-gray-600">
                Your listing price: <span className="font-semibold">${selectedOffer.originalPrice}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Counter Offer Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={counterOfferAmount}
                  onChange={(e) => setCounterOfferAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  min={selectedOffer.offerAmount}
                  max={selectedOffer.originalPrice}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={counterOfferMessage}
                onChange={(e) => setCounterOfferMessage(e.target.value)}
                placeholder="Explain your counter offer..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitCounterOffer}
                className="flex-1 bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 font-medium"
              >
                Send Counter Offer
              </button>
              <button
                onClick={() => {
                  setShowCounterOfferModal(false);
                  setCounterOfferAmount('');
                  setCounterOfferMessage('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}