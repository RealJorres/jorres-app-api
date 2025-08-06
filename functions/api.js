// functions/api.js
require('dotenv').config();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../../app'); // Adjust path if needed

let isConnected = false;

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

const handler = async (event, context) => {
  await connectToDatabase();
  return serverless(app)(event, context);
};

module.exports.handler = handler;
