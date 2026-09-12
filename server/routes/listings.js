const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { CropListing } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';

// Middleware to check auth
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

router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.farmer === 'me') {
      if (!req.user) {
        // manually verify token if no middleware applied globally
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({error: 'Unauthorized'});
        const decoded = jwt.verify(token, JWT_SECRET);
        query.farmer = decoded.id;
      } else {
        query.farmer = req.user.id;
      }
    }
    if (req.query.status) query.status = req.query.status;
    
    const listings = await CropListing.find(query).populate('farmer', 'name location');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'FARMER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only farmers can create listings' });
    }
    
    const listingData = { ...req.body, farmer: req.user.id };
    const listing = new CropListing(listingData);
    await listing.save();
    
    // Broadcast listing-created to buyer portal
    req.app.get('io').emit('listing-created', listing);
    
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id).populate('farmer', 'name location');
    if (!listing) return res.status(404).json({ error: 'Not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Not found' });
    
    if (listing.farmer.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Check if it's an auction and has bids
    if (listing.sellingMode === 'AUCTION') {
      const Bid = require('../models').Bid;
      const bidCount = await Bid.countDocuments({ listing: listing._id });
      if (bidCount > 0) return res.status(400).json({ error: 'Cannot edit auction with existing bids' });
    }
    
    Object.assign(listing, req.body);
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Not found' });
    
    if (listing.farmer.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await CropListing.deleteOne({ _id: listing._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
