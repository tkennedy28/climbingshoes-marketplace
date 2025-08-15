// components/CheckoutForm.jsx
import React, { useState, useEffect } from 'react';
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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // ✅ Payment succeeded - confirm with backend (replaces webhook)
      try {
        const response = await fetch('/api/payments/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            orderData: {
              // Add your order data here
              items: [{ productId: 'test', quantity: 1, price: 20 }]
            }
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setMessage('✅ Payment successful! Order created.');
          // Redirect to success page
          // router.push('/order-success');
        } else {
          setMessage('❌ Payment succeeded but order creation failed');
        }
      } catch (err) {
        setMessage('❌ Error confirming payment with server');
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button 
        disabled={isLoading || !stripe || !elements}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        <span>
          {isLoading ? "Processing..." : "Pay Now"}
        </span>
      </button>
      {message && <div className="mt-4 text-sm text-red-600">{message}</div>}
    </form>
  );
}

function CheckoutWrapper() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent when component mounts
    fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: 20, // $20.00
        metadata: { test: 'true' }
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Test Checkout</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default CheckoutWrapper;