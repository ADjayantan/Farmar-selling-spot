const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function simulateBid() {
  try {
    console.log('1. Logging in as Buyer (buyer@demo.com)...');
    const authRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'buyer@demo.com',
      password: 'demo123'
    });
    const token = authRes.data.token;
    console.log('   ✅ Logged in successfully!');

    console.log('\n2. Fetching active listings...');
    const listingsRes = await axios.get(`${BASE_URL}/listings`);
    const activeAuctions = listingsRes.data.filter(l => l.sellingMode === 'AUCTION' && l.status === 'LIVE');
    
    if (activeAuctions.length === 0) {
      console.log('   ❌ No live auctions found. Please create a Live Auction in the Farmer Portal first!');
      return;
    }

    const auction = activeAuctions[0];
    console.log(`   ✅ Found Live Auction: ${auction.cropName} by Farmer ID: ${auction.farmer._id || auction.farmer}`);

    console.log('\n3. Placing a bid...');
    const bidsRes = await axios.get(`${BASE_URL}/auctions/${auction._id}/bids`);
    const currentHighest = bidsRes.data.length > 0 ? bidsRes.data[0].amount : auction.auctionBasePrice;
    
    // Bid current highest + min increment + some random amount
    const bidAmount = currentHighest + (auction.minBidIncrement || 50) + Math.floor(Math.random() * 100);
    
    await axios.post(`${BASE_URL}/auctions/${auction._id}/bid`, { amount: bidAmount }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(`   🚀 BOOM! Placed a bid of ₹${bidAmount} for ${auction.cropName}!`);
    console.log('   Check the Farmer Portal window, the UI should have updated instantly via Socket.io!');

  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

simulateBid();
