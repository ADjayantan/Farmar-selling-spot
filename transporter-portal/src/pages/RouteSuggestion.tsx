import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';
import api from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function RouteSuggestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [routeInfo, setRouteInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const { data } = await api.get(`/transport/jobs/${id}/route`);
        setRouteInfo(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-xl">{t('job.route')}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Map Placeholder */}
        <div className="h-64 bg-gray-200 flex flex-col items-center justify-center text-gray-500">
          <Map size={48} className="mb-2 opacity-50" />
          <p>Map View Placeholder</p>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-500 uppercase">{t('job.distance')}</p>
              <p className="font-bold text-lg text-gray-800">{routeInfo?.distance} km</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-500 uppercase">{t('job.duration')}</p>
              <p className="font-bold text-lg text-gray-800">{routeInfo?.duration} mins</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full mt-4 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md"
          >
            Back to Job Details
          </button>
        </div>
      </div>
    </div>
  );
}
