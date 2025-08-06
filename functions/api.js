require('dotenv').config();
const serverless = require("serverless-http")

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('../routes/api');

const app = express()
const router = express.Router();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3000; // Use a default if not set
const uri = process.env.URI;


// Routes
router.use('/api/v1', apiRoutes);

router.get('/', (req, res) => {
  res.send('Hello World!')
})


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

app.use('/.netlify/functions/api', router);

export const handler = serverless(api);