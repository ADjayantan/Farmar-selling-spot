import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Trophy, TrendingUp } from 'lucide-react';

const mockAuction = {
  id: 'AUC-8472',
  title: '10 Tons of Export Grade Bananas',
  basePrice: 40, // per kg
  currentBid: 52,
  bids: [
    { id: 1, buyer: 'FreshMart', amount: 52, time: '2 mins ago', isHighest: true },
    { id: 2, buyer: 'Raja Traders', amount: 50, time: '5 mins ago', isHighest: false },
    { id: 3, buyer: 'National Foods', amount: 48, time: '12 mins ago', isHighest: false },
    { id: 4, buyer: 'FreshMart', amount: 45, time: '20 mins ago', isHighest: false }
  ],
  timeLeft: '01:45:20',
  participants: 8,
  image: './images/banana_fruit.jpg'
};

const AuctionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft] = useState(mockAuction.timeLeft);
  const [currentBid] = useState(mockAuction.currentBid);
  const [bids] = useState(mockAuction.bids);

  // Simulate timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      // Dummy tick
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-900 font-sans pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700 mr-2">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Live Auction</h1>
            <p className="text-xs font-bold text-gray-500">{mockAuction.id}</p>
          </div>
        </div>
        <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-black flex items-center border border-red-200 animate-pulse">
          <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
          LIVE
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4 mt-2">
        
        {/* Item Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex p-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mr-4 flex-shrink-0">
            <img src={mockAuction.image} alt="Auction Item" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="font-extrabold text-gray-900 text-lg leading-tight">{mockAuction.title}</h2>
            <div className="flex items-center text-gray-500 text-sm font-medium mt-1">
              Base Price: <span className="font-bold text-gray-700 ml-1">₹ {mockAuction.basePrice} / kg</span>
            </div>
            
            <div className="flex mt-3 space-x-4">
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100 text-sm font-bold flex items-center">
                <Users size={16} className="mr-1.5" /> {mockAuction.participants} Bidders
              </div>
              <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg border border-orange-100 text-sm font-bold flex items-center">
                <Clock size={16} className="mr-1.5" /> {timeLeft}
              </div>
            </div>
          </div>
        </div>

        {/* Current Highest Bid */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl shadow-md p-6 text-white text-center relative overflow-hidden">
          <div className="absolute opacity-20 -right-6 -top-6">
            <Trophy size={120} />
          </div>
          <p className="text-green-100 font-bold uppercase tracking-wider text-sm mb-1 z-10 relative">Current Highest Bid</p>
          <h2 className="text-5xl font-black mb-2 z-10 relative">₹ {currentBid}<span className="text-xl"> / kg</span></h2>
          <div className="inline-flex bg-white/20 px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-sm z-10 relative">
            by {bids[0].buyer}
          </div>
        </div>

        {/* Bid History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900 flex items-center"><TrendingUp size={18} className="mr-2 text-green-600" /> Bidding History</h3>
            <span className="text-xs font-bold text-gray-500">{bids.length} Bids Total</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {bids.map((bid, idx) => (
              <div key={bid.id} className={`p-4 flex justify-between items-center ${bid.isHighest ? 'bg-green-50/50' : ''}`}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm ${bid.isHighest ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{bid.buyer}</p>
                    <p className="text-xs text-gray-500 font-medium">{bid.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${bid.isHighest ? 'text-green-700' : 'text-gray-700'}`}>₹ {bid.amount}</p>
                  {bid.isHighest && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Winning</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuctionManagement;


