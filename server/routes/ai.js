const axios = require('axios'); // need to install axios
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const forecast = async (req, res) => {
  try {
    const { crop, region } = req.query;
    // Call python AI microservice
    const aiRes = await axios.post(`${AI_SERVICE_URL}/forecast/demand`, {
      crop: crop || 'Unknown',
      region: region || 'Unknown',
      quantity: 0,
      month: ''
    });
    res.json(aiRes.data);
  } catch (err) {
    console.error('AI Service Error:', err.message);
    // Fallback
    res.json({
      demandLevel: "MEDIUM",
      suggestedPriceRange: "N/A",
      confidence: "0%",
      shortExplanation: "AI service currently unavailable. Using fallback data."
    });
  }
};

const marketPrices = async (req, res) => {
  // Demo market prices endpoint
  const { crop } = req.query;
  res.json({
    crop: crop || 'General',
    currentPrice: 2200,
    unit: 'quintal',
    trend: '+2%',
    updatedAt: new Date()
  });
};

module.exports = { forecast, marketPrices };
