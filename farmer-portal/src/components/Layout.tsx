import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, List, ShoppingBag, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16 md:pb-0 md:pt-16">
      {/* Mobile Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center md:fixed md:top-0 md:w-full md:z-10">
        <h1 className="text-xl font-bold">Farm-O-Connect</h1>
        <button onClick={handleLogout} className="text-sm bg-green-700 px-3 py-1 rounded">
          Logout
        </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile / Top Nav for Desktop (simplified for demo as bottom nav) */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 md:top-0 md:bottom-auto md:w-auto md:right-0 md:border-t-0 md:bg-transparent md:text-white md:p-4">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-green-600' : 'text-gray-500'} md:text-white md:mx-2`}
        >
          <Home size={24} />
          <span className="text-xs mt-1 md:hidden">{t('dashboard')}</span>
        </NavLink>
        <NavLink 
          to="/listings" 
          className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-green-600' : 'text-gray-500'} md:text-white md:mx-2`}
        >
          <List size={24} />
          <span className="text-xs mt-1 md:hidden">{t('myListings')}</span>
        </NavLink>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-green-600' : 'text-gray-500'} md:text-white md:mx-2`}
        >
          <ShoppingBag size={24} />
          <span className="text-xs mt-1 md:hidden">{t('orders')}</span>
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-green-600' : 'text-gray-500'} md:text-white md:mx-2`}
        >
          <User size={24} />
          <span className="text-xs mt-1 md:hidden">{t('profile')}</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
