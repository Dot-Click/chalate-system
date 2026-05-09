import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Globe } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { cn } from '@/lib/utils';

const AdminHeader = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <header className="h-20 bg-[#0a0a0a]/80  border-b border-white/5 px-8 flex items-center justify-end relative z-20">
 
      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <LanguageSwitcher />
        

        <div className="flex items-center gap-3 pl-6 border-l border-white/10 ml-2">
          <div className="text-right hidden sm:block">
            <div className="text-[13px] font-bold text-white leading-none">Admin User</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Admin</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 p-[1px]">
            <div className="w-full h-full bg-[#0a0a0a] rounded-[11px] flex items-center justify-center">
               <User size={20} className="text-gold-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
