import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('farmer@demo.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.user.role !== 'FARMER') {
        setError('This account is not a farmer account. Please use the Buyer or Transporter app.');
        setLoading(false);
        return;
      }
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      // Offline demo mode - if server is down, allow demo login
      if (email === 'farmer@demo.com' && password === 'demo123') {
        const demoUser = {
          id: 'demo-farmer-001',
          name: 'Rajesh Kumar',
          email: 'farmer@demo.com',
          role: 'FARMER'
        };
        login(demoUser, 'demo-offline-token');
        navigate('/dashboard');
        return;
      }
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      {/* Logo Area */}
      <div className="mb-8 text-center">
        <div className="text-6xl mb-4">🌾</div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Farm'o Connect</h1>
        <p className="text-gray-400 text-sm mt-2">Farmer Selling Spot</p>
      </div>

      <div className="w-full max-w-sm">
        {/* Language Toggle */}
        <div className="flex justify-center mb-6 space-x-3">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${language === 'en' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('ta')}
            className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${language === 'ta' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600'}`}
          >
            தமிழ்
          </button>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('email')}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('password')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none text-sm"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-3.5 rounded-lg font-bold text-sm mt-4 hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : t('login')}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Demo: farmer@demo.com / demo123
        </p>
      </div>
    </div>
  );
};

export default Login;
