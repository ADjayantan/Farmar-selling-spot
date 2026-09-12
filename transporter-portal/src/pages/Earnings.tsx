import { useEffect, useState } from 'react';
import { IndianRupee, TrendingUp, Calendar } from 'lucide-react';
import api from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function Earnings() {
  const [earnings, setEarnings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await api.get('/transport/earnings');
        setEarnings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">{t('nav.earnings')}</h2>

      <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-green-100 mb-1">Total Earnings</p>
          <h3 className="text-4xl font-bold">₹{earnings?.totalEarnings || 0}</h3>
        </div>
        <IndianRupee className="absolute -right-4 -bottom-4 text-green-500 opacity-50" size={120} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-blue-600 mb-2">
            <TrendingUp size={16} />
          </div>
          <p className="text-gray-500 text-sm">Total Jobs</p>
          <p className="font-bold text-xl">{earnings?.totalJobs || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center text-purple-600 mb-2">
            <Calendar size={16} />
          </div>
          <p className="text-gray-500 text-sm">This Month</p>
          <p className="font-bold text-xl">₹{earnings?.monthlyEarnings || 0}</p>
        </div>
      </div>
    </div>
  );
}
