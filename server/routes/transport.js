const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { TransportJob, Order } = require('../models');
const axios = require('axios');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

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

router.get('/jobs', authMiddleware, async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    
    if (req.query.mine === 'true') {
      query.transporter = req.user.id;
    } else {
      query.transporter = null;
    }
    
    const jobs = await TransportJob.find(query).populate({
      path: 'order',
      populate: [
        { path: 'farmer', select: 'name phone location' },
        { path: 'buyer', select: 'name phone location' }
      ]
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const job = await TransportJob.findById(req.params.id).populate({
      path: 'order',
      populate: [
        { path: 'farmer', select: 'name phone location' },
        { path: 'buyer', select: 'name phone location' }
      ]
    });
    if (!job) return res.status(404).json({ error: 'Not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/jobs/:id/accept', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'TRANSPORTER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only transporters can accept jobs' });
    }
    
    // Atomic update
    const job = await TransportJob.findOneAndUpdate(
      { _id: req.params.id, status: 'PENDING', transporter: null },
      { 
        status: 'ACCEPTED', 
        transporter: req.user.id,
        acceptedAt: new Date()
      },
      { new: true }
    );
    
    if (!job) {
      return res.status(409).json({ error: 'This job was just accepted by another transporter or is no longer available.' });
    }
    
    // Update Order
    await Order.findByIdAndUpdate(job.order, { assignedTransporter: req.user.id });
    
    req.app.get('io').to('transporter-feed').emit('job-taken', job._id);
    req.app.get('io').emit('delivery-status-updated', { jobId: job._id, status: 'ACCEPTED', transporter: req.user.id });
    
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/jobs/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
    
    const job = await TransportJob.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Not found' });
    
    if (job.transporter.toString() !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const currentIndex = validStatuses.indexOf(job.status);
    const newIndex = validStatuses.indexOf(status);
    
    if (newIndex <= currentIndex) {
      return res.status(400).json({ error: 'Invalid status transition' });
    }
    
    job.status = status;
    if (status === 'DELIVERED') {
      job.deliveredAt = new Date();
      job.payoutStatus = 'PAID'; // Simulated
      await Order.findByIdAndUpdate(job.order, { orderStatus: 'DELIVERED', paymentStatus: 'PAID' });
    }
    
    await job.save();
    
    req.app.get('io').emit('delivery-status-updated', { jobId: job._id, status });
    
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/jobs/:id/route', authMiddleware, async (req, res) => {
  try {
    const job = await TransportJob.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Not found' });
    
    try {
      const aiRes = await axios.post(`${AI_SERVICE_URL}/route/recommendation`, {
        pickup: job.pickup.label || '',
        destination: job.destination.label || '',
        vehicleType: job.vehicleType || 'Truck',
        loadKg: job.cropLoad.weightKg || 1000
      });
      res.json(aiRes.data);
    } catch (e) {
      res.json({
        estimatedDistance: job.distanceKm,
        estimatedDuration: job.estimatedDurationMin,
        suggestedFare: job.quotedFare,
        routeSummary: "Fallback route used (AI service unavailable)"
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/earnings', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'TRANSPORTER') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Very simplified earnings based on delivered jobs
    const jobs = await TransportJob.find({ transporter: req.user.id, status: 'DELIVERED' });
    const total = jobs.reduce((acc, job) => acc + (job.quotedFare || 0), 0);
    
    res.json({ total, jobsCompleted: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
