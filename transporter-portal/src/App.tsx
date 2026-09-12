import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobDetail from './pages/JobDetail';
import RouteSuggestion from './pages/RouteSuggestion';
import ActiveDelivery from './pages/ActiveDelivery';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="job/:id" element={<JobDetail />} />
            <Route path="job/:id/route" element={<RouteSuggestion />} />
            <Route path="active-delivery/:id" element={<ActiveDelivery />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
