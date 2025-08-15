// routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('./auth'); // You'll need to create this

// Create payment intent (no webhooks needed)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm payment and create order (replaces webhook)
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;
    
    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // TODO: Create order in database here
    // const order = new Order({
    //   ...orderData,
    //   paymentIntentId,
    //   status: 'confirmed'
    // });
    // await order.save();

    console.log('✅ Payment confirmed:', paymentIntentId);
    
    res.json({
      success: true,
      message: 'Payment confirmed and order created',
      paymentIntentId
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;