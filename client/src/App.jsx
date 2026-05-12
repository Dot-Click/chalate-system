import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

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
      <Toaster 
        position="top-right" 
        containerStyle={{
          zIndex: 9999,
          pointerEvents: 'none'
        }}
        toastOptions={{
          className: '!bg-[#111111] !text-white !border !border-white/10 !rounded-xl !shadow-xl !font-inter !z-[9999]',
          style: {
            pointerEvents: 'auto'
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#111111' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#111111' } },
        }}
      />
      <AppRoutes />
    </div>
  );
}

export default App;
