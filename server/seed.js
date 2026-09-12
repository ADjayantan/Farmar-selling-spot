const { User, CropListing, TransportJob, Order } = require('./models');
const bcrypt = require('bcryptjs');

module.exports = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) return; // Already seeded

  console.log('Seeding demo data...');

  const passwordHash = 'demo123';

  // Seed Users
  const farmer = await User.create({ name: 'Raju Farmer', email: 'farmer@demo.com', passwordHash, role: 'FARMER', phone: '9876543210', location: 'Thanjavur', verified: true });
  const buyer = await User.create({ name: 'Acme Buyers', email: 'buyer@demo.com', passwordHash, role: 'BUYER', phone: '9876543211', location: 'Chennai', verified: true });
  const transporter1 = await User.create({ name: 'Ramesh Anbu', email: 'transporter@demo.com', passwordHash, role: 'TRANSPORTER', phone: '9876543212', location: 'Thanjavur', vehicleType: 'Tata Ace', vehicleNumber: 'TN 49 AB 1234', capacityKg: 1000, isOnline: true });
  const transporter2 = await User.create({ name: 'Dinesh Kumar', email: 'transporter2@demo.com', passwordHash, role: 'TRANSPORTER', phone: '9876543213', location: 'Erode', vehicleType: '6-wheel truck', vehicleNumber: 'TN 38 EF 9012', capacityKg: 9000, isOnline: true });
  await User.create({ name: 'Admin', email: 'admin@demo.com', passwordHash, role: 'ADMIN' });

  // Seed Anchor Listing
  const anchorListing = await CropListing.create({
    farmer: farmer._id,
    cropName: 'Ponni Rice',
    variety: 'Premium',
    quantity: 20,
    unit: 'quintals',
    pickupLocation: 'Thanjavur',
    sellingMode: 'AUCTION',
    auctionBasePrice: 2200,
    minBidIncrement: 50,
    auctionStartTime: new Date(),
    auctionCloseTime: new Date(Date.now() + 86400000), // 1 day from now
    status: 'LIVE'
  });

  // Seed another listing for generating a job
  const soldListing = await CropListing.create({
    farmer: farmer._id,
    cropName: 'Ponni Rice',
    quantity: 20,
    unit: 'quintals',
    sellingMode: 'AUCTION',
    pickupLocation: 'Thanjavur',
    status: 'SOLD'
  });

  const demoOrder = await Order.create({
    listing: soldListing._id,
    farmer: farmer._id,
    buyer: buyer._id,
    quantity: 20,
    cropCost: 45000,
    totalAmount: 45000,
    orderStatus: 'CONFIRMED'
  });

  await TransportJob.create({
    order: demoOrder._id,
    pickup: { label: 'Thanjavur', lat: 10.7905, lng: 79.1378 },
    destination: { label: 'Koyambedu Market, Chennai', lat: 13.0827, lng: 80.2707 },
    distanceKm: 348,
    estimatedDurationMin: 390,
    vehicleType: '6-wheel truck',
    cropLoad: { cropName: 'Ponni Rice', quantity: 20, unit: 'quintals', weightKg: 2000 },
    fareBreakdown: { baseFare: 1500, perKmRate: 20, distanceCharge: 6960, loadingCharge: 240, total: 8700 },
    quotedFare: 8700,
    status: 'PENDING'
  });
  
  // Create another job that is IN_TRANSIT
  const demoOrder2 = await Order.create({
    farmer: farmer._id,
    buyer: buyer._id,
    quantity: 10,
    cropCost: 20000,
    totalAmount: 20000,
    orderStatus: 'CONFIRMED',
    assignedTransporter: transporter1._id
  });

  await TransportJob.create({
    order: demoOrder2._id,
    transporter: transporter1._id,
    pickup: { label: 'Thanjavur', lat: 10.7905, lng: 79.1378 },
    destination: { label: 'Trichy', lat: 10.7905, lng: 78.7047 },
    distanceKm: 60,
    estimatedDurationMin: 90,
    vehicleType: 'Tata Ace',
    cropLoad: { cropName: 'Tomatoes', quantity: 500, unit: 'kg', weightKg: 500 },
    fareBreakdown: { baseFare: 500, perKmRate: 15, distanceCharge: 900, loadingCharge: 100, total: 1500 },
    quotedFare: 1500,
    status: 'IN_TRANSIT',
    acceptedAt: new Date()
  });

  console.log('Seed complete.');
};
