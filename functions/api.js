require('dotenv').config();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../app'); // your Express app

let isConnected = false;

// MongoDB connection
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

// This wrapper ensures DB connection before request handling
const handler = async (event, context) => {
  await connectToDatabase();

  // Netlify sends raw body, so manually parse if needed
  if (event.body && event.headers['content-type']?.includes('application/json')) {
    try {
      event.body = JSON.parse(event.body);
    } catch (err) {
      console.error('❌ Failed to parse req.body:', err);
    }
  }

  return serverless(app)(event, context);
};

module.exports.handler = handler;
