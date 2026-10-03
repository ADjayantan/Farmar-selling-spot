import React from 'react';
import { MapPin, Search, Mic, Heart, Bell, ChevronDown, Wheat, Sprout, Leaf, Trees, Droplets, Sun, ShoppingCart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Fresh Fruits', icon: <Leaf size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-emerald-900/30' },
    { id: 2, name: 'Vegetables', icon: <Trees size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-orange-400 to-red-600 shadow-red-900/30' },
    { id: 3, name: 'Organic Produce', icon: <Sprout size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-lime-400 to-green-500 shadow-green-900/30' },
    { id: 4, name: 'Spices & Herbs', icon: <Package size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-indigo-900/30' },
    { id: 5, name: 'Grains', icon: <Wheat size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-purple-400 to-fuchsia-600 shadow-fuchsia-900/30' },
    { id: 6, name: 'Dairy', icon: <Droplets size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-gray-400 to-slate-600 shadow-slate-900/30' },
    { id: 7, name: 'Honey', icon: <Sun size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-orange-900/30' },
    { id: 8, name: 'Baskets', icon: <ShoppingCart size={36} className="text-white drop-shadow-md" strokeWidth={1.5} />, bg: 'bg-gradient-to-br from-teal-400 to-cyan-600 shadow-cyan-900/30' },
  ];

  const recommendations = [
    { id: 101, title: 'Fresh Organic Tomatoes', price: '₹ 2,500 / quintal', location: 'Dindigul, Tamil Nadu', year: 'Harvested Today', image: './images/tomato.png' },
    { id: 102, title: 'Ooty Potatoes - Premium Quality', price: '₹ 3,200 / quintal', location: 'Mettupalayam Market', year: 'Fresh Stock', image: './images/potato.png' },
    { id: 103, title: 'Bellary Onions - 50 Bags', price: '₹ 1,800 / quintal', location: 'Oddanchatram Market', year: 'Dry & Good Size', image: './images/onion.png' },
    { id: 104, title: 'Salem Mangoes (Alphonso)', price: '₹ 12,000 / ton', location: 'Salem, Tamil Nadu', year: 'Ready to dispatch', image: './images/fruits.png' },
  ];

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen">
      {/* Top Header (Mobile Only) */}
      <div className="bg-[#121212] p-4 sticky top-0 z-10 pb-2 md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white">
            <MapPin size={20} className="mr-2" />
            <span className="font-semibold text-sm truncate max-w-[200px] tracking-wide">Tirupur Somanur Road, Tiruppur 641687</span>
            <ChevronDown size={16} className="ml-1 text-gray-400" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 flex items-center bg-[#121212] border-2 border-white rounded-lg px-3 py-2.5 cursor-text" onClick={() => alert('Search feature coming soon!')}>
            <Search size={20} className="text-white mr-3" />
            <input 
              type="text" 
              placeholder="Search 'Mangoes'" 
              className="bg-transparent outline-none flex-1 text-white placeholder-gray-300 text-sm font-medium"
              readOnly
            />
            <Mic size={20} className="text-white ml-2 hover:text-blue-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); alert('Voice Search starting...'); }} />
          </div>
          <Heart size={26} className="text-white cursor-pointer hover:text-red-500" onClick={() => alert('Favorites coming soon!')} />
          <Bell size={26} className="text-white cursor-pointer hover:text-blue-500" onClick={() => alert('No new notifications')} />
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 py-3 cursor-pointer" onClick={() => alert('Boost Ads Details...')}>
        <div className="bg-[#1a56db] rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-[22px] font-extrabold text-white leading-[1.1] tracking-tight">Ad ko Milegi<br/>Spotlight</h2>
            <p className="text-white text-xs mt-1 font-medium">Toh Sale hogi Full Speed</p>
            <button className="mt-4 bg-[#ccff00] text-black font-bold text-[11px] px-5 py-2 rounded-md flex items-center shadow-lg">
              Boost to Top ↗
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex justify-end">
            <div className="bg-[#ccff00] w-[70px] h-[70px] rounded-full absolute top-2 right-8 flex items-center justify-center text-[10px] font-black text-[#1a56db] border-[3px] border-white shadow-xl z-20">
              <div className="text-center leading-[1.1] uppercase">Starting<br/>at<br/><span className="text-base">₹99</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 gap-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform" onClick={() => alert(`Opening category: ${cat.name}`)}>
              <div className={`w-full aspect-square max-w-[80px] rounded-2xl flex items-center justify-center mb-2 shadow-lg ${cat.bg}`}>
                {cat.icon}
              </div>
              <span className="text-[11px] md:text-xs text-[#e0e0e0] text-center font-semibold leading-tight tracking-wide">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Banner */}
      <div className="px-4 py-4 cursor-pointer" onClick={() => alert('Verification Process starting...')}>
        <div className="bg-[#1a365d] border border-blue-800 rounded-lg p-4 flex items-center justify-between hover:bg-[#1e40af] transition-colors">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <span className="text-white font-bold">✔</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm md:text-base">You are eligible for Verified</h3>
              <p className="text-blue-300 text-xs md:text-sm mt-1">Gain instant trust of buyers</p>
            </div>
          </div>
          <button className="bg-white text-blue-900 font-bold text-xs md:text-sm px-4 py-2 rounded">
            Get Verified
          </button>
        </div>
      </div>

      {/* Fresh Recommendations */}
      <div className="px-4 pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Fresh recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.map((item) => (
            <div key={item.id} className="bg-[#1e1e1e] rounded-md overflow-hidden border border-gray-800 flex flex-col cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
              <div className="relative h-32 w-full bg-gray-800">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div 
                  className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                  onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}
                >
                  <Heart size={16} className="text-white hover:text-red-500" />
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{item.price}</h3>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-1">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.year}</p>
                </div>
                <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-wider">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
