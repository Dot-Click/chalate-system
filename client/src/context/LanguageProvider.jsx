import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState(i18n.language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    const lang = i18n.language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    setDirection(dir);
    
    // Update root attributes
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    
    // Apply font classes to body for global inheritance
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-inter');
    } else {
      document.body.classList.add('font-inter');
      document.body.classList.remove('font-arabic');
    }
  }, [i18n.language]);

  const changeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ direction, changeLanguage, currentLanguage: i18n.language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
