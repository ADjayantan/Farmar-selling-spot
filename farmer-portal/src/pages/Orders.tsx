import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Clock, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-9821', product: 'Export Grade Kiran Watermelon', qty: '500 kg', amount: '₹ 18,500', status: 'IN_TRANSIT', date: 'Oct 02, 2026', buyer: 'FreshMart Supermarkets', image: './images/watermelon.jpg' },
  { id: 'ORD-9815', product: 'Premium Ponni Rice', qty: '10 bags (250 kg)', amount: '₹ 14,000', status: 'DELIVERED', date: 'Sep 28, 2026', buyer: 'Annapoorna Traders', image: './images/rice_grain.jpg' },
  { id: 'ORD-9802', product: 'Farm-fresh Bananas', qty: '100 kg', amount: '₹ 4,500', status: 'CONFIRMED', date: 'Oct 03, 2026', buyer: 'Mani & Co.', image: './images/banana_fruit.jpg' },
  { id: 'ORD-9750', product: 'Ooty Carrots', qty: '50 kg', amount: '₹ 3,200', status: 'DELIVERED', date: 'Sep 15, 2026', buyer: 'Daily Needs Grocery', image: './images/carrot.jpg' }
];

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const filteredOrders = mockOrders.filter(o => 
    activeTab === 'active' ? o.status !== 'DELIVERED' : o.status === 'DELIVERED'
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'IN_TRANSIT': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return <Clock size={14} className="mr-1" />;
      case 'IN_TRANSIT': return <Truck size={14} className="mr-1" />;
      case 'DELIVERED': return <CheckCircle2 size={14} className="mr-1" />;
      default: return <Package size={14} className="mr-1" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return 'Order Confirmed';
      case 'IN_TRANSIT': return 'Out for Delivery';
      case 'DELIVERED': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-gray-900 font-sans pb-20">
      {/* Header */}
      <div className="bg-[#15803d] p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white tracking-wide">My Orders</h1>
        <Package size={24} className="text-white opacity-80" />
      </div>

      <div className="max-w-3xl mx-auto p-4 mt-2">
        
        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'active' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Orders
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'completed' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('completed')}
          >
            Past Orders
          </button>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Package size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">No {activeTab} orders</h3>
              <p className="text-gray-500 mt-2 text-sm max-w-xs">You don't have any {activeTab} orders at the moment. When you sell products, they will appear here.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/delivery/${order.id}`)}>
                
                {/* Order Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                    <p className="text-sm font-black text-gray-900">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-500 uppercase">Placed On</span>
                    <p className="text-sm font-bold text-gray-900">{order.date}</p>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 flex items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mr-4 flex-shrink-0">
                    <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate">{order.product}</h3>
                    <p className="text-sm text-gray-600 font-medium mt-0.5">Qty: <span className="text-gray-900 font-bold">{order.qty}</span></p>
                    <div className="flex items-center mt-1.5 text-xs text-gray-500 font-medium truncate">
                      <MapPin size={12} className="mr-1 flex-shrink-0" /> Buyer: {order.buyer}
                    </div>
                  </div>

                  <div className="ml-4 text-right flex-shrink-0">
                    <p className="font-black text-green-700 text-lg">{order.amount}</p>
                  </div>
                </div>

                {/* Order Footer & Status */}
                <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                  <div className={`flex items-center px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </div>
                  <button className="flex items-center text-sm font-bold text-green-700 hover:text-green-800">
                    Track <ChevronRight size={16} className="ml-0.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
