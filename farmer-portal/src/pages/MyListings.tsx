import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Heart, Eye, MoreHorizontal } from 'lucide-react';

const mockListings = [
  { _id: '1', cropName: 'Premium Ponni Rice', quantity: 20, unit: 'quintal', sellingMode: 'AUCTION', auctionBasePrice: 2200, fixedPrice: 0, status: 'LIVE', createdAt: new Date().toISOString(), photos: ['./images/rice.png'] },
  { _id: '2', cropName: 'Organic Tomatoes', quantity: 500, unit: 'kg', sellingMode: 'FIXED_PRICE', auctionBasePrice: 0, fixedPrice: 45, status: 'ACTIVE', createdAt: new Date().toISOString(), photos: ['./images/seeds.png'] },
  { _id: '3', cropName: 'Used Tractor', quantity: 1, unit: 'unit', sellingMode: 'FIXED_PRICE', auctionBasePrice: 0, fixedPrice: 250000, status: 'SOLD', createdAt: new Date(Date.now() - 7*24*60*60*1000).toISOString(), photos: ['./images/tractor.png'] },
  { _id: '4', cropName: 'Agricultural Land', quantity: 5, unit: 'acre', sellingMode: 'AUCTION', auctionBasePrice: 3500000, fixedPrice: 0, status: 'EXPIRED', createdAt: new Date(Date.now() - 30*24*60*60*1000).toISOString(), photos: ['./images/land.png'] },
];

const MyListings: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get('/listings');
      setListings(res.data.length > 0 ? res.data : mockListings);
    } catch {
      setListings(mockListings);
    }
  };

  const markAsSold = async (id: string) => {
    try {
      await api.patch(`/listings/${id}`, { status: 'SOLD' });
      fetchListings();
    } catch {
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: 'SOLD' } : l));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <div className="bg-[#1e1e1e] p-4 text-center font-bold border-b border-gray-800 tracking-widest text-sm">
        MY ADS
      </div>

      <div className="flex-1 p-4 pb-24 overflow-y-auto space-y-4">
        {listings.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No ads found.</div>
        ) : (
          listings.map((item) => (
            <div key={item._id} className="bg-[#1e1e1e] border border-gray-800 rounded-md overflow-hidden">
              <div className="px-4 py-2 flex justify-between items-center text-[10px] text-gray-400 font-semibold border-b border-gray-800 bg-[#171717]">
                <span>FROM: {new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} - TO: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                <MoreHorizontal size={16} />
              </div>

              <div className="p-3 flex items-start space-x-4 cursor-pointer" onClick={() => alert('Viewing Ad Details...')}>
                <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl">
                  {item.photos && item.photos.length > 0 ? (
                    <img src={item.photos[0]} alt="thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    '🌾'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-200 line-clamp-1">{item.cropName} - {item.quantity} {item.unit}</h3>
                  <p className="text-lg font-bold text-white mt-1">
                    ₹ {item.sellingMode === 'AUCTION' ? item.auctionBasePrice?.toLocaleString() : item.fixedPrice?.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-6 mt-2 text-xs text-gray-500 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>Views: {Math.floor(Math.random() * 200)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-red-900" fill="currentColor" />
                      <span>Likes: {Math.floor(Math.random() * 10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-800 bg-[#1a1a1a]">
                <div className="flex mb-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    item.status === 'SOLD' ? 'bg-green-600' :
                    item.status === 'EXPIRED' ? 'bg-red-600' :
                    item.status === 'LIVE' ? 'bg-blue-600' : 'bg-yellow-600 text-black'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {item.status !== 'SOLD' && (
                  <>
                    <div className="bg-[#121212] border-l-2 border-red-600 p-2 mb-3">
                      <p className="text-xs text-gray-300 font-medium">
                        {item.status === 'EXPIRED' 
                          ? "This ad was expired. If you sold it, please mark it as sold"
                          : "This ad is currently active. If you sold it, please mark it as sold"}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => markAsSold(item._id)}
                        className="bg-transparent border border-white text-white font-bold text-sm px-4 py-2 rounded"
                      >
                        Mark as sold
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyListings;
