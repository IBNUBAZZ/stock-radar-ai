import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ha';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'StockNear Sokoto',
    'app.tagline': 'Find it before you travel in Sokoto.',
    'search.placeholder': 'Search medicines, laptops, gadgets, or perfumes...',
    'search.button': 'Search',
    'status.in_stock': 'In Stock',
    'status.out_of_stock': 'Out of Stock',
    'category.medicines': 'Medicines',
    'category.laptops': 'Laptops',
    'category.perfumes': 'Perfumes',
    'category.tech-gadgets': 'Tech Gadgets',
    'ussd.badge': 'Offline? Use USSD',
    'ussd.dial': 'Dial to search',
    'nearby.stores': 'Stores in Sokoto',
    'dashboard.add': 'Add Product',
    'dashboard.inventory': 'My Inventory',
    'ussd.title': 'USSD Search',
    'ussd.code': '*384*7625#',
    'ussd.nav': 'USSD Menu',
    'back': 'Back',
    'distance': 'km away',
    'whatsapp': 'WhatsApp',
    'call': 'Call',
    'hours': 'Open Hours',
    'address': 'Address',
    'toggle.language': 'Hausa',
    'smart_search.hint': 'Try searching "malaria", "phone", or "ssd"',
    'ussd.welcome': 'Welcome to StockNear Sokoto!',
    'ussd.opt1': '1. Search Product',
    'ussd.opt2': '2. Categories',
    'ussd.opt3': '3. Top Stores',
    'ussd.opt4': '4. Language',
    'ussd.enter_product': 'Product name:',
    'ussd.results_for': 'Results for',
    'ussd.call_store': 'Call Now',
    'ussd.sms_directions': 'SMS Info',
    'home.hero': 'Find products available near you in Sokoto',
    'home.categories': 'Browse by Category',
    'product.details': 'Product Details',
    'store.details': 'Store Information',
    'search.no_results': 'No products found matching your search.',
    'tag.phones': 'Phones',
    'tag.watches': 'Smart Watches',
    'tag.audio': 'Audio & Headphones',
    'tag.storage': 'Storage & Drives',
    'tag.chargers': 'Chargers',
    'tag.headphones': 'Headphones',
    'tag.drives': 'Drives',
  },
  ha: {
    'app.name': 'StockNear Sokoto',
    'app.tagline': 'Nemo kaya kafin ka fita a Sokoto.',
    'search.placeholder': 'Nemo magani, kwamfuta, kayan lantarki, ko turare...',
    'category.medicines': 'Magunguna',
    'category.laptops': 'Kwamfutoci',
    'category.perfumes': 'Turare',
    'category.tech-gadgets': "Kayan Lantarki",
    'ussd.badge': 'Ba intanet? Yi amfani da USSD',
    'ussd.dial': 'Kira don nema',
    'nearby.stores': 'Kantuna a Sokoto',
    'contact.seller': 'Tuntubi mai siyarwa',
    'view.map': 'Duba taswirar',
    'dashboard.title': 'Dashboard na Kanti',
    'dashboard.add': 'Sanya Kaya',
    'dashboard.inventory': 'Kayan Kanti',
    'ussd.title': 'Neman USSD',
    'ussd.code': '*384*7625#',
    'ussd.nav': 'Hanyoyin USSD',
    'back': 'Baya',
    'distance': 'km daga nan',
    'whatsapp': 'WhatsApp',
    'call': 'Kira',
    'hours': 'Lokutan Bude',
    'address': 'Adireshin',
    'toggle.language': 'English',
    'smart_search.hint': 'Gwada neman "zazzabi", "waya", ko "kwamfuta"',
    'ussd.welcome': 'Barka da zuwa StockNear Sokoto!',
    'ussd.opt1': '1. Nemo Kaya',
    'ussd.opt2': '2. Rukunin Kaya',
    'ussd.opt3': '3. Manyan Kantuna',
    'ussd.opt4': '4. Yare',
    'ussd.enter_product': 'Sunan kaya:',
    'ussd.results_for': 'Sakamakon',
    'ussd.call_store': 'Kira Kanti',
    'ussd.sms_directions': 'Sakon Adireshin',
    'home.hero': 'Nemo kayayyakin da ke kusa da kai a Sokoto',
    'home.categories': 'Duba ta Rukunin Kaya',
    'product.details': 'Bayanin Kaya',
    'store.details': 'Bayanin Kanti',
    'search.no_results': 'Ba a sami kayan da kake nema ba.',
    'tag.phones': 'Wayoyin Tarho',
    'tag.watches': 'Agogon Hannu na Zamani',
    'tag.audio': "Na'urorin Sauti",
    'tag.storage': "Ma'ajiyar Bayanai",
    'tag.chargers': 'Cajoji',
    'tag.headphones': 'Manyan Abin Saurare',
    'tag.drives': "Ma'ajiyar Bayanai",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
