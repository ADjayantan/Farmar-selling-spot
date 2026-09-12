import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../services/api';

const STEPS = [
  { id: 'CONFIRMED', label: 'Confirmed' },
  { id: 'TRANSPORTER_ASSIGNED', label: 'Transporter Assigned' },
  { id: 'PICKED_UP', label: 'Picked Up' },
  { id: 'IN_TRANSIT', label: 'In Transit' },
  { id: 'DELIVERED', label: 'Delivered' }
];

const DeliveryTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading tracking...</div>;
  if (!order) return <div className="p-4 text-center">Order not found</div>;

  const currentStepIndex = STEPS.findIndex(s => s.id === order.status);
  
  return (
    <div className="max-w-md mx-auto space-y-6 bg-white p-4 min-h-[80vh] rounded-lg">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} className="mr-1" /> Back to Orders
      </button>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Track Delivery</h2>
        <p className="text-sm text-gray-500">Order #{id?.slice(-6).toUpperCase()}</p>
      </div>

      <div className="relative pt-6 pb-12">
        <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {STEPS.map((step, index) => {
            const isCompleted = currentStepIndex >= index;
            const isCurrent = currentStepIndex === index;
            
            return (
              <div key={step.id} className="relative flex items-start group">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full z-10 
                  ${isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}
                  ${isCurrent ? 'ring-4 ring-green-100' : ''}
                `}>
                  <CheckCircle size={20} />
                </div>
                <div className="ml-4 mt-2">
                  <h3 className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                  </h3>
                  {isCurrent && (
                    <p className="text-sm text-green-600 mt-1">Current Status</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {order.transporter && (
        <div className="bg-gray-50 p-4 rounded border border-gray-100 mt-4">
          <h4 className="text-sm font-bold text-gray-700 mb-2">Transporter Details</h4>
          <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-900">{order.transporter.name}</span></p>
          <p className="text-sm text-gray-600">Vehicle: <span className="font-medium text-gray-900">{order.transporter.vehicleNumber}</span></p>
          <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-900">{order.transporter.phone}</span></p>
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;
