require('dotenv').config();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../app'); // make sure this path is correct!

let isConnected = false;

// DB connection
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

// Netlify-specific fix for req.body
const handler = serverless(app, {
  request: async (req, event, context) => {
    if (event.body && typeof req.body === 'undefined') {
      try {
        req.body = JSON.parse(event.body);
      } catch (err) {
        console.error('❌ Failed to parse req.body:', err);
      }
    }

    await connectToDatabase(); // ensure DB is ready
  }
});

module.exports.handler = handler;
