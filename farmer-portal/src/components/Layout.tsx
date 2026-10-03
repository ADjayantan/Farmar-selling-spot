import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronDown, MessageSquare, Bell, User, Plus, Heart } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* OLX-Style Desktop Top Navbar */}
      <div className="bg-[#121212] sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-4">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer mr-2"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-3xl mr-2">🌾</span>
            <h1 className="text-2xl font-black tracking-tight text-white hidden lg:block">Farm'o Connect</h1>
          </div>

          {/* Location Dropdown */}
          <div className="hidden md:flex items-center bg-[#1e1e1e] border-2 border-white rounded px-3 py-2.5 w-64">
            <Search size={20} className="text-white mr-2" />
            <input 
              type="text" 
              placeholder="India" 
              className="bg-transparent outline-none flex-1 text-white placeholder-gray-400 font-bold text-sm"
              defaultValue="Tamil Nadu"
            />
            <ChevronDown size={24} className="text-white ml-2 cursor-pointer" />
          </div>

          {/* Main Search Bar */}
          <div className="hidden md:flex flex-1 items-center bg-[#121212] border-2 border-white rounded">
            <input 
              type="text" 
              placeholder="Find Fruits, Vegetables and more..." 
              className="bg-transparent outline-none flex-1 text-white placeholder-gray-400 px-4 py-2.5 text-base"
            />
            <div 
              className="bg-white p-2.5 px-4 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => alert('Search feature coming soon!')}
            >
              <Search size={24} className="text-[#121212] font-black" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6 pl-4">
            <div className="hidden lg:flex font-bold text-sm cursor-pointer hover:text-gray-300 uppercase tracking-widest">
              English
            </div>
            <div className="cursor-pointer hover:text-gray-300 relative" onClick={() => navigate('/chats')}>
              <MessageSquare size={24} />
              <div className="absolute -top-1 -right-1 bg-blue-600 text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">2</div>
            </div>
            <div className="cursor-pointer hover:text-gray-300 hidden sm:block">
              <Bell size={24} />
            </div>
            <div className="cursor-pointer flex items-center hover:text-gray-300" onClick={() => navigate('/profile')}>
              <User size={24} className="mr-1" />
              <ChevronDown size={16} />
            </div>
            
            {/* Sell Button */}
            <button 
              onClick={() => navigate('/create-listing')} 
              className="border-[5px] border-t-cyan-400 border-l-yellow-400 border-r-blue-500 border-b-yellow-400 bg-white text-black px-5 py-1 rounded-full font-black tracking-widest shadow-lg flex items-center hover:scale-105 transition-transform"
            >
              <Plus size={20} className="mr-1 font-black" strokeWidth={3} /> SELL
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Categories Bar (OLX Style) */}
      <div className="border-b border-gray-800 bg-[#121212] hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 text-[13px] font-semibold flex items-center space-x-6 text-gray-300">
          <span className="font-bold text-white flex items-center cursor-pointer uppercase tracking-wider hover:text-gray-300 transition">
            All Categories <ChevronDown size={18} className="ml-1 font-black"/>
          </span>
          <span className="cursor-pointer hover:text-white transition">Fresh Fruits</span>
          <span className="cursor-pointer hover:text-white transition">Vegetables</span>
          <span className="cursor-pointer hover:text-white transition">Organic Produce</span>
          <span className="cursor-pointer hover:text-white transition">Spices</span>
          <span className="cursor-pointer hover:text-white transition">Grains</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-[#121212]">
        <div className="max-w-7xl mx-auto w-full h-full">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation (Only visible on small screens) */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#121212] border-t border-gray-800 px-4 py-3 flex justify-between items-center z-50">
        <div onClick={() => navigate('/dashboard')} className={`flex flex-col items-center ${location.pathname.includes('/dashboard') ? 'text-white' : 'text-gray-500'}`}>
          <Search size={24} />
          <span className="text-[10px] font-bold mt-1">HOME</span>
        </div>
        <div onClick={() => navigate('/chats')} className={`flex flex-col items-center ${location.pathname.includes('/chats') ? 'text-white' : 'text-gray-500'}`}>
          <MessageSquare size={24} />
          <span className="text-[10px] font-bold mt-1">CHATS</span>
        </div>
        <div onClick={() => navigate('/create-listing')} className="relative -top-5">
           <div className="border-[4px] border-t-cyan-400 border-l-yellow-400 border-r-blue-500 border-b-yellow-400 bg-white text-black p-3 rounded-full shadow-lg">
             <Plus size={24} strokeWidth={3} />
           </div>
        </div>
        <div onClick={() => navigate('/listings')} className={`flex flex-col items-center ${location.pathname.includes('/listings') ? 'text-white' : 'text-gray-500'}`}>
          <Heart size={24} />
          <span className="text-[10px] font-bold mt-1">MY ADS</span>
        </div>
        <div onClick={() => navigate('/profile')} className={`flex flex-col items-center ${location.pathname.includes('/profile') ? 'text-white' : 'text-gray-500'}`}>
          <User size={24} />
          <span className="text-[10px] font-bold mt-1">ACCOUNT</span>
        </div>
      </div>
    </div>
  );
};


export default Layout;
