import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, Package } from 'lucide-react';
import api from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function ActiveDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/transport/jobs/${id}`);
      setJob(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    try {
      await api.patch(`/transport/jobs/${id}/status`, { status: newStatus });
      fetchJob();
      if (newStatus === 'DELIVERED') {
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!job) return <div className="p-4 text-center">Job not found</div>;

  const statuses = [
    { id: 'ACCEPTED', label: t('status.ACCEPTED'), icon: CheckCircle },
    { id: 'PICKED_UP', label: t('status.PICKED_UP'), icon: Package },
    { id: 'IN_TRANSIT', label: t('status.IN_TRANSIT'), icon: Truck },
    { id: 'DELIVERED', label: t('status.DELIVERED'), icon: CheckCircle },
  ];

  const currentIdx = statuses.findIndex((s) => s.id === job.status);
  const nextStatus = statuses[currentIdx + 1];

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl text-center">Active Delivery</h2>

      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <div className="relative">
          {statuses.map((status, idx) => (
            <div key={status.id} className="flex items-center gap-4 mb-6 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                idx <= currentIdx ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <status.icon size={20} />
              </div>
              <span className={`font-bold ${idx <= currentIdx ? 'text-gray-800' : 'text-gray-400'}`}>
                {status.label}
              </span>
            </div>
          ))}
          {/* Timeline Line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200 -z-0">
            <div 
              className="w-full bg-green-600 transition-all duration-500"
              style={{ height: `${(currentIdx / (statuses.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {nextStatus && (
        <button
          onClick={() => updateStatus(nextStatus.id)}
          className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 text-lg"
        >
          {t('tracking.update_status')}: {nextStatus.label}
        </button>
      )}

      {job.status === 'DELIVERED' && (
        <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold">
          Delivery Completed Successfully!
        </div>
      )}
    </div>
  );
}
