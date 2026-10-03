import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Share2, Heart, MessageSquare, Phone } from 'lucide-react';

const mockDB = {
  '101': { title: 'Fresh Organic Tomatoes', price: '? 2,500 / quintal', location: 'Dindigul, Tamil Nadu', year: 'Harvested Today', image: '/images/tomato.png', seller: 'Raja', desc: 'Freshly harvested organic tomatoes from Dindigul. Excellent quality and size. Minimum order 10 quintals.' },
  '102': { title: 'Ooty Potatoes - Premium Quality', price: '? 3,200 / quintal', location: 'Mettupalayam Market', year: 'Fresh Stock', image: '/images/potato.png', seller: 'Kumar Farms', desc: 'Premium quality Ooty potatoes available at Mettupalayam market. Good for long storage.' },
  '103': { title: 'Bellary Onions - 50 Bags', price: '? 1,800 / quintal', location: 'Oddanchatram Market', year: 'Dry & Good Size', image: '/images/onion.png', seller: 'Senthil', desc: 'Dry Bellary onions, medium to large size. 50 bags ready for immediate loading.' },
  '104': { title: 'Salem Mangoes (Alphonso)', price: '? 12,000 / ton', location: 'Salem, Tamil Nadu', year: 'Ready to dispatch', image: '/images/fruits.png', seller: 'Mani', desc: 'Sweet Salem Alphonso mangoes. Naturally ripened. Bulk buyers only.' },
  '1': { title: 'Fresh Organic Tomatoes', price: '? 2,200 / quintal', location: 'Dindigul, Tamil Nadu', year: 'Harvested Today', image: '/images/tomato.png', seller: 'You', desc: 'Your own listing.' },
  '2': { title: 'Ooty Potatoes', price: '? 3,200 / quintal', location: 'Mettupalayam Market', year: 'Fresh Stock', image: '/images/potato.png', seller: 'You', desc: 'Your own listing.' },
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = mockDB[id as keyof typeof mockDB] || {
    title: 'Unknown Product',
    price: '? 0',
    location: 'Unknown Location',
    year: 'N/A',
    image: '/images/tomato.png',
    seller: 'Unknown',
    desc: 'Product description not available.'
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors"><Share2 size={24} /></button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors"><Heart size={24} /></button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Image & Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-black rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-gray-800">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed">{product.desc}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <span className="bg-[#2a2b2f] px-4 py-2 rounded-md text-sm text-gray-300 border border-gray-700">Type: Produce</span>
              <span className="bg-[#2a2b2f] px-4 py-2 rounded-md text-sm text-gray-300 border border-gray-700">Status: {product.year}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Price, Location, Seller Info */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-2">{product.price}</h1>
            <p className="text-lg text-gray-300 font-medium mb-6 leading-tight">{product.title}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-800 pt-4 mt-2">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{product.location}</span>
              </div>
              <span>Today</span>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold w-full text-left mb-4">Seller Description</h2>
            <div className="flex items-center w-full mb-6 space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                {product.seller.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{product.seller}</h3>
                <p className="text-sm text-gray-400">Member since 2024</p>
              </div>
            </div>
            
            <button className="w-full bg-[#121212] hover:bg-gray-800 border border-white text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors mb-3">
              <MessageSquare size={20} />
              <span>Chat with seller</span>
            </button>
            <button className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Phone size={20} />
              <span>Show phone number</span>
            </button>
          </div>
          
          {/* Safety Tips */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Safety Tips</h2>
            <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
              <li>Meet seller at a safe location</li>
              <li>Check the item before you buy</li>
              <li>Pay only after collecting item</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
