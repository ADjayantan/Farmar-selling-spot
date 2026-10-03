import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Heart, Eye, MoreHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';

const MyListings: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get('/listings');
      // For demo, we just use the first 4 items from our massive mock DB
      setListings(res.data.length > 0 ? res.data : mockProducts.slice(0, 4).map(p => ({
        _id: p.id,
        cropName: p.title,
        quantity: 50,
        unit: 'kg',
        sellingMode: 'FIXED_PRICE',
        fixedPrice: parseInt(p.price.replace(/\D/g, '')),
        status: 'LIVE',
        createdAt: new Date().toISOString(),
        photos: [p.image]
      })));
    } catch {
      setListings(mockProducts.slice(0, 4).map(p => ({
        _id: p.id,
        cropName: p.title,
        quantity: 50,
        unit: 'kg',
        sellingMode: 'FIXED_PRICE',
        fixedPrice: parseInt(p.price.replace(/\D/g, '')),
        status: 'LIVE',
        createdAt: new Date().toISOString(),
        photos: [p.image]
      })));
    }
  };

  const markAsSold = async (id: string) => {
    try {
      await api.patch('/listings/' + id, { status: 'SOLD' });
      fetchListings();
    } catch {
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: 'SOLD' } : l));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f8f4] text-gray-800 font-sans">
      <div className="bg-white p-4 text-center font-bold border-b border-gray-200 tracking-widest text-sm text-gray-900 shadow-sm">
        MY ADS
      </div>

      <div className="flex-1 p-4 pb-24 overflow-y-auto space-y-4 max-w-3xl mx-auto w-full">
        {listings.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No ads found.</div>
        ) : (
          listings.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="px-4 py-2 flex justify-between items-center text-[10px] text-gray-500 font-bold border-b border-gray-100 bg-gray-50">
                <span>FROM: {new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} - TO: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                <MoreHorizontal size={16} className="text-gray-400" />
              </div>

              <div className="p-4 flex items-start space-x-4 cursor-pointer" onClick={() => navigate('/product/' + item._id)}>
                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200">
                  {item.photos && item.photos.length > 0 ? (
                    <img src={item.photos[0]} alt="thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    '🌾'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">{item.cropName}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{item.quantity} {item.unit}</p>
                  <p className="text-xl font-extrabold text-green-700 mt-2">
                    ₹ {item.fixedPrice ? item.fixedPrice.toLocaleString() : item.auctionBasePrice?.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-6 mt-3 text-xs text-gray-500 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Eye size={14} className="text-blue-500"/>
                      <span>Views: {Math.floor(Math.random() * 200)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-red-500" fill="currentColor" />
                      <span>Likes: {Math.floor(Math.random() * 10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <div className="flex mb-2">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    item.status === 'SOLD' ? 'bg-green-100 text-green-800' :
                    item.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                    item.status === 'LIVE' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {item.status !== 'SOLD' && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium">
                      {item.status === 'EXPIRED' 
                        ? "This ad has expired."
                        : "Ad is active. Found a buyer?"}
                    </p>
                    <button 
                      onClick={() => markAsSold(item._id)}
                      className="bg-white border-2 border-green-600 text-green-700 font-bold text-sm px-4 py-1.5 rounded-full hover:bg-green-50 transition-colors"
                    >
                      Mark as Sold
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-20 right-6 md:hidden">
        <button onClick={() => navigate('/create-listing')} className="bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 shadow-green-900/30">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default MyListings;
