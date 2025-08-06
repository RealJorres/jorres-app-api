// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
