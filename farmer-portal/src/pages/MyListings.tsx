import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PlusCircle } from 'lucide-react';
import api from '../services/api';

type Tab = 'ACTIVE' | 'LIVE' | 'SOLD' | 'EXPIRED';

const MyListings: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [listings, setListings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('ACTIVE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings?farmer=me');
        setListings(res.data);
      } catch (err) {
        console.error('Failed to fetch listings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((l) => {
    if (activeTab === 'ACTIVE') return l.status === 'ACTIVE' && l.type === 'FIXED';
    if (activeTab === 'LIVE') return l.status === 'ACTIVE' && l.type === 'AUCTION';
    return l.status === activeTab;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t('myListings')}</h2>
        <button 
          onClick={() => navigate('/create-listing')}
          className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded shadow hover:bg-green-700"
        >
          <PlusCircle size={18} />
          <span className="text-sm font-medium">New</span>
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-2">
        {(['ACTIVE', 'LIVE', 'SOLD', 'EXPIRED'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
              activeTab === tab 
                ? 'border-b-2 border-green-600 text-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'LIVE' ? 'Live Auctions' : tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading listings...</p>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <p className="text-gray-500">No {activeTab.toLowerCase()} listings found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{listing.crop}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  listing.type === 'AUCTION' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {listing.type}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>Quantity: <span className="font-medium text-gray-900">{listing.quantity} Qtl</span></p>
                <p>Base Price: <span className="font-medium text-gray-900">₹{listing.basePrice}</span></p>
                {listing.type === 'AUCTION' && activeTab === 'LIVE' && (
                  <p>Current Highest: <span className="font-bold text-green-600">₹{listing.highestBid || listing.basePrice}</span></p>
                )}
              </div>
              
              {listing.type === 'AUCTION' && activeTab === 'LIVE' && (
                <button 
                  onClick={() => navigate(`/auction/${listing.id}`)}
                  className="w-full bg-orange-500 text-white py-2 rounded text-sm font-medium hover:bg-orange-600"
                >
                  Manage Auction
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
