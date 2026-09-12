const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { CropListing, Bid, Order, TransportJob } = require('../models');

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

router.get('/:id/bids', async (req, res) => {
  try {
    const bids = await Bid.find({ listing: req.params.id })
                          .populate('buyer', 'name')
                          .sort({ amount: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buyer places a bid
router.post('/:id/bid', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'BUYER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only buyers can place bids' });
    }
    
    const listing = await CropListing.findById(req.params.id);
    if (!listing || listing.sellingMode !== 'AUCTION') {
      return res.status(400).json({ error: 'Invalid auction' });
    }
    
    if (listing.status !== 'LIVE') {
      return res.status(400).json({ error: 'Auction is not live' });
    }
    
    if (new Date() > new Date(listing.auctionCloseTime)) {
      return res.status(400).json({ error: 'Auction has closed' });
    }

    const { amount } = req.body;
    
    // Check if bid is high enough
    const highestBid = await Bid.findOne({ listing: listing._id }).sort({ amount: -1 });
    const currentHigh = highestBid ? highestBid.amount : (listing.auctionBasePrice || 0);
    const minRequired = currentHigh + (listing.minBidIncrement || 0);
    
    if (amount < minRequired) {
      return res.status(400).json({ error: `Bid must be at least ${minRequired}` });
    }
    
    // Create bid
    const bid = new Bid({
      listing: listing._id,
      buyer: req.user.id,
      amount
    });
    await bid.save();
    
    const populatedBid = await Bid.findById(bid._id).populate('buyer', 'name');

    // Emit live update
    req.app.get('io').to(`auction-${listing._id}`).emit('bid-updated', {
      highestBid: amount,
      bid: populatedBid
    });
    
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/close', authMiddleware, async (req, res) => {
  try {
    const listing = await CropListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Not found' });
    
    if (listing.farmer.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    if (listing.status !== 'LIVE') {
      return res.status(400).json({ error: 'Auction is already closed' });
    }
    
    const highestBid = await Bid.findOne({ listing: listing._id }).sort({ amount: -1 });
    
    if (!highestBid) {
      listing.status = 'EXPIRED';
      await listing.save();
      req.app.get('io').to(`auction-${listing._id}`).emit('auction-closed', { status: 'EXPIRED' });
      return res.json(listing);
    }
    
    listing.status = 'SOLD';
    await listing.save();
    
    // Generate Order
    const order = new Order({
      listing: listing._id,
      farmer: listing.farmer,
      buyer: highestBid.buyer,
      quantity: listing.quantity,
      cropCost: highestBid.amount,
      transportCost: 0, // Calculated later or preset demo
      totalAmount: highestBid.amount,
      paymentStatus: 'PENDING',
      orderStatus: 'CONFIRMED'
    });
    await order.save();
    
    // Generate TransportJob
    const transportJob = new TransportJob({
      order: order._id,
      pickup: { label: listing.pickupLocation || 'Farm', lat: 10.7905, lng: 79.1378 }, // Demo coords
      destination: { label: 'Market', lat: 13.0827, lng: 80.2707 },
      distanceKm: 348,
      estimatedDurationMin: 390,
      vehicleType: '6-wheel truck',
      cropLoad: {
        cropName: listing.cropName,
        quantity: listing.quantity,
        unit: listing.unit,
        weightKg: listing.quantity * 100 // Demo calc
      },
      fareBreakdown: {
        baseFare: 1500,
        perKmRate: 20,
        distanceCharge: 348 * 20,
        loadingCharge: 240,
        total: 1500 + (348 * 20) + 240
      },
      quotedFare: 1500 + (348 * 20) + 240,
      status: 'PENDING'
    });
    await transportJob.save();
    
    const populatedJob = await TransportJob.findById(transportJob._id).populate('order');
    req.app.get('io').to('transporter-feed').emit('new-job-available', populatedJob);
    req.app.get('io').to(`auction-${listing._id}`).emit('auction-closed', { status: 'SOLD', order });
    
    res.json({ listing, order, transportJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
