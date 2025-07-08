const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password) || password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: 'Password must be 8-16 chars, 1 uppercase, 1 special char' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, address, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
