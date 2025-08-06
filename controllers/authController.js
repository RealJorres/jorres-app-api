const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, role, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(10, 10));
    const user = new User({ username, role, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'No user found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: '1d' });
    res.json({ user:user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
