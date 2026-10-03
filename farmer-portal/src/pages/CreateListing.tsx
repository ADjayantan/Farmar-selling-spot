import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, CheckCircle, MapPin } from 'lucide-react';

const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    categoryId: '1',
    title: '',
    quantity: '',
    unit: 'kg',
    price: '',
    location: '',
    description: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newImages].slice(0, 4)); // Max 4 images
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-800 font-sans pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700 mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Post an Ad</h1>
      </div>

      <div className="max-w-3xl mx-auto w-full p-4 md:p-6 mt-4">
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Include some details</h2>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <select 
                  className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors bg-gray-50"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                >
                  <option value="1">Fresh Fruits</option>
                  <option value="2">Vegetables</option>
                  <option value="3">Organic Produce</option>
                  <option value="4">Spices & Herbs</option>
                  <option value="5">Grains</option>
                  <option value="6">Dairy</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ad Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Export Grade Farm Fresh Mangoes"
                  className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Mention the key features of your item (e.g. brand, quality, age)</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your produce..."
                  className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Include condition, features, and reason for selling.</p>
              </div>

            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setStep(2)}
                disabled={!formData.title}
                className="bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <button onClick={() => setStep(1)} className="mr-4 text-gray-500 hover:text-gray-900"><ArrowLeft size={20}/></button>
              <h2 className="text-lg font-bold text-gray-900">Upload Photos & Price</h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Upload up to 4 photos</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((src, idx) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img src={src} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {previewImages.length < 4 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square bg-green-50 rounded-lg border-2 border-dashed border-green-300 flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 hover:border-green-400 transition-colors"
                    >
                      <ImageIcon size={32} className="text-green-600 mb-2" />
                      <span className="text-xs font-bold text-green-700">Add Photo</span>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileChange} />
              </div>

              {/* Price & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Set a Price *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-bold">₹</span>
                    </div>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full border-2 border-gray-200 rounded-lg py-3 pl-8 pr-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors text-lg font-bold text-gray-900"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quantity *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 50"
                      className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                    <select 
                      className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-green-600 bg-gray-50"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    >
                      <option value="kg">kg</option>
                      <option value="ton">ton</option>
                      <option value="box">box</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm your Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={20} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    className="w-full border-2 border-gray-200 rounded-lg py-3 pl-10 pr-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handlePublish}
                disabled={isSubmitting || !formData.price || !formData.location}
                className="bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-colors flex items-center"
              >
                {isSubmitting ? 'Publishing...' : 'Post Now'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex flex-col items-center text-center mt-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-8 max-w-sm">Your ad has been successfully posted. It will be visible to thousands of buyers across the platform.</p>
            <div className="flex space-x-4">
              <button onClick={() => navigate('/listings')} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                View My Ads
              </button>
              <button onClick={() => navigate('/')} className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors">
                Back to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateListing;

