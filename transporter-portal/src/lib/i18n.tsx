import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'ta';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'login.title': 'Transporter Portal',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'nav.dashboard': 'Dashboard',
    'nav.earnings': 'Earnings',
    'nav.profile': 'Profile',
    'dashboard.status.online': 'Online',
    'dashboard.status.offline': 'Offline',
    'dashboard.jobs.available': 'Available Jobs',
    'dashboard.jobs.empty': 'No jobs available right now.',
    'job.accept': 'Accept Job',
    'job.details': 'Job Details',
    'job.fare_breakdown': 'Fare Breakdown',
    'job.base_fare': 'Base Fare',
    'job.distance_charge': 'Distance Charge',
    'job.loading_charge': 'Loading Charge',
    'job.total': 'Total',
    'job.route': 'Route Suggestion',
    'job.distance': 'Distance',
    'job.duration': 'Duration',
    'status.PENDING': 'Pending',
    'status.ACCEPTED': 'Accepted',
    'status.PICKED_UP': 'Picked Up',
    'status.IN_TRANSIT': 'In Transit',
    'status.DELIVERED': 'Delivered',
    'tracking.update_status': 'Update Status',
  },
  ta: {
    'login.title': 'போக்குவரத்து போர்டல்',
    'login.email': 'மின்னஞ்சல்',
    'login.password': 'கடவுச்சொல்',
    'login.submit': 'உள்நுழைக',
    'nav.dashboard': 'முகப்பு',
    'nav.earnings': 'வருமானம்',
    'nav.profile': 'சுயவிவரம்',
    'dashboard.status.online': 'ஆன்லைன்',
    'dashboard.status.offline': 'ஆஃப்லைன்',
    'dashboard.jobs.available': 'கிடைக்கும் வேலைகள்',
    'dashboard.jobs.empty': 'தற்போது வேலைகள் எதுவும் இல்லை.',
    'job.accept': 'வேலையை ஏற்கு',
    'job.details': 'வேலை விவரங்கள்',
    'job.fare_breakdown': 'கட்டண விவரம்',
    'job.base_fare': 'அடிப்படை கட்டணம்',
    'job.distance_charge': 'தூரக் கட்டணம்',
    'job.loading_charge': 'ஏற்றுதல் கட்டணம்',
    'job.total': 'மொத்தம்',
    'job.route': 'பரிந்துரைக்கப்படும் பாதை',
    'job.distance': 'தூரம்',
    'job.duration': 'காலம்',
    'status.PENDING': 'நிலுவையில்',
    'status.ACCEPTED': 'ஏற்கப்பட்டது',
    'status.PICKED_UP': 'எடுக்கப்பட்டது',
    'status.IN_TRANSIT': 'பயணத்தில்',
    'status.DELIVERED': 'வழங்கப்பட்டது',
    'tracking.update_status': 'நிலையைப் புதுப்பிக்கவும்',
  }
};

export const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
