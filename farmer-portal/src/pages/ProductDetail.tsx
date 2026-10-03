import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Share2, Heart, MessageSquare, Phone } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/mockProducts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = getProductById(id || '') || {
    id: '0', categoryId: 0, title: 'Unknown Product',
    price: '? 0',
    location: 'Unknown Location',
    year: 'N/A',
    image: './images/tomato.png',
    seller: 'Unknown',
    desc: 'Product description not available.'
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f8f4] text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"><Share2 size={24} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"><Heart size={24} /></button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Image & Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-gray-200 shadow-sm">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Description</h2>
            <p className="text-gray-700 leading-relaxed text-base">{product.desc}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm font-semibold border border-green-200">Type: Produce</span>
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm font-semibold border border-green-200">Status: {product.year}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Price, Location, Seller Info */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.price}</h1>
            <p className="text-lg text-gray-600 font-medium mb-6 leading-tight">{product.title}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4 mt-2 font-semibold">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{product.location}</span>
              </div>
              <span>Today</span>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center">
            <h2 className="text-lg font-bold w-full text-left mb-4 text-gray-900">Seller Details</h2>
            <div className="flex items-center w-full mb-6 space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md">
                {product.seller.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{product.seller}</h3>
                <p className="text-sm text-gray-500 font-medium">Member since 2024</p>
              </div>
            </div>
            
            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors mb-3 shadow-md">
              <MessageSquare size={20} />
              <span>Chat with seller</span>
            </button>
            <button className="w-full bg-white hover:bg-gray-50 text-green-700 border-2 border-green-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Phone size={20} />
              <span>Show phone number</span>
            </button>
          </div>
          
          {/* Safety Tips */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow-sm">
            <h2 className="text-lg font-bold mb-3 text-green-800">Safety Tips</h2>
            <ul className="text-sm text-green-700 space-y-2 list-disc list-inside font-medium">
              <li>Meet seller at a safe location</li>
              <li>Check the quality before you buy</li>
              <li>Pay only after collecting the goods</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {product.categoryId && (
        <div className="max-w-5xl mx-auto w-full p-4 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {getProductsByCategory(product.categoryId).filter((p: any) => p.id !== product.id).slice(0, 10).map((item: any) => (
              <div 
                key={item.id} 
                className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow snap-start flex-shrink-0"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="h-28 bg-gray-100 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="font-extrabold text-gray-900 text-sm truncate">{item.price}</h3>
                  <p className="text-xs text-gray-600 truncate mt-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacing for mobile nav */}
      <div className="h-20"></div>

    </div>
  );
};

export default ProductDetail;


