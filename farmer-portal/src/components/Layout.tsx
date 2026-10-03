import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare, ChevronDown, Menu, User, X } from 'lucide-react';
const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f4f8f4] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#15803d] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <span className="text-2xl font-black text-green-700 tracking-tighter">F'oC</span>
                </div>
                <span className="text-2xl font-black text-white tracking-tight hidden sm:block">Farm'o Connect</span>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full bg-white rounded-md shadow-inner overflow-hidden border-2 border-transparent focus-within:border-green-300 transition-colors">
                <div className="flex items-center px-3 bg-gray-50 border-r border-gray-200 cursor-pointer hover:bg-gray-100">
                  <Search size={18} className="text-gray-500" />
                  <span className="ml-2 text-sm font-semibold text-gray-700">All India</span>
                  <ChevronDown size={16} className="ml-1 text-gray-700" />
                </div>
                <input 
                  type="text" 
                  placeholder="Find Fresh Fruits, Vegetables, and Organic Produce..." 
                  className="flex-1 px-4 py-2 text-gray-800 focus:outline-none placeholder-gray-400"
                />
                <button className="bg-[#166534] px-6 text-white font-bold hover:bg-[#14532d] transition-colors flex items-center justify-center">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Icons & Auth */}
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-white font-bold text-sm cursor-pointer hover:text-green-200 uppercase tracking-widest">English</span>
              
              <div className="flex space-x-4 text-white">
                <button className="relative p-1 hover:bg-green-800 rounded-full transition-colors" onClick={() => navigate('/chats')}>
                  <MessageSquare size={24} />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-green-700"></span>
                </button>
                <button className="p-1 hover:bg-green-800 rounded-full transition-colors">
                  <Bell size={24} />
                </button>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer hover:bg-green-800 p-1.5 rounded-md transition-colors" onClick={() => navigate('/profile')}>
                <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center border-2 border-green-300">
                  <User size={18} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-white" />
              </div>

              <button 
                onClick={() => navigate('/create-listing')}
                className="bg-white text-green-800 font-extrabold px-6 py-2 rounded-full border-[5px] border-green-600/30 shadow-lg hover:bg-green-50 transition-colors flex items-center shadow-green-900/20"
              >
                <span className="text-xl mr-1 leading-none">+</span> SELL
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:bg-green-800 rounded-md"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center space-x-6 text-sm">
              <span className="font-bold text-gray-800 flex items-center cursor-pointer uppercase tracking-wider hover:text-green-700 transition">
                All Categories <ChevronDown size={18} className="ml-1 text-gray-500"/>
              </span>
              <span className="cursor-pointer text-gray-600 hover:text-green-700 font-medium transition">Fresh Fruits</span>
              <span className="cursor-pointer text-gray-600 hover:text-green-700 font-medium transition">Vegetables</span>
              <span className="cursor-pointer text-gray-600 hover:text-green-700 font-medium transition">Organic Produce</span>
              <span className="cursor-pointer text-gray-600 hover:text-green-700 font-medium transition">Spices</span>
              <span className="cursor-pointer text-gray-600 hover:text-green-700 font-medium transition">Grains</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full z-40">
          <div className="mb-4">
            <div className="flex bg-gray-100 rounded-md p-2">
              <Search size={20} className="text-gray-500 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent w-full outline-none text-gray-800" />
            </div>
          </div>
          <Link to="/" className={`block px-3 py-2 rounded-md font-medium ${isActive('/') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>Dashboard</Link>
          <Link to="/listings" className={`block px-3 py-2 rounded-md font-medium ${isActive('/listings') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>My Ads</Link>
          <Link to="/chats" className={`block px-3 py-2 rounded-md font-medium ${isActive('/chats') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>Chats</Link>
          <Link to="/profile" className={`block px-3 py-2 rounded-md font-medium ${isActive('/profile') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>Profile</Link>
          <Link to="/create-listing" className="block px-3 py-2 rounded-md text-base font-bold text-white bg-green-600 hover:bg-green-700 mt-4 text-center">SELL NOW</Link>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative max-w-7xl w-full mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-300 py-8 mt-auto border-t-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-black text-white tracking-tighter">Farm'o Connect</h3>
            <p className="text-sm mt-1 text-gray-400">Connecting farmers directly to buyers.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">Help & Support</span>
            <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
