import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply direction and language font to body
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = direction;
    
    if (i18n.language === 'ar') {
      document.documentElement.classList.add('font-arabic');
      document.documentElement.classList.remove('font-inter');
    } else {
      document.documentElement.classList.add('font-inter');
      document.documentElement.classList.remove('font-arabic');
    }
  }, [i18n.language]);

  return (
    <div className={i18n.language === 'ar' ? 'font-arabic' : 'font-inter'}>
      <AppRoutes />
    </div>
  );
}

export default App;
