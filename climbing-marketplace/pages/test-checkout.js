// pages/test-checkout.js
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
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
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Test Payment - $20.00
          </h3>
          <p className="text-sm text-gray-600">
            Use test card: 4242 4242 4242 4242
          </p>
        </div>
        
        <PaymentElement />
        
        <button 
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : 'Pay $20.00'}
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

function CheckoutWrapper() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: 20,
        metadata: { test: 'frontend-test' }
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
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Checkout 🧗‍♂️
          </h1>
          <p className="text-gray-600">
            Testing payment integration for ClimbingGear.Market
          </p>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading payment form...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
            <div className="text-sm mt-1">
              Make sure your backend is running on {process.env.NEXT_PUBLIC_API_URL}
            </div>
          </div>
        )}

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
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

export default CheckoutWrapper;