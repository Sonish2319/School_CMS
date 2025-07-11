import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');

  // On page load check localStorage for saved locale
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'np' : 'en';
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
