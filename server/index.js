require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Pass io to routes if needed
app.set('io', io);

// Auth Routes
app.use('/api/auth', require('./routes/auth'));
// User Routes
app.use('/api/users', require('./routes/users'));
// Listings & Auctions Routes
app.use('/api/listings', require('./routes/listings'));
app.use('/api/auctions', require('./routes/auctions'));
// Orders
app.use('/api/orders', require('./routes/orders'));
// Transport Jobs
app.use('/api/transport', require('./routes/transport'));
// AI Proxy Routes
const aiRoutes = require('./routes/ai');
app.use('/api/forecast', aiRoutes.forecast);
app.use('/api/market-prices', aiRoutes.marketPrices);

// Socket.io logic
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-auction', (auctionId) => {
    socket.join(`auction-${auctionId}`);
    console.log(`Socket ${socket.id} joined auction ${auctionId}`);
  });
  
  socket.on('leave-auction', (auctionId) => {
    socket.leave(`auction-${auctionId}`);
  });

  socket.on('join-transporter-feed', () => {
    socket.join('transporter-feed');
    console.log(`Socket ${socket.id} joined transporter feed`);
  });

  socket.on('leave-transporter-feed', () => {
    socket.leave('transporter-feed');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

async function startServer() {
  let mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    console.log('MONGO_URI not provided. Starting mongodb-memory-server...');
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB at', mongoUri);

  // Run seed script if needed
  require('./seed')();

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
