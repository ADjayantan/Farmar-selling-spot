import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Settings, HelpCircle, LogOut, ChevronRight, User, Star, Package, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Package, label: 'My Ads & Orders', onClick: () => navigate('/listings') },
    { icon: Settings, label: 'Account Settings', onClick: () => {} },
    { icon: ShieldCheck, label: 'Privacy & Security', onClick: () => {} },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => {} },
    { icon: LogOut, label: 'Logout', onClick: handleLogout, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-800 font-sans pb-20">
      <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mx-auto">My Profile</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6 mt-4">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center space-x-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 relative">
            <span className="text-4xl font-bold text-white">{user?.name?.charAt(0) || 'F'}</span>
            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" />
            </div>
          </div>
          
          <div className="z-10 flex-1">
            <h2 className="text-2xl font-extrabold text-gray-900">{user?.name || 'Farmer Account'}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-1 font-medium">
              <Phone size={14} className="mr-1" /> {(user as any)?.phone || '+91 98765 43210'}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1 font-medium">
              <MapPin size={14} className="mr-1" /> Coimbatore, Tamil Nadu
            </div>
          </div>

          <button className="text-green-700 font-bold text-sm bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors border border-green-200 z-10">
            Edit
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <TrendingUp size={20} />
            </div>
            <span className="text-2xl font-black text-gray-900">12</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Ads Sold</span>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2">
              <Star size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black text-gray-900">4.8</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Rating</span>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
              <User size={20} />
            </div>
            <span className="text-2xl font-black text-gray-900">1.2k</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Followers</span>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {menuItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${idx !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
              onClick={item.onClick}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${item.color ? 'bg-red-50' : 'bg-gray-100'}`}>
                  <item.icon size={20} className={item.color || 'text-gray-700'} />
                </div>
                <span className={`font-bold ${item.color || 'text-gray-800'}`}>{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">Language</h3>
            <p className="text-sm text-gray-500 mt-1">Change your app language</p>
          </div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ta')}
            className="bg-gray-50 border border-gray-200 text-gray-900 font-bold text-sm rounded-lg p-2.5 outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;

