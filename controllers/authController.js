const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/token');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
