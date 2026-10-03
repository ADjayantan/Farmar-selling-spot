import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Sprout, ArrowRight } from 'lucide-react';
import api from '../services/api';

// Minimal AuthContext usage to bypass errors if it was complex, 
// or just use the local state + navigate since the API call works in demo.
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('farmer@demo.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();
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
          role: 'FARMER',
          phone: '+91 98765 43210'
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
    <div className="min-h-screen bg-[#f4f8f4] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#15803d] rounded-b-[50px] md:rounded-b-[100px] -z-0"></div>
      <div className="absolute top-10 right-10 opacity-20">
        <Leaf size={120} className="text-white" />
      </div>
      <div className="absolute top-32 left-10 opacity-20">
        <Sprout size={80} className="text-white transform -rotate-12" />
      </div>

      <div className="w-full max-w-md z-10">
        
        {/* Logo Area */}
        <div className="mb-8 text-center text-white">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 border-4 border-green-400/30">
            <Leaf size={40} className="text-[#15803d]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight drop-shadow-md">Farm'o Connect</h1>
          <p className="text-green-100 text-sm mt-1 font-medium bg-green-900/20 inline-block px-3 py-1 rounded-full border border-green-500/30">
            Farmer Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative">
          
          <div className="absolute -top-4 right-8 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black shadow-sm border border-orange-200 uppercase tracking-wider">
            {language === 'ta' ? 'விவசாயி உள்நுழைவு' : 'Farmer Login'}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'ta' ? 'வரவேற்கிறோம்!' : 'Welcome Back!'}
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {language === 'ta' ? 'மின்னஞ்சல் / தொலைபேசி' : 'Email or Phone'}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold border border-red-100 flex items-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#15803d] hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center group disabled:opacity-70 mt-4"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  {language === 'ta' ? 'உள்நுழைய' : 'Secure Login'} 
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Language Toggle */}
          <div className="mt-8 flex justify-center items-center space-x-3 pt-6 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-500">Language:</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('ta')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'ta' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        <p className="text-center text-green-900/60 text-xs font-medium mt-6">
          &copy; 2026 Farm'o Connect. Empowering Farmers.
        </p>

      </div>
    </div>
  );
};

export default Login;

