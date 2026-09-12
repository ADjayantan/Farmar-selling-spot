import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, CloudSun, PlusCircle, Activity } from 'lucide-react';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [marketPrice, setMarketPrice] = useState<{ price: number, trend: string } | null>(null);
  const [forecast, setForecast] = useState<string | null>(null);
  const [stats, setStats] = useState({ activeListings: 0, liveAuctions: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch market price
        const priceRes = await api.get('/market-prices?crop=Ponni Rice').catch(() => null);
        if (priceRes && priceRes.data) {
          setMarketPrice(priceRes.data);
        } else {
          setMarketPrice({ price: 4500, trend: '+5%' }); // Fallback demo data
        }

        // Fetch weather/forecast
        const forecastRes = await api.get('/forecast?crop=Rice&region=TamilNadu').catch(() => null);
        if (forecastRes && forecastRes.data) {
          setForecast(forecastRes.data.recommendation || 'Good weather for harvesting.');
        } else {
          setForecast('Sunny with isolated showers. Favorable for paddy harvest.');
        }

        // Fetch user stats
        const listingsRes = await api.get('/listings?farmer=me').catch(() => null);
        if (listingsRes && listingsRes.data) {
          const listings = listingsRes.data;
          const active = listings.filter((l: any) => l.status === 'ACTIVE' && l.type === 'FIXED').length;
          const live = listings.filter((l: any) => l.status === 'ACTIVE' && l.type === 'AUCTION').length;
          setStats({ activeListings: active, liveAuctions: live });
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h2>
        <button 
          onClick={() => navigate('/create-listing')}
          className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded shadow hover:bg-green-700"
        >
          <PlusCircle size={18} />
          <span className="text-sm font-medium">{t('sellCrop')}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer" onClick={() => navigate('/listings')}>
          <div className="text-3xl font-bold text-green-600">{stats.activeListings}</div>
          <div className="text-sm text-gray-500 mt-1 text-center">{t('activeListings')}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer" onClick={() => navigate('/listings')}>
          <div className="text-3xl font-bold text-orange-500 flex items-center gap-2">
            {stats.liveAuctions} <Activity size={20} className="animate-pulse" />
          </div>
          <div className="text-sm text-gray-500 mt-1 text-center">{t('liveAuctions')}</div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h3 className="flex items-center text-blue-800 font-semibold mb-2">
          <TrendingUp size={18} className="mr-2" />
          {t('marketPrices')} (Ponni Rice)
        </h3>
        {marketPrice ? (
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold text-blue-900">₹{marketPrice.price}/Qtl</span>
            <span className="text-sm font-medium text-green-600 mb-1">{marketPrice.trend}</span>
          </div>
        ) : (
          <p className="text-sm text-blue-600">Loading...</p>
        )}
      </div>

      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
        <h3 className="flex items-center text-yellow-800 font-semibold mb-2">
          <CloudSun size={18} className="mr-2" />
          {t('weatherForecast')}
        </h3>
        <p className="text-sm text-yellow-900 leading-relaxed">
          {forecast || 'Loading forecast...'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
