import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t('profile')}</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-green-600 p-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            <User size={48} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-white">{user?.name || 'Farmer User'}</h3>
          <p className="text-green-100">{user?.role || 'FARMER'}</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center">
            <Mail size={20} className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user?.email || 'farmer@demo.com'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield size={20} className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium text-gray-900 capitalize">Verified Farmer</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Language Preference</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 rounded border ${language === 'en' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 text-gray-600'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('ta')}
                className={`flex-1 py-2 rounded border ${language === 'ta' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 text-gray-600'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 mt-6 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
