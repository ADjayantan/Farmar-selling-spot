const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    // In this prototype, we're not strict about hashed passwords for demo accounts
    // if passwordHash is "demo123" and password is "demo123", we'll accept it
    const isMatch = await bcrypt.compare(password, user.passwordHash).catch(() => false) || password === user.passwordHash;
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    if (role && user.role !== role && user.role !== 'ADMIN') {
      return res.status(403).json({ error: `This account is not a ${role.toLowerCase()} account.` });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
