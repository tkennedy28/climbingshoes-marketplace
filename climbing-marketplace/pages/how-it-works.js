import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('buying');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>How It Works - Climbing Shoe Shop</title>
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4 text-center">How It Works</h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Your trusted marketplace for buying and selling climbing shoes
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button
            onClick={() => setActiveTab('buying')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'buying'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            How to Buy
          </button>
          <button
            onClick={() => setActiveTab('selling')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'selling'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            How to Sell
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'fees'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Fees & Pricing
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'shipping'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Shipping Guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Buying Tab */}
          {activeTab === 'buying' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Buying is Simple & Secure</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Browse & Search</h3>
                    <p className="text-gray-600">Find your perfect climbing shoes using filters for brand, size, style, and price</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Secure Checkout</h3>
                    <p className="text-gray-600">Pay safely with Stripe. Your payment info is never shared with sellers</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Fast Delivery</h3>
                    <p className="text-gray-600">Sellers ship within 5 days. Track your package every step</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-3">Buyer Protection Guarantee</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Full refund if item doesn&apos;t arrive</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Full refund if item is significantly not as described</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Secure payment processing with fraud protection</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Buying Tips</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Check the seller&apos;s ratings and reviews before purchasing</li>
                    <li>• Read item descriptions carefully, especially for used shoes</li>
                    <li>• Ask sellers questions using the messaging feature</li>
                    <li>• Review our size guide - climbing shoes fit differently than street shoes</li>
                    <li>• For used shoes, ask about the amount of wear and any odor issues</li>
                    <li>• Check if the seller accepts returns before buying</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Buyers FAQs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <strong>Who am I sending my money to?</strong>
                    <li>• Climbing Shoe Shop where we hold your money until the item safely arrives.</li>
                    <strong>How am I protected using Climbing Shoe Shop?</strong>
                    <li>• You are protected on Climbing Shoe Shop only when you:</li>
                    <li>    1. Pay using the integrated payment system on the Climbing Shoe Shop.</li>
                    <li>    2. Film a complete unboxing video following the unboxing guidelines.</li>
                    <li>Your funds are protected through the Climbing Shoe Shop where we hold your money until you confirm safe delivery, or until 72 hours pass without your response after delivery. If the item does not get shipped, arrives damaged, or is not as described, you may qualify for a refund, provided you meet the specified criteria outlined in our refund policy.</li>
                    <strong>Do I pay a fee?</strong>
                    <li>• When you make a purchase there is a 2% Buyer Protection Fee that is capped at $20. Sales tax may be added based on state requirements and your shipping address.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Selling Tab */}
          {activeTab === 'selling' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Start Selling in Minutes</h2>
                
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">Create Account</h3>
                    <p className="text-gray-600 text-xs">Sign up for free in seconds</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">List Your Shoes</h3>
                    <p className="text-gray-600 text-xs">Add photos, description, and price</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-green-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">Make a Sale</h3>
                    <p className="text-gray-600 text-xs">Get notified instantly when sold</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-green-600">4</span>
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">Ship & Get Paid</h3>
                    <p className="text-gray-600 text-xs">Ship within 5 days, get paid fast</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-3">Creating the Perfect Listing</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <strong>Photos (Required: 3-8 photos)</strong>
                      <ul className="ml-4 mt-1 text-sm">
                        <li>• Both shoes from multiple angles</li>
                        <li>• Close-ups of toe box, heel, and sole wear</li>
                        <li>• Any defects or unique features</li>
                        <li>• Size tag if visible</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Title</strong>
                      <p className="text-sm mt-1">Include: Brand + Model + Size + Condition (e.g., "La Sportiva Solution 42.5 - Like New")</p>
                    </div>
                    <div>
                      <strong>Description</strong>
                      <ul className="ml-4 mt-1 text-sm">
                        <li>• How long you&apos;ve owned them</li>
                        <li>• Frequency of use</li>
                        <li>• Type of climbing (gym/outdoor)</li>
                        <li>• Reason for selling</li>
                        <li>• Any modifications or repairs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Pricing Guidelines</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><strong>New with tags:</strong> 80-90% of retail</li>
                      <li><strong>Like new (worn 1-3x):</strong> 70-80% of retail</li>
                      <li><strong>Excellent (light wear):</strong> 50-70% of retail</li>
                      <li><strong>Good (moderate wear):</strong> 35-50% of retail</li>
                      <li><strong>Fair (heavy wear):</strong> 20-35% of retail</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Seller Best Practices</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Respond to questions within 24 hours</li>
                      <li>• Ship within 5 days</li>
                      <li>• Use tracking on all shipments</li>
                      <li>• Be honest about condition</li>
                      <li>• Clean shoes before shipping</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">What NOT to Sell</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>❌ Counterfeit or replica shoes</li>
                    <li>❌ Shoes with structural damage affecting safety</li>
                    <li>❌ Stolen merchandise</li>
                    <li>❌ Items other than climbing shoes (unless in designated sections)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Simple, Transparent Pricing</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">8% + $1 Marketplace Fee</h3>
                    <p className="text-gray-600">Only charged when you make a sale</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">For Sellers</h3>
                    <div className="space-y-3">
                      <div>
                        <strong>Listing Fees:</strong>
                        <p className="text-gray-600">FREE - List unlimited items</p>
                      </div>
                      <div>
                        <strong>Sale Fee:</strong>
                        <p className="text-gray-600">8% of sale price + $1 (including shipping)</p>
                      </div>
                      <div className="pt-3 border-t">
                        <strong>Total Fees:</strong>
                        <p className="text-gray-600">8% + $1 per sale</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">For Buyers</h3>
                    <div className="space-y-3">
                      <div>
                        <strong>Purchase Fee:</strong>
                        <p className="text-gray-600">2% capped at $20</p>
                      </div>
                      <div>
                        <strong>What You Pay:</strong>
                        <p className="text-gray-600">Item price + 2% + Shipping (if applicable)</p>
                      </div>
                      <div>
                        <strong>Payment Methods:</strong>
                        <p className="text-gray-600">All major credit/debit cards</p>
                      </div>
                      <div className="pt-3 border-t">
                        <strong>Buyer Protection:</strong>
                        <p className="text-gray-600">Included on all purchases</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Fee Examples</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Sale Price</th>
                          <th className="text-left py-2">8% Marketplace Fee</th>
                          <th className="text-left py-2">$1 Marketplace Fee</th>
                          <th className="text-left py-2">Total Fees</th>
                          <th className="text-left py-2 font-bold">You Receive</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">$50.00</td>
                          <td className="py-2">$4.00</td>
                          <td className="py-2">$1.00</td>
                          <td className="py-2">$5.00</td>
                          <td className="py-2 font-semibold">$45.00</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">$100.00</td>
                          <td className="py-2">$8.00</td>
                          <td className="py-2">$1.00</td>
                          <td className="py-2">$9.00</td>
                          <td className="py-2 font-semibold">$91.00</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">$150.00</td>
                          <td className="py-2">$12.00</td>
                          <td className="py-2">$1.00</td>
                          <td className="py-2">$13.00</td>
                          <td className="py-2 font-semibold">$137.00</td>
                        </tr>
                        <tr>
                          <td className="py-2">$200.00</td>
                          <td className="py-2">$16.00</td>
                          <td className="py-2">$1.00</td>
                          <td className="py-2">$17.00</td>
                          <td className="py-2 font-semibold">$183.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">When You Get Paid</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Funds available 2 days after delivery confirmation</li>
                      <li>• Direct deposit to your bank account</li>
                      <li>• Weekly automatic payouts</li>
                      <li>• No minimum payout amount</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Why Our Fees?</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Secure payment processing</li>
                      <li>• Buyer & seller protection</li>
                      <li>• Customer support team</li>
                      <li>• Platform maintenance & improvements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Shipping Guide</h2>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold text-lg mb-3">Shipping Requirements for Sellers</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Ship within 5 days of sale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Use tracking on all shipments (required)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Upload tracking number to order</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Package shoes securely to prevent damage</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Recommended Shipping Methods</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>USPS Priority Mail</strong>
                        <p className="text-gray-600">2-3 business days • $9-15</p>
                        <p className="text-gray-500">Best value for most shipments</p>
                      </div>
                      <div>
                        <strong>UPS Ground</strong>
                        <p className="text-gray-600">3-5 business days • $12-18</p>
                        <p className="text-gray-500">Good for heavier packages</p>
                      </div>
                      <div>
                        <strong>FedEx Home Delivery</strong>
                        <p className="text-gray-600">3-5 business days • $10-16</p>
                        <p className="text-gray-500">Reliable residential delivery</p>
                      </div>
                      <div>
                        <strong>USPS First Class (under 1 lb)</strong>
                        <p className="text-gray-600">3-5 business days • $5-8</p>
                        <p className="text-gray-500">Budget option for single lightweight shoes</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Packaging Tips</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Box Size:</strong> 12" x 8" x 5" typically fits most shoes</p>
                      <p><strong>Weight:</strong> Most climbing shoes: 1-2 lbs per pair</p>
                      <div className="pt-2">
                        <strong>Materials Needed:</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>• Sturdy cardboard box</li>
                          <li>• Bubble wrap or packing paper</li>
                          <li>• Packing tape</li>
                          <li>• Plastic bag (for weather protection)</li>
                        </ul>
                      </div>
                      <div className="pt-2">
                        <strong>Packing Steps:</strong>
                        <ol className="ml-4 mt-1 space-y-1 list-decimal">
                          <li>Place shoes in plastic bag</li>
                          <li>Fill empty space in box</li>
                          <li>Seal securely with tape</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Shipping Costs</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Who Pays for Shipping?</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li><strong>Buyer pays:</strong> Default option</li>
                        <li><strong>Free shipping:</strong> Seller can offer to increase sales</li>
                        <li><strong>Calculated at checkout:</strong> Based on buyer location</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Average Shipping Costs</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li><strong>Same state:</strong> $8-12</li>
                        <li><strong>Neighboring states:</strong> $10-15</li>
                        <li><strong>Cross-country:</strong> $12-20</li>
                        <li><strong>Express (2-day):</strong> $25-40</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Print Labels at Home</h4>
                    <p className="text-xs text-gray-700">Save up to 30% by printing labels online through USPS, UPS, or FedEx</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Schedule Pickups</h4>
                    <p className="text-xs text-gray-700">Most carriers offer free pickup service - no trip to post office needed</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Reuse Materials</h4>
                    <p className="text-xs text-gray-700">Save original shoe boxes and Amazon boxes for eco-friendly shipping</p>
                  </div>
                </div>

                <div className="border-2 border-red-200 bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Important Shipping Rules</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>⚠️ Always use tracking - required for seller protection</li>
                    <li>⚠️ Ship to the address provided by the buyer - no exceptions</li>
                    <li>⚠️ Keep receipts and tracking info until delivery is confirmed</li>
                    <li>⚠️ Insurance recommended for items over $100</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">International Shipping</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Currently:</strong> Sellers can choose to offer international shipping</p>
                    <p><strong>Customs:</strong> Buyer responsible for duties and taxes</p>
                    <p><strong>Shipping time:</strong> 1-4 weeks depending on destination</p>
                    <p><strong>Cost:</strong> Typically $25-60 via USPS International</p>
                    <p><strong>Required:</strong> Customs form with accurate value declaration</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Have More Questions?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Support →
            </Link>
            <Link href="/marketplace" className="text-blue-600 hover:underline">
              Browse Marketplace →
            </Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Start Selling →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}