import React from 'react';
import { MapPin, Search, Mic, Heart, Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Crops & Veggies', icon: '🌾' },
    { id: 2, name: 'Tractors', icon: '🚜' },
    { id: 3, name: 'Seeds', icon: '🌱' },
    { id: 4, name: 'Transport', icon: '🚚' },
    { id: 5, name: 'Fertilizers', icon: '🧪' },
    { id: 6, name: 'Machinery', icon: '⚙️' },
    { id: 7, name: 'Livestock', icon: '🐄' },
    { id: 8, name: 'Properties', icon: '🏠' },
  ];

  const recommendations = [
    { id: 101, title: 'Premium Ponni Rice - 50 Quintals', price: '₹ 1,10,000', location: 'Thanjavur, Tamil Nadu', year: 'Harvest 2026', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
    { id: 102, title: 'Mahindra Tractor 575 DI SP Plus', price: '₹ 5,25,000', location: 'Tirupur Somanur Road', year: '2022 - 1,200 hrs', image: 'https://images.unsplash.com/photo-1592837965902-1249b67362d2?auto=format&fit=crop&w=300&q=80' },
    { id: 103, title: 'Organic Tomato Seeds', price: '₹ 1,500', location: 'Coimbatore', year: 'New', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
    { id: 104, title: 'Agricultural Land - 5 Acres', price: '₹ 45,00,000', location: 'Pollachi', year: 'Ready to use', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80' },
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
              placeholder="Search 'Tractors'" 
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
              <div className="w-full aspect-square max-w-[80px] bg-[#2a2b2f] rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-2 shadow-sm border border-gray-800">
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
            <div key={item.id} className="bg-[#1e1e1e] rounded-md overflow-hidden border border-gray-800 flex flex-col cursor-pointer" onClick={() => navigate(`/auction/${item.id}`)}>
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
