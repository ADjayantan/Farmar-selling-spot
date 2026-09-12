const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['FARMER', 'BUYER', 'TRANSPORTER', 'ADMIN'], required: true },
  phone: String,
  preferredLanguage: { type: String, default: 'en' },
  location: String,
  rating: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  // Transporter specific
  vehicleType: String,
  vehicleNumber: String,
  capacityKg: Number,
  isOnline: { type: Boolean, default: false },
  currentLocation: String
});

const cropListingSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: true },
  variety: String,
  photos: [String],
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  qualityGrade: String,
  pickupLocation: String,
  sellingMode: { type: String, enum: ['FIXED_PRICE', 'AUCTION'], required: true },
  fixedPrice: Number,
  auctionBasePrice: Number,
  minBidIncrement: Number,
  auctionStartTime: Date,
  auctionCloseTime: Date,
  status: { type: String, enum: ['DRAFT', 'ACTIVE', 'LIVE', 'SOLD', 'EXPIRED', 'CANCELLED'], default: 'ACTIVE' }
});

const bidSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'CropListing', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'CropListing' },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: Number,
  cropCost: Number,
  transportCost: Number,
  totalAmount: Number,
  paymentStatus: { type: String, default: 'PENDING' },
  orderStatus: { type: String, enum: ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'], default: 'CONFIRMED' },
  assignedTransporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const transportJobSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  transporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickup: {
    label: String,
    lat: Number,
    lng: Number
  },
  destination: {
    label: String,
    lat: Number,
    lng: Number
  },
  distanceKm: Number,
  estimatedDurationMin: Number,
  vehicleType: String,
  cropLoad: {
    cropName: String,
    quantity: Number,
    unit: String,
    weightKg: Number
  },
  fareBreakdown: {
    baseFare: Number,
    perKmRate: Number,
    distanceCharge: Number,
    loadingCharge: Number,
    total: Number
  },
  quotedFare: Number,
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'], default: 'PENDING' },
  acceptedAt: Date,
  deliveredAt: Date,
  payoutStatus: { type: String, default: 'PENDING' }
});

const demandForecastSchema = new mongoose.Schema({
  crop: String,
  region: String,
  demandLevel: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
  suggestedPriceRange: String,
  explanation: String,
  generatedAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  CropListing: mongoose.model('CropListing', cropListingSchema),
  Bid: mongoose.model('Bid', bidSchema),
  Order: mongoose.model('Order', orderSchema),
  TransportJob: mongoose.model('TransportJob', transportJobSchema),
  DemandForecast: mongoose.model('DemandForecast', demandForecastSchema)
};
