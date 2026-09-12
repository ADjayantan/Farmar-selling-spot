import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const CreateListing: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [type, setType] = useState<'FIXED' | 'AUCTION'>('FIXED');
  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [minBidIncrement, setMinBidIncrement] = useState('100');
  const [closingTime, setClosingTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const payload: any = {
        crop,
        quantity: Number(quantity),
        type,
        basePrice: Number(basePrice),
      };

      if (type === 'AUCTION') {
        payload.minBidIncrement = Number(minBidIncrement);
        payload.closingTime = closingTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      }

      await api.post('/listings', payload);
      navigate('/listings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('createListing')}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" checked={type === 'FIXED'} onChange={() => setType('FIXED')} className="text-green-600 focus:ring-green-500" />
              <span>Fixed Price</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" checked={type === 'AUCTION'} onChange={() => setType('AUCTION')} className="text-green-600 focus:ring-green-500" />
              <span>Live Auction</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
          <input 
            type="text" 
            value={crop} 
            onChange={(e) => setCrop(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Ponni Rice"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (in Quintals)</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. 50"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹/Quintal)</label>
          <input 
            type="number" 
            value={basePrice} 
            onChange={(e) => setBasePrice(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. 4500"
            required 
          />
        </div>

        {type === 'AUCTION' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Bid Increment (₹)</label>
              <input 
                type="number" 
                value={minBidIncrement} 
                onChange={(e) => setMinBidIncrement(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
              <input 
                type="datetime-local" 
                value={closingTime} 
                onChange={(e) => setClosingTime(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank for 24 hours from now</p>
            </div>
          </>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-medium mt-6 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Listing'}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
