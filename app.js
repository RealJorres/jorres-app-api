// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
