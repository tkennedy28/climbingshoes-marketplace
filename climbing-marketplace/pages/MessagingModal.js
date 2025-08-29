import { useState, useEffect, useRef } from 'react';

export default function MessagingModal({ 
  isOpen, 
  onClose, 
  listing, 
  currentUser,
  mode = 'message' // 'message' or 'offer'
}) {
  const [activeTab, setActiveTab] = useState(mode);
  const [message, setMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample conversation data
  useEffect(() => {
    if (isOpen && listing) {
      // Load existing messages (in real app, fetch from API)
      setMessages([
        {
          id: 1,
          sender: listing.seller.name,
          senderType: 'seller',
          message: "Hi! Thanks for your interest in these climbing shoes. They're in great condition!",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true
        },
        {
          id: 2,
          sender: currentUser?.name || 'You',
          senderType: 'buyer',
          message: "Are these still available? I'm very interested!",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          read: true
        }
      ]);

      // Load existing offers
      setOffers([
        {
          id: 1,
          amount: 130,
          status: 'pending', // pending, accepted, declined, countered
          message: "Would you accept $130? I can pick up today.",
          sender: 'John D.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          counterOffer: null
        }
      ]);
    }
  }, [isOpen, listing, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    
    // Add message to conversation
    const newMessage = {
      id: messages.length + 1,
      sender: currentUser?.name || 'You',
      senderType: 'buyer',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // In real app, send to API
    setTimeout(() => {
      setSending(false);
      // Simulate seller response
      if (message.toLowerCase().includes('available')) {
        const response = {
          id: messages.length + 2,
          sender: listing.seller.name,
          senderType: 'seller',
          message: "Yes, they're still available! Would you like to meet up to see them?",
          timestamp: new Date().toISOString(),
          read: false
        };
        setMessages(prev => [...prev, response]);
      }
    }, 1000);
  };

  const handleMakeOffer = async (e) => {
    e.preventDefault();
    if (!offerAmount || offerAmount < 1) return;

    setSending(true);

    const newOffer = {
      id: offers.length + 1,
      amount: parseFloat(offerAmount),
      status: 'pending',
      message: offerMessage.trim(),
      sender: currentUser?.name || 'You',
      timestamp: new Date().toISOString(),
      counterOffer: null
    };

    setOffers([...offers, newOffer]);
    setOfferAmount('');
    setOfferMessage('');

    // Also add to messages
    const offerNotification = {
      id: messages.length + 1,
      sender: currentUser?.name || 'You',
      senderType: 'buyer',
      message: `Made an offer of $${offerAmount}${offerMessage ? `: ${offerMessage}` : ''}`,
      timestamp: new Date().toISOString(),
      read: false,
      isOffer: true
    };
    setMessages([...messages, offerNotification]);

    setTimeout(() => {
      setSending(false);
      alert('Offer sent! The seller will be notified.');
    }, 1000);
  };

  const getOfferStatusBadge = (status) => {
    const badges = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-green-100 text-green-800',
      'declined': 'bg-red-100 text-red-800',
      'countered': 'bg-blue-100 text-blue-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
                <span className="text-sm text-gray-500">Listed by {listing.seller.name}</span>
                {listing.acceptsOffers && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Accepts Offers
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          {listing.acceptsOffers && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setActiveTab('message')}
                className={`pb-2 px-1 border-b-2 transition ${
                  activeTab === 'message' 
                    ? 'border-amber-700 text-amber-700 font-medium' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab('offer')}
                className={`pb-2 px-1 border-b-2 transition ${
                  activeTab === 'offer' 
                    ? 'border-amber-700 text-amber-700 font-medium' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Make Offer
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-2 px-1 border-b-2 transition relative ${
                  activeTab === 'history' 
                    ? 'border-amber-700 text-amber-700 font-medium' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Offer History
                {offers.length > 0 && (
                  <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {offers.filter(o => o.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Messages Tab */}
          {activeTab === 'message' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderType === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      msg.senderType === 'buyer' 
                        ? 'bg-amber-700 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg px-4 py-2`}>
                      {msg.isOffer && (
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs font-semibold">Offer Made</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderType === 'buyer' ? 'text-amber-200' : 'text-gray-500'
                      }`}>
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Make Offer Tab */}
          {activeTab === 'offer' && (
            <div className="p-6">
              <form onSubmit={handleMakeOffer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Offer Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      placeholder="0.00"
                      min="1"
                      max={listing.price}
                      step="1"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Listing price: ${listing.price} • 
                    {offerAmount && (
                      <span className={offerAmount < listing.price * 0.7 ? 'text-orange-600' : 'text-green-600'}>
                        {' '}Your offer is {Math.round((1 - offerAmount/listing.price) * 100)}% below asking
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Seller (Optional)
                  </label>
                  <textarea
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="Add a message with your offer... (e.g., 'I can pick up today' or 'Would you consider $X?')"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Offer Guidelines</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Make reasonable offers (typically 70-90% of asking price)</li>
                    <li>• Include a message explaining your offer</li>
                    <li>• Sellers have 48 hours to respond</li>
                    <li>• You can make one offer every 24 hours per listing</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={sending || !offerAmount || offerAmount < 1}
                  className="w-full py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {sending ? 'Sending Offer...' : 'Send Offer'}
                </button>
              </form>
            </div>
          )}

          {/* Offer History Tab */}
          {activeTab === 'history' && (
            <div className="p-6">
              {offers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>No offers yet</p>
                  <p className="text-sm mt-1">Be the first to make an offer!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {offers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xl font-bold">${offer.amount}</span>
                          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getOfferStatusBadge(offer.status)}`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(offer.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">From: {offer.sender}</p>
                      
                      {offer.message && (
                        <p className="text-sm text-gray-700 italic mb-2">"{offer.message}"</p>
                      )}

                      {offer.status === 'countered' && offer.counterOffer && (
                        <div className="mt-2 p-2 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-blue-900">
                            Counter Offer: ${offer.counterOffer.amount}
                          </p>
                          {offer.counterOffer.message && (
                            <p className="text-sm text-blue-700 mt-1">"{offer.counterOffer.message}"</p>
                          )}
                        </div>
                      )}

                      {offer.status === 'pending' && offer.sender === (currentUser?.name || 'You') && (
                        <div className="mt-3 flex gap-2">
                          <button className="text-sm text-gray-600 hover:text-gray-800">
                            Withdraw Offer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}