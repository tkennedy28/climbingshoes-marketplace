import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, isInCart, getCartCount } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Sample product data - this will come from your backend later
  const products = {
    'solution': {
      id: 'solution',
      name: 'La Sportiva Solution',
      price: 199,
      originalPrice: 219,
      brand: 'La Sportiva',
      description: 'The Solution is an aggressive, downturned climbing shoe designed for steep overhangs and bouldering. With its sticky Vibram XS Grip2 rubber and precise fit, it excels on technical routes.',
      features: [
        'Aggressive downturn for overhangs',
        'Vibram XS Grip2 rubber outsole',
        'Fast Lacing System for quick adjustments',
        'Lined leather upper for durability',
        'P3 midsole for power transmission'
      ],
      sizes: ['US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10'],
      inStock: true,
      stockCount: 15,
      images: ['/product-solution-1.jpg', '/product-solution-2.jpg'],
      category: 'Sport Climbing',
      condition: 'New',
      seller: {
        name: 'ClimbGear Store',
        rating: 4.9,
        isStore: true
      },
      reviews: {
        average: 4.7,
        count: 124
      }
    },
    'instinct': {
      id: 'instinct',
      name: 'Scarpa Instinct',
      price: 179,
      originalPrice: 199,
      brand: 'Scarpa',
      description: 'The Instinct combines performance and comfort for all-day climbing. Perfect for both indoor training and outdoor sport climbing, with excellent sensitivity and precision.',
      features: [
        'Moderate downturn for versatility',
        'Vibram XS Edge rubber for precision',
        'Microfiber upper with leather heel',
        'Bi-Tension active randing system',
        'Comfortable for extended wear'
      ],
      sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      inStock: true,
      stockCount: 8,
      images: ['/product-instinct-1.jpg', '/product-instinct-2.jpg'],
      category: 'All-Around',
      condition: 'New',
      seller: {
        name: 'ClimbGear Store',
        rating: 4.9,
        isStore: true
      },
      reviews: {
        average: 4.5,
        count: 89
      }
    },
    'momentum': {
      id: 'momentum',
      name: 'Black Diamond Momentum',
      price: 99,
      originalPrice: 109,
      brand: 'Black Diamond',
      description: 'Perfect for beginners and gym climbers, the Momentum offers comfort and performance at an accessible price point. Great for learning proper technique.',
      features: [
        'Comfortable flat profile',
        'Sticky rubber for grip',
        'Breathable design',
        'Easy slip-on with velcro closure',
        'Ideal for beginners'
      ],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
      inStock: true,
      stockCount: 25,
      images: ['/product-momentum-1.jpg'],
      category: 'Beginner',
      condition: 'New',
      seller: {
        name: 'ClimbGear Store',
        rating: 4.9,
        isStore: true
      },
      reviews: {
        average: 4.3,
        count: 67
      }
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (id && products[id]) {
      setProduct(products[id]);
      setLoading(false);
    } else if (id) {
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    try {
      addToCart(product, selectedSize, quantity);
      alert(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    router.push(`/checkout/${product.id}?size=${selectedSize}&quantity=${quantity}`);
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Shop
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
                onClick={() => router.push('/cart')}
                className="relative text-gray-700 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <button onClick={() => router.push('/')} className="hover:text-gray-700">Home</button>
          <span className="mx-2">›</span>
          <button onClick={() => router.push('/')} className="hover:text-gray-700">Climbing Shoes</button>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Product Image</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Img {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Badge */}
            {product.condition === 'New' && (
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-4">
                New
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">by {product.brand}</p>

            {/* Reviews */}
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.reviews.average)}</div>
              <span className="ml-2 text-sm text-gray-600">
                {product.reviews.average} ({product.reviews.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Seller Info */}
            <div className="border-t border-b py-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sold by</p>
                  <p className="font-semibold text-gray-900">{product.seller.name}</p>
                </div>
                <div className="text-right">
                  <div className="flex">{renderStars(product.seller.rating)}</div>
                  <p className="text-sm text-gray-600">{product.seller.rating}/5</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
                >
                  -
                </button>
                <span className="py-2 px-4 border-t border-b border-gray-300 bg-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 text-sm">✓ In Stock ({product.stockCount} available)</p>
              ) : (
                <p className="text-red-600 text-sm">✗ Out of Stock</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInCart(product.id, selectedSize) ? 'Update Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Description & Features */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}