import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, ArrowLeft, Truck } from 'lucide-react';
import api from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/transport/jobs/${id}`);
      setJob(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      await api.post(`/transport/jobs/${id}/accept`);
      navigate(`/active-delivery/${id}`);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Job already taken by another transporter');
      } else {
        setError('Failed to accept job');
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!job) return <div className="p-4 text-center text-red-500">{error || 'Job not found'}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-xl">{t('job.details')}</h2>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}

      <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h3 className="font-bold text-xl text-gray-800">{job.cropType}</h3>
            <p className="text-gray-500">{job.quantity} kg • {job.vehicleTypeRequired}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Truck className="text-green-600" />
          </div>
        </div>

        <div className="space-y-4 relative">
          <div className="flex gap-3">
            <MapPin className="text-blue-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Pickup</p>
              <p className="text-gray-800 text-sm">{job.pickupLocation.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Navigation className="text-red-500 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Dropoff</p>
              <p className="text-gray-800 text-sm">{job.deliveryLocation.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <h3 className="font-bold text-gray-800 mb-3">{t('job.fare_breakdown')}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{t('job.base_fare')}</span>
            <span>₹{job.fareBreakdown.baseFare}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('job.distance_charge')}</span>
            <span>₹{job.fareBreakdown.distanceCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('job.loading_charge')}</span>
            <span>₹{job.fareBreakdown.loadingCharge}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg text-gray-800">
            <span>{t('job.total')}</span>
            <span>₹{job.fareBreakdown.total}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          onClick={() => navigate(`/job/${id}/route`)}
          className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg"
        >
          {t('job.route')}
        </button>
        {job.status === 'PENDING' && (
          <button 
            onClick={handleAccept}
            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700"
          >
            {t('job.accept')}
          </button>
        )}
      </div>
    </div>
  );
}
