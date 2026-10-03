import React from 'react';
import { MapPin, Heart, Wheat, Sprout, Leaf, Trees, Droplets, Sun, ShoppingCart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Fresh Fruits', icon: <Leaf size={36} className="text-green-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-green-100 hover:bg-green-200' },
    { id: 2, name: 'Vegetables', icon: <Trees size={36} className="text-emerald-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-emerald-100 hover:bg-emerald-200' },
    { id: 3, name: 'Organic Produce', icon: <Sprout size={36} className="text-lime-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-lime-100 hover:bg-lime-200' },
    { id: 4, name: 'Spices & Herbs', icon: <Package size={36} className="text-orange-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-orange-100 hover:bg-orange-200' },
    { id: 5, name: 'Grains', icon: <Wheat size={36} className="text-amber-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-amber-100 hover:bg-amber-200' },
    { id: 6, name: 'Dairy', icon: <Droplets size={36} className="text-blue-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-blue-100 hover:bg-blue-200' },
    { id: 7, name: 'Honey', icon: <Sun size={36} className="text-yellow-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 8, name: 'Baskets', icon: <ShoppingCart size={36} className="text-teal-700 drop-shadow-sm" strokeWidth={1.5} />, bg: 'bg-teal-100 hover:bg-teal-200' },
  ];

  return (
    <div className="flex flex-col bg-[#f4f8f4] min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        {/* Banner */}
        <div className="px-4 py-6 cursor-pointer" onClick={() => alert('Boost Ads Details...')}>
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl p-6 flex justify-between items-center relative overflow-hidden shadow-lg">
            <div className="z-10">
              <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight mb-2">Sell your Harvest<br/>Faster & Better</h2>
              <p className="text-green-100 font-medium max-w-[200px] md:max-w-sm mb-4">Reach thousands of buyers directly and get the best price for your produce.</p>
              <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-gray-50">Sell Now</button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-30">
              <Sprout size={200} className="text-white" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-4 py-2 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center cursor-pointer group" onClick={() => alert(`Opening category: ${cat.name}`)}>
                <div className={`w-full aspect-square max-w-[80px] rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-all duration-300 group-hover:scale-105 ${cat.bg}`}>
                  {cat.icon}
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-green-700 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Category Rows */}
        {categories.map(cat => {
          const categoryProducts = mockProducts.filter(p => p.categoryId === cat.id).slice(0, 8);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat.id} className="px-4 pb-10">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-gray-800">{cat.name}</h2>
                <span className="text-sm font-bold text-green-700 cursor-pointer hover:underline">View more</span>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {categoryProducts.map((item) => (
                  <div key={item.id} className="min-w-[220px] md:min-w-[240px] bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow snap-start" onClick={() => navigate(`/product/${item.id}`)}>
                    <div className="relative h-36 w-full bg-gray-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div 
                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                        onClick={(e) => { e.stopPropagation(); alert('Added to favorites!'); }}
                      >
                        <Heart size={16} className="text-gray-600 hover:text-red-500" />
                      </div>
                    </div>
                    <div className="p-3 border-l-[3px] border-l-transparent hover:border-l-green-600 transition-colors">
                      <h3 className="font-extrabold text-gray-900 text-lg mb-1">{item.price}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-1 font-medium">{item.title}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        <div className="flex items-center truncate max-w-[70%]">
                          <MapPin size={10} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <span className="flex-shrink-0 ml-1">{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
