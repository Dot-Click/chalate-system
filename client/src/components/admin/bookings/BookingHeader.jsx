import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BookingHeader = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
              <Calendar size={22} className="text-gold-500" />
            </div>
            <h1 className="text-3xl font-[700] text-white uppercase tracking-tight">
              {t('admin.bookingMgmt.title')}
            </h1>
          </div>
          <p className="text-[14px] font-[400] text-slate-400 pl-14">
            {t('admin.bookingMgmt.subtitle')}
          </p>
        </div>
      </div>

      <div className="relative max-w-xl group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500 group-focus-within:text-gold-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder={t('admin.bookingMgmt.searchPlaceholder')}
          className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl py-3 pl-14 pr-8 text-[13.5px] font-[400] text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all shadow-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-500/0 group-focus-within:ring-gold-500/50 transition-all pointer-events-none" />
      </div>
    </div>
  );
};

export default BookingHeader;
