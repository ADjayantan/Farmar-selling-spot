import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Phone, FileText, MapPin, Check } from 'lucide-react';

const mockOrderDetails = {
  id: 'ORD-9821',
  product: 'Export Grade Kiran Watermelon',
  qty: '500 kg',
  amount: '₹ 18,500',
  status: 'IN_TRANSIT',
  date: 'Oct 02, 2026',
  buyer: {
    name: 'FreshMart Supermarkets',
    phone: '+91 98765 12345',
    address: 'Plot 42, Market Road, Coimbatore, TN'
  },
  transporter: {
    name: 'Suresh Transport',
    vehicle: 'Mahindra Bolero Pickup (TN-38-XY-1234)',
    phone: '+91 99999 88888'
  },
  image: './images/watermelon.jpg'
};

const STEPS = [
  { id: 'CONFIRMED', label: 'Order Confirmed', time: 'Oct 02, 10:30 AM', completed: true },
  { id: 'TRANSPORTER_ASSIGNED', label: 'Transporter Assigned', time: 'Oct 02, 14:15 PM', completed: true },
  { id: 'PICKED_UP', label: 'Picked Up from Farm', time: 'Oct 03, 08:00 AM', completed: true },
  { id: 'IN_TRANSIT', label: 'In Transit', time: 'Expected Today', completed: false, current: true },
  { id: 'DELIVERED', label: 'Delivered', time: '--', completed: false }
];

const DeliveryTracking: React.FC = () => {
  
  const navigate = useNavigate();
  const order = mockOrderDetails; // Use mock directly

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-900 font-sans pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700 mr-2">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Track Order</h1>
          <p className="text-xs font-bold text-green-600">{order.id}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6 mt-4">
        
        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 flex items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mr-4 flex-shrink-0">
              <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base truncate">{order.product}</h3>
              <p className="text-sm text-gray-600 font-medium mt-0.5">Qty: <span className="text-gray-900 font-bold">{order.qty}</span></p>
              <p className="font-black text-green-700 text-lg mt-1">{order.amount}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between">
            <button className="flex items-center text-sm font-bold text-gray-700 hover:text-green-700 transition-colors">
              <FileText size={16} className="mr-1.5" /> View Invoice
            </button>
            <span className="bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <Truck size={12} className="mr-1" /> Out for Delivery
            </span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Delivery Status</h2>
          
          <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Timeline Line */}
                {idx !== STEPS.length - 1 && (
                  <div className={`absolute top-6 left-2 w-0.5 h-full -ml-px ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}

                {/* Node */}
                <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full border-2 ${step.completed ? 'bg-green-500 border-green-500 text-white' : step.current ? 'bg-white border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]' : 'bg-white border-gray-300'}`}>
                  {step.completed && <Check size={12} strokeWidth={4} />}
                  {step.current && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                </div>

                {/* Content */}
                <div className="flex-1 ml-4 md:ml-0 md:w-1/2 md:px-6">
                  <div className="flex flex-col">
                    <h4 className={`text-sm font-bold ${step.completed || step.current ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h4>
                    <span className={`text-xs font-medium mt-1 ${step.completed ? 'text-gray-500' : step.current ? 'text-green-600 font-bold' : 'text-gray-400'}`}>{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer & Transporter Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Buyer Details</h3>
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 text-blue-600 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.buyer.name}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{order.buyer.address}</p>
              </div>
            </div>
            <button className="w-full mt-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              <Phone size={16} className="mr-2" /> Call Buyer
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Transporter Info</h3>
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mr-3 text-orange-600 flex-shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.transporter.name}</p>
                <p className="text-sm text-gray-600 mt-1">{order.transporter.vehicle}</p>
              </div>
            </div>
            <button className="w-full mt-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
              <Phone size={16} className="mr-2" /> Call Driver
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DeliveryTracking;

