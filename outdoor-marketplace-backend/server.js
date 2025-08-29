// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cron = require('node-cron');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Check if Stripe key exists
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log('✅ Stripe initialized with key:', process.env.STRIPE_SECRET_KEY.substring(0, 12) + '...');

dotenv.config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',  // React development server
      'http://localhost:3001',  // Alternative port
      'http://127.0.0.1:3000',
      // Add your production URL here when you deploy
      // 'https://www.thegearwall.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  exposedHeaders: ['x-auth-token']
};

// Apply CORS middleware - IMPORTANT: This must come BEFORE your routes
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/climbing-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// API Routes
app.use('/api/auth', require('./routes/auth'));       // Authentication routes
app.use('/api/users', require('./routes/users'));     // User routes
app.use('/api/products', require('./routes/products')); // Product routes
app.use('/api/upload', require('./routes/upload'));
// Add other routes as needed
// app.use('/api/offers', require('./routes/offers'));
// app.use('/api/messages', require('./routes/messages'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      success: false, 
      message: 'CORS error: Origin not allowed' 
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Optional: Setup WebSocket for real-time messaging
let io = null;
if (process.env.ENABLE_WEBSOCKET === 'true') {
  const http = require('http');
  const server = http.createServer(app);
  const socketIO = require('socket.io');
  
  io = socketIO(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? ['https://your-domain.com']
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
      credentials: true
    }
  });
  
  // WebSocket setup for real-time features
  const setupWebSocket = require('./websocket/messageSocket');
  setupWebSocket(io);
  console.log('✅ WebSocket server initialized');
}

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ /* limit: '10mb' */ }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Initialize cron jobs after database connection
  initializeCronJobs();
})
.catch(err => console.log('❌ MongoDB connection error:', err));

// Import Models (ensure these are loaded)
require('./models/Offer');
require('./models/Message');
require('./models/Conversation');

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Outdoor Marketplace API is running!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    features: {
      payments: '✅ Active',
      offers: '✅ Active',
      messaging: '✅ Active',
      uploads: '✅ Active',
      websocket: process.env.ENABLE_WEBSOCKET === 'true' ? '✅ Active' : '❌ Disabled'
    }
  });
});

// Routes
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const uploadRoutes = require('./routes/upload');
const offerRoutes = require('./routes/offers');
const messageRoutes = require('./routes/messages');
const productRoutes = require('./routes/products'); // Make sure you have this

app.use('/api/auth', require('./routes/auth'));
app.use('/api/payments', paymentRoutes);
app.use('/api', uploadRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', require('./routes/products')); // Your product/listing routes

console.log('✅ All routes initialized');

// Updated test route for Stripe - now handles dynamic amounts
app.post('/api/test-payment', async (req, res) => {
  try {
    const { amount, metadata } = req.body;
   
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }
    console.log('Creating payment intent for:', { amount, metadata });
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure integer
      currency: 'usd',
      metadata: metadata || { source: 'climbing-gear-marketplace' },
      automatic_payment_methods: {
        enabled: true,
      },
    });
   
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      message: '✅ Payment intent created successfully!'
    });
    console.log('✅ Payment intent created:', paymentIntent.id, `for $${amount}`);
  } catch (error) {
    console.error('❌ Stripe error:', error);
    res.status(500).json({
      error: error.message,
      details: 'Failed to create payment intent'
    });
  }
});

// Cron Jobs Setup
function initializeCronJobs() {
  // Process expired offers every hour
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('⏰ Running expired offers check...');
      const Offer = require('./models/Offer');
      const Message = require('./models/Message');
      const Conversation = require('./models/Conversation');
      
      // Find all pending offers that have expired
      const expiredOffers = await Offer.find({
        status: 'pending',
        expiresAt: { $lt: new Date() }
      }).populate('buyer seller listing');

      for (const offer of expiredOffers) {
        // Update offer status
        offer.status = 'expired';
        await offer.save();

        // Send expiration message to buyer
        const conversation = await Conversation.findOrCreate(
          [offer.buyer._id, offer.seller._id],
          offer.listing._id
        );

        await Message.create({
          conversation: conversation._id,
          sender: offer.seller._id,
          receiver: offer.buyer._id,
          listing: offer.listing._id,
          message: `Your offer of $${offer.offerAmount} has expired. Feel free to make a new offer if you're still interested.`,
          isOffer: true,
          offerDetails: {
            offerId: offer._id,
            amount: offer.offerAmount,
            action: 'expired'
          }
        });
      }

      if (expiredOffers.length > 0) {
        console.log(`✅ Processed ${expiredOffers.length} expired offers`);
      }
    } catch (error) {
      console.error('❌ Error processing expired offers:', error);
    }
  });

  // Clean up old read messages (optional - runs daily at 2 AM)
  cron.schedule('0 2 * * *', async () => {
    try {
      console.log('⏰ Running message cleanup...');
      const Message = require('./models/Message');
      
      // Delete read messages older than 90 days
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);
      
      const result = await Message.deleteMany({
        read: true,
        createdAt: { $lt: threeMonthsAgo },
        deleted: true
      });
      
      console.log(`✅ Cleaned up ${result.deletedCount} old messages`);
    } catch (error) {
      console.error('❌ Error cleaning up messages:', error);
    }
  });

  console.log('✅ Cron jobs initialized');
}

// Statistics endpoint for admin dashboard
app.get('/api/stats/overview', async (req, res) => {
  try {
    const Offer = require('./models/Offer');
    const Message = require('./models/Message');
    const Conversation = require('./models/Conversation');
    const Product = require('./models/Product');
    
    const [
      totalOffers,
      activeOffers,
      totalMessages,
      activeConversations,
      totalListings
    ] = await Promise.all([
      Offer.countDocuments(),
      Offer.countDocuments({ status: 'pending' }),
      Message.countDocuments(),
      Conversation.countDocuments({ status: 'active' }),
      Product.countDocuments({ status: 'available' })
    ]);

    res.json({
      offers: {
        total: totalOffers,
        active: activeOffers
      },
      messages: {
        total: totalMessages,
        activeConversations
      },
      listings: {
        available: totalListings
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // limit each IP to 5 requests per windowMs
});

app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/login', authLimiter);

const PORT = process.env.PORT || 5000;

// Use different server setup depending on WebSocket configuration
if (io) {
  const http = require('http');
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💳 Payment test: http://localhost:${PORT}/api/test-payment`);
    console.log(`💬 Messaging: http://localhost:${PORT}/api/messages`);
    console.log(`🤝 Offers: http://localhost:${PORT}/api/offers`);
    console.log(`🔌 WebSocket: Active`);
    console.log(`🧗‍♂️ Ready for climbing gear marketplace!`);
  });
  module.exports = { app, server, io };
} else {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💳 Payment test: http://localhost:${PORT}/api/test-payment`);
    console.log(`💬 Messaging: http://localhost:${PORT}/api/messages`);
    console.log(`🤝 Offers: http://localhost:${PORT}/api/offers`);
    console.log(`🧗‍♂️ Ready for climbing gear marketplace!`);
  });
  module.exports = app;
}