import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to Farm-O-Connect',
    login: 'Login',
    email: 'Email Address',
    password: 'Password',
    dashboard: 'Dashboard',
    myListings: 'My Listings',
    orders: 'Orders',
    profile: 'Profile',
    createListing: 'Create Listing',
    activeListings: 'Active Listings',
    liveAuctions: 'Live Auctions',
    marketPrices: 'Market Prices',
    weatherForecast: 'Weather Forecast',
    sellCrop: 'Sell Crop',
  },
  ta: {
    welcome: 'ஃபார்ம்-ஓ-கனெக்டுக்கு வரவேற்கிறோம்',
    login: 'உள்நுழைய',
    email: 'மின்னஞ்சல் முகவரி',
    password: 'கடவுச்சொல்',
    dashboard: 'முகப்பு',
    myListings: 'பட்டியல்கள்',
    orders: 'ஆர்டர்கள்',
    profile: 'சுயவிவரம்',
    createListing: 'பட்டியலை உருவாக்கு',
    activeListings: 'செயலில் உள்ள பட்டியல்கள்',
    liveAuctions: 'நேரடி ஏலங்கள்',
    marketPrices: 'சந்தை விலைகள்',
    weatherForecast: 'வானிலை முன்னறிவிப்பு',
    sellCrop: 'பயிர் விற்க',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'ta')) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
