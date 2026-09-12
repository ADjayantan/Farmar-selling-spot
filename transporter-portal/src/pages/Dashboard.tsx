import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';
import api from '../lib/api';
import { connectSocket, disconnectSocket, getSocket } from '../lib/socket';
import { useI18n } from '../lib/i18n';

interface Job {
  _id: string;
  cropType: string;
  quantity: number;
  pickupLocation: { address: string };
  deliveryLocation: { address: string };
  fareBreakdown: { total: number };
}

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data } = await api.get('/users/me');
      setIsOnline(data.isAvailable);
      if (data.isAvailable) {
        startOnlineMode();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAvailability = async () => {
    const newStatus = !isOnline;
    try {
      await api.patch('/users/me/availability', { isAvailable: newStatus });
      setIsOnline(newStatus);
      if (newStatus) {
        startOnlineMode();
      } else {
        stopOnlineMode();
      }
    } catch (err) {
      console.error('Failed to update availability', err);
    }
  };

  const startOnlineMode = async () => {
    try {
      const { data } = await api.get('/transport/jobs?status=PENDING');
      setJobs(data);

      const token = localStorage.getItem('token');
      if (token) {
        connectSocket(token);
        const socket = getSocket();
        
        socket.off('new-job-available');
        socket.off('job-taken');

        socket.emit('join-transporter-feed');

        socket.on('new-job-available', (job: Job) => {
          setJobs((prev) => [job, ...prev.filter(j => j._id !== job._id)]);
        });

        socket.on('job-taken', (data: { jobId: string }) => {
          setJobs((prev) => prev.filter(j => j._id !== data.jobId));
        });
      }
    } catch (err) {
      console.error('Failed to fetch initial jobs', err);
    }
  };

  const stopOnlineMode = () => {
    setJobs([]);
    disconnectSocket();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border">
        <div>
          <h2 className="font-bold text-gray-800 text-lg">Status</h2>
          <p className="text-sm text-gray-500">
            {isOnline ? t('dashboard.status.online') : t('dashboard.status.offline')}
          </p>
        </div>
        <button
          onClick={toggleAvailability}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${
            isOnline ? 'bg-red-100 text-red-600' : 'bg-green-600 text-white'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {isOnline && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">{t('dashboard.jobs.available')}</h3>
          {jobs.length === 0 ? (
            <div className="bg-gray-50 p-8 text-center rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">{t('dashboard.jobs.empty')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white p-4 rounded-xl shadow-sm border" onClick={() => navigate(`/job/${job._id}`)}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      {job.cropType} • {job.quantity}kg
                    </div>
                    <div className="font-bold text-lg text-gray-800">
                      ₹{job.fareBreakdown.total}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 relative">
                    <div className="flex gap-2">
                      <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{job.pickupLocation.address}</span>
                    </div>
                    <div className="ml-2 w-0.5 h-3 bg-gray-200"></div>
                    <div className="flex gap-2">
                      <Navigation size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{job.deliveryLocation.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
