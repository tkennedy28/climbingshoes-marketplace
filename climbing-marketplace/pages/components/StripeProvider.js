import { loadStripe } from '@stripe/stripe-js';

// Make sure this matches your .env.local file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export { stripePromise };