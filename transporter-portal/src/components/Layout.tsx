import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, IndianRupee, User, LogOut } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const { t, language, setLanguage } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: t('nav.dashboard') },
    { path: '/earnings', icon: IndianRupee, label: t('nav.earnings') },
    { path: '/profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md shrink-0">
        <h1 className="font-bold text-xl">Farm&apos;O Connect</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="text-sm font-medium bg-green-700 px-2 py-1 rounded"
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <button onClick={handleLogout} className="p-1 hover:bg-green-700 rounded">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-20">
        <Outlet />
      </main>

      <nav className="bg-white border-t fixed bottom-0 w-full flex justify-around p-3 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
