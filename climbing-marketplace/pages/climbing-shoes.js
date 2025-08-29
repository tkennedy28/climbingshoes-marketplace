import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { getCartCount } = useCart();


  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);


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


  const handleShopNowClick = () => {
    console.log('🛍️ Shop now clicked');
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-stone-50`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-amber-800">The Climbing Shoe Shop</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
              onClick={() => router.push('/')}
              className="text-stone-700 hover:text-amber-700 transition-colors"
              >
                The Gear Wall
              </button>
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
                onClick={() => router.push('/admin')}
                className="text-red-700 hover:text-red-800 text-sm transition-colors"
              >
                Admin
              </button> */}
            </nav>
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
              {user ? (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-stone-800">
              The Ultimate<br />
              <span className="text-amber-700">Climbing Shoe</span><br />
              <span className="text-stone-700">Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-stone-600">
              Buy, sell, and discover the perfect climbing shoes for every route
            </p>
            <button
              onClick={() => router.push('/marketplace')}
              className="bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors shadow-lg"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>


      {/* Marketplace Section */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Community Marketplace</h2>
            <p className="text-xl text-stone-600 mb-8">Buy and sell climbing shoes with fellow climbers worldwide</p>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧗‍♀️</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Trusted Community</h3>
              <p className="text-stone-600">Buy from verified climbers with ratings and reviews</p>
            </div>
           
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏔️</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Great Deals</h3>
              <p className="text-stone-600">Find quality used shoes at unbeatable prices</p>
            </div>
           
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Sustainable</h3>
              <p className="text-stone-600">Give shoes a second life and reduce waste</p>
            </div>
          </div>
         
          <div className="text-center">
            <button
              onClick={() => router.push('/marketplace')}
              className="bg-stone-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-800 transition-colors mr-4 shadow-md"
            >
              Browse Marketplace
            </button>
            {user ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors shadow-md"
              >
                Sell Your Shoes
              </button>
            ) : (
              <button
                onClick={() => router.push('/auth')}
                className="bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors shadow-md"
              >
                Start Selling
              </button>
            )}
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">Featured Climbing Shoes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-stone-200">
              <button
                onClick={() => router.push('/product/solution')}
                className="w-full text-left"
              >
                <div className="h-64 bg-stone-100 flex items-center justify-center">
                  <span className="text-stone-500">Product Image</span>
                </div>
              </button>
              <div className="p-6">
                <button
                  onClick={() => router.push('/product/solution')}
                  className="w-full text-left"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:text-amber-700 transition-colors text-stone-800">La Sportiva Solution</h3>
                </button>
                <p className="text-stone-600 mb-4">Aggressive downturned shoe for overhangs</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-700">$199</span>
                  <button
                    onClick={() => handleBuyNow('solution')}
                    className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>


            {/* Product Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-stone-200">
              <button
                onClick={() => router.push('/product/instinct')}
                className="w-full text-left"
              >
                <div className="h-64 bg-stone-100 flex items-center justify-center">
                  <span className="text-stone-500">Product Image</span>
                </div>
              </button>
              <div className="p-6">
                <button
                  onClick={() => router.push('/product/instinct')}
                  className="w-full text-left"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:text-amber-700 transition-colors text-stone-800">Scarpa Instinct</h3>
                </button>
                <p className="text-stone-600 mb-4">Versatile shoe for all climbing styles</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-700">$179</span>
                  <button
                    onClick={() => handleBuyNow('instinct')}
                    className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>


            {/* Product Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-stone-200">
              <button
                onClick={() => router.push('/product/momentum')}
                className="w-full text-left"
              >
                <div className="h-64 bg-stone-100 flex items-center justify-center">
                  <span className="text-stone-500">Product Image</span>
                </div>
              </button>
              <div className="p-6">
                <button
                  onClick={() => router.push('/product/momentum')}
                  className="w-full text-left"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:text-amber-700 transition-colors text-stone-800">Black Diamond Momentum</h3>
                </button>
                <p className="text-stone-600 mb-4">Comfortable beginner-friendly shoe</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-700">$99</span>
                  <button
                    onClick={() => handleBuyNow('momentum')}
                    className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-200">ClimbingShoeShop.com</h3>
              <p className="text-stone-300">The best online marketplace for climbing shoes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-200">Shop</h4>
              <ul className="space-y-2 text-stone-300">
                <li><Link href="/marketplace">All Shoes</Link></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Brands</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-200">Support</h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="/how-it-works" className="hover:text-amber-200 transition-colors">How It Works</a></li>
                <li><Link href="/size-guide">Size Guide</Link></li>
                <li><Link href="/resolers">Recommended Resolers</Link></li>
                <li><Link href="/comparison">Compare Shoes</Link></li>
                <li><Link href="/returns">Returns</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-200">Connect</h4>
              <ul className="space-y-2 text-stone-300">
                <li><a href="#" className="hover:text-amber-200 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/returns" className="hover:underline">
              Return Policy
            </Link>
          </div>
        </div>
            <p>&copy; 2025 ClimbingShoes.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
