import React, { useState } from 'react';
import { Eye, Plus, Edit3, Trash2, DollarSign, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';

const MyListings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  
  // Use mock products directly for the UI presentation
  const myItems = mockProducts.slice(0, 8); // Farmer's simulated items
  
  const activeListings = myItems.slice(0, 5);
  const soldListings = myItems.slice(5, 8);

  const displayListings = activeTab === 'active' ? activeListings : soldListings;

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-900 font-sans pb-20">
      {/* Header */}
      <div className="bg-[#15803d] p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-white tracking-wide">My Ads & Inventory</h1>
        <button 
          onClick={() => navigate('/create')}
          className="bg-white text-green-700 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors"
        >
          <Plus size={20} className="font-bold" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        
        {/* Quick Analytics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center text-gray-500 mb-2">
              <Package size={16} className="mr-1.5" />
              <span className="text-xs font-bold uppercase">Active Ads</span>
            </div>
            <p className="text-2xl font-black text-gray-900">12</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center text-green-600 mb-2">
              <DollarSign size={16} className="mr-1.5" />
              <span className="text-xs font-bold uppercase">Total Sold</span>
            </div>
            <p className="text-2xl font-black text-green-700">₹ 42.5k</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center text-blue-500 mb-2">
              <Eye size={16} className="mr-1.5" />
              <span className="text-xs font-bold uppercase">Profile Views</span>
            </div>
            <p className="text-2xl font-black text-gray-900">845</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-[3px] transition-colors ${activeTab === 'active' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            ACTIVE ({activeListings.length})
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-[3px] transition-colors ${activeTab === 'sold' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('sold')}
          >
            SOLD ({soldListings.length})
          </button>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {displayListings.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row relative">
              
              {/* Product Info */}
              <div className="flex flex-1 p-4 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mr-4 flex-shrink-0 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  {activeTab === 'sold' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-black text-xs uppercase transform -rotate-12 border-2 border-white px-2 py-0.5 rounded">SOLD</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg truncate pr-4">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{item.year}</p>
                  <p className="font-black text-green-700 text-lg mt-2">{item.price}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50 flex md:flex-col p-2 md:w-32">
                <button className="flex-1 md:flex-none flex items-center justify-center py-2 md:py-3 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye size={16} className="mr-2" /> View
                </button>
                <div className="w-px md:h-px md:w-full bg-gray-200 my-1"></div>
                <button className="flex-1 md:flex-none flex items-center justify-center py-2 md:py-3 text-sm font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  <Edit3 size={16} className="mr-2" /> Edit
                </button>
                <div className="w-px md:h-px md:w-full bg-gray-200 my-1"></div>
                <button className="flex-1 md:flex-none flex items-center justify-center py-2 md:py-3 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;

