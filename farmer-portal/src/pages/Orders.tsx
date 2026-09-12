import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Package, Truck } from 'lucide-react';
import api from '../services/api';

const Orders: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders?role=farmer');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{t('orders')}</h2>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100 flex flex-col items-center">
          <Package size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500">You don't have any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{order.listing?.crop || 'Crop'}</h3>
                  <p className="text-sm text-gray-500">Order #{order.id.slice(-6).toUpperCase()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                  order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <p>Buyer: <span className="font-medium text-gray-900">{order.buyer?.name || 'Buyer'}</span></p>
                <p className="text-right">Total: <span className="font-bold text-green-600">₹{order.totalAmount}</span></p>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate(`/orders/${order.id}/tracking`)}
                  className="flex-1 flex items-center justify-center bg-blue-50 text-blue-600 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                >
                  <Truck size={16} className="mr-1" /> Track Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
