import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ product }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      console.error('Payment error:', error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('✅ Payment successful! 🎉');
      console.log('Payment succeeded:', paymentIntent);
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/payment-success');
      }, 2000);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name} - ${product.price}
          </h3>
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Test card: 4242 4242 4242 4242
          </p>
        </div>
        
        <PaymentElement />
        
        <button 
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : `Pay $${product.price}`}
        </button>
        
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  // Your product data
  const products = {
    'solution': {
      id: 'solution',
      name: 'La Sportiva Solution',
      price: 199,
      description: 'Aggressive downturned shoe for overhangs'
    },
    'instinct': {
      id: 'instinct',
      name: 'Scarpa Instinct',
      price: 179,
      description: 'Versatile shoe for all climbing styles'
    },
    'momentum': {
      id: 'momentum',
      name: 'Black Diamond Momentum',
      price: 99,
      description: 'Comfortable beginner-friendly shoe'
    }
  };

  useEffect(() => {
    if (id && products[id]) {
      const selectedProduct = products[id];
      setProduct(selectedProduct);

      // Create payment intent with your backend
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: selectedProduct.price,
          metadata: { 
            product_id: selectedProduct.id,
            product_name: selectedProduct.name
          }
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError(data.error || 'Failed to create payment intent');
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to connect to backend');
          setLoading(false);
          console.error('Payment intent error:', err);
        });
    } else if (id) {
      setError('Product not found');
      setLoading(false);
    }
  }, [id]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2563eb',
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
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
              className="text-2xl font-bold text-gray-900 hover:text-gray-700"
            >
              ClimbGear
            </button>
            <span className="text-sm text-gray-500">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout 🧗‍♂️
          </h1>
          <p className="text-gray-600">
            Complete your climbing shoe purchase
          </p>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading payment form...</p>
          </div>
        )}

        {clientSecret && product && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm product={product} />
          </Elements>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Test Card Numbers:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <div><strong>Success:</strong> 4242 4242 4242 4242</div>
            <div><strong>Decline:</strong> 4000 0000 0000 0002</div>
            <div><strong>Any future date, any 3-digit CVC</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}