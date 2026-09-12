const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Order } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = {};
    if (req.user.role === 'FARMER') {
      query.farmer = req.user.id;
    } else if (req.user.role === 'BUYER') {
      query.buyer = req.user.id;
    }
    
    const orders = await Order.find(query)
      .populate('farmer', 'name phone location')
      .populate('buyer', 'name phone location')
      .populate('listing', 'cropName quantity unit')
      .populate('assignedTransporter', 'name phone vehicleType vehicleNumber');
      
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('farmer', 'name phone location')
      .populate('buyer', 'name phone location')
      .populate('listing', 'cropName quantity unit')
      .populate('assignedTransporter', 'name phone vehicleType vehicleNumber');
      
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
