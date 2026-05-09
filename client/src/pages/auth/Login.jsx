import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md transition-all">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">{t('common.login')}</h1>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.email')}</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-400"
              placeholder={t('auth.enterEmail')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.password')}</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-400"
              placeholder={t('auth.enterPassword')}
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
            {t('auth.signIn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
