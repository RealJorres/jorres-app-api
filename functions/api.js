require('dotenv').config();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../../app'); // Adjust if your app.js is elsewhere

let isConnected = false;

// MongoDB connection
async function connectToDatabase() {
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
    throw err;
  }
}

// Wrap express in serverless handler
const handler = serverless(app, {
  request: async (req, event) => {
    // Parse body if Netlify didn’t do it
    if (event.body && !req.body) {
      try {
        req.body = JSON.parse(event.body);
      } catch {
        req.body = {};
      }
    }
    await connectToDatabase();
  }
});

module.exports.handler = async (event, context) => {
  return handler(event, context);
};
