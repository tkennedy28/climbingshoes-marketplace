// backend/test-signup.js
require('dotenv').config();
console.log('Environment loaded');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const mongoose = require('mongoose');
const User = require('./models/User');

async function testSignup() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/climbing-marketplace');
    console.log('✅ MongoDB connected');

    // Create test user
    const testData = {
      username: 'testuser' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    console.log('Creating user with:', testData);
    const user = new User(testData);
    
    console.log('Saving user...');
    await user.save();
    console.log('✅ User saved');

    console.log('Generating token...');
    const token = user.generateAuthToken();
    console.log('✅ Token generated:', token.substring(0, 20) + '...');

    console.log('\n✅ ALL TESTS PASSED!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testSignup();