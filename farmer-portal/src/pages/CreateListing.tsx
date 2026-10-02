import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import api from '../services/api';

const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cropName: '',
    variety: '',
    quantity: '',
    unit: 'quintal',
    qualityGrade: 'Grade A',
    pickupLocation: '',
    sellingMode: 'FIXED_PRICE',
    fixedPrice: '',
  });

  const categories = [
    { id: 'Crops', name: 'Crops & Veggies', icon: '🌾' },
    { id: 'Tractors', name: 'Tractors', icon: '🚜' },
    { id: 'Properties', name: 'Properties', icon: '🏠' },
    { id: 'Machinery', name: 'Machinery', icon: '⚙️' },
    { id: 'Livestock', name: 'Livestock', icon: '🐄' },
    { id: 'Fertilizers', name: 'Fertilizers', icon: '🧪' },
  ];

  const handleCategorySelect = (catId: string) => {
    setFormData({ ...formData, cropName: catId });
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/listings', {
        ...formData,
        quantity: Number(formData.quantity),
        fixedPrice: Number(formData.fixedPrice),
      });
      navigate('/listings');
    } catch (err) {
      console.error(err);
      alert('Error creating listing');
    }
  };

  if (step === 1) {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] text-white">
        <div className="bg-[#1e1e1e] p-4 flex items-center border-b border-gray-800">
          <button onClick={() => navigate('/dashboard')} className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">What are you offering?</h1>
        </div>
        <div className="grid grid-cols-2 p-0">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className={`flex flex-col items-center justify-center p-6 border-b border-gray-800 cursor-pointer hover:bg-[#1a1a1a] ${index % 2 === 0 ? 'border-r' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white pb-20">
      <div className="bg-[#1e1e1e] p-4 flex items-center border-b border-gray-800 sticky top-0 z-10">
        <button onClick={() => setStep(1)} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">Include some details</h1>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Type Selection mimicking the screenshot's 'Type*' */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Type*</label>
            <div className="grid grid-cols-2 gap-2">
              <div 
                className={`border rounded py-3 text-center text-sm font-medium cursor-pointer ${formData.sellingMode === 'FIXED_PRICE' ? 'border-white text-white' : 'border-gray-600 text-gray-400'}`}
                onClick={() => setFormData({...formData, sellingMode: 'FIXED_PRICE'})}
              >
                Fixed Price
              </div>
              <div 
                className={`border rounded py-3 text-center text-sm font-medium cursor-pointer ${formData.sellingMode === 'AUCTION' ? 'border-white text-white' : 'border-gray-600 text-gray-400'}`}
                onClick={() => setFormData({...formData, sellingMode: 'AUCTION'})}
              >
                Live Auction
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Crop Name / Title*</label>
            <input 
              type="text" 
              name="cropName"
              value={formData.cropName} 
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-white focus:outline-none"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Quantity*</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                name="quantity"
                value={formData.quantity} 
                onChange={handleChange}
                className="w-2/3 bg-transparent border border-gray-600 rounded p-3 text-white focus:border-white focus:outline-none"
                placeholder="e.g. 50"
                required 
              />
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className="w-1/3 bg-transparent border border-gray-600 rounded p-3 text-white focus:border-white focus:outline-none appearance-none"
              >
                <option value="quintal" className="bg-[#121212]">Quintals</option>
                <option value="kg" className="bg-[#121212]">Kg</option>
                <option value="tons" className="bg-[#121212]">Tons</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Quality Grade</label>
            <div className="grid grid-cols-3 gap-2">
              {['Grade A', 'Grade B', 'Grade C'].map(grade => (
                <div 
                  key={grade}
                  className={`border rounded py-2 text-center text-sm font-medium cursor-pointer ${formData.qualityGrade === grade ? 'border-white text-white' : 'border-gray-600 text-gray-400'}`}
                  onClick={() => setFormData({...formData, qualityGrade: grade})}
                >
                  {grade}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Pickup Location*</label>
            <input 
              type="text" 
              name="pickupLocation"
              value={formData.pickupLocation} 
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-white focus:outline-none"
              placeholder="e.g. Thanjavur"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Price (₹)*</label>
            <input 
              type="number" 
              name="fixedPrice"
              value={formData.fixedPrice} 
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded p-3 text-white focus:border-white focus:outline-none"
              placeholder="e.g. 2500"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-4 rounded text-lg mt-8 mb-4 hover:bg-gray-200"
          >
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
