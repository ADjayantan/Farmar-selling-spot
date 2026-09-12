import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('farmer@demo.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const res = await api.post('/auth/login', { email, password });
      if (res.data.user.role !== 'FARMER') {
        setError('Access denied: Only farmers can use this portal.');
        return;
      }
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">{t('welcome')}</h1>
        
        <div className="flex justify-center mb-6 space-x-4">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('ta')}
            className={`px-4 py-2 rounded ${language === 'ta' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            தமிழ்
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
