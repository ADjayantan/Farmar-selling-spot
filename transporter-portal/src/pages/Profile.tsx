import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Truck } from 'lucide-react';
import api from '../lib/api';
import { useI18n } from '../lib/i18n';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const { t } = useI18n();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/me');
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">{t('nav.profile')}</h2>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="bg-green-600 h-24"></div>
        <div className="px-6 pb-6 relative">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center -mt-10 mx-auto mb-4">
            <User size={40} className="text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-xl">{user.name}</h3>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium">{user.phone || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-medium">{user.address?.street || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      {user.transporterDetails && (
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <Truck size={20} className="text-green-600" />
            Vehicle Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Vehicle Type</p>
              <p className="font-medium">{user.transporterDetails.vehicleType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">License Plate</p>
              <p className="font-medium uppercase">{user.transporterDetails.licensePlate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Capacity</p>
              <p className="font-medium">{user.transporterDetails.capacity} kg</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
