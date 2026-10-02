import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
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
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: 'Logout', onClick: handleLogout, color: 'text-red-500' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-[#1e1e1e] p-4 font-bold border-b border-gray-800 text-lg">
        Account
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-4 flex items-center border-b border-gray-800 bg-[#1e1e1e] mt-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl mr-4 shadow-lg">
            🧑‍🌾
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.name || 'Farmer Demo'}</h2>
            <p className="text-gray-400 text-sm mt-1">{user?.email || 'farmer@demo.com'}</p>
            <button className="mt-2 text-blue-500 text-sm font-bold">View and edit profile</button>
          </div>
        </div>

        {/* Info list */}
        <div className="bg-[#1e1e1e] mt-4 border-t border-b border-gray-800">
          <div className="p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center text-gray-300">
              <Phone size={20} className="mr-3" />
              <span>{(user as any)?.phone || '+91 9876543210'}</span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center text-gray-300">
              <MapPin size={20} className="mr-3" />
              <span>{(user as any)?.location || 'Tamil Nadu, India'}</span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <span className="font-bold mr-3 text-lg">A/अ</span>
              <span>Language</span>
            </div>
            <select 
              className="bg-transparent text-blue-500 font-bold outline-none cursor-pointer text-right appearance-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ta')}
            >
              <option value="en" className="bg-gray-800 text-white">English</option>
              <option value="ta" className="bg-gray-800 text-white">தமிழ்</option>
            </select>
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-[#1e1e1e] mt-4 border-t border-gray-800 mb-24">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="p-4 flex items-center justify-between border-b border-gray-800 cursor-pointer hover:bg-[#2a2a2a]"
                onClick={item.onClick}
              >
                <div className="flex items-center">
                  <Icon size={20} className={`mr-3 ${item.color || 'text-gray-300'}`} />
                  <span className={`${item.color || 'text-gray-300'}`}>{item.label}</span>
                </div>
                {!item.color && <ChevronRight size={20} className="text-gray-600" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
