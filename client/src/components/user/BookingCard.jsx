import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingCard = () => {
  const { t } = useTranslation();

  return (
    <div className="glass-dark p-6 md:p-8 rounded-[2rem] w-full max-w-md shadow-2xl border-white/5 animate-in fade-in zoom-in duration-700">
      <h3 className="text-xl font-heading font-semibold text-gold-400 mb-6 flex items-center gap-2">
        {t('home.bookTitle')}
      </h3>
      
      <div className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{t('home.checkIn')}</label>
            <div className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span className="text-sm text-slate-300">12 May 2026</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{t('home.checkOut')}</label>
            <div className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span className="text-sm text-slate-300">15 May 2026</span>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{t('home.guests')}</label>
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-gold-500" />
              <span className="text-sm text-slate-300">2 Guests</span>
            </div>
            <span className="text-xs text-gold-400 font-bold">Edit</span>
          </div>
        </div>

        {/* Search Button */}
        <Button variant="gold" className="w-full py-8 rounded-xl text-black font-black text-lg shadow-lg shadow-gold-900/20 group mt-4">
          {t('common.search')}
          <Search className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
        </Button>
      </div>
      
      <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-[0.2em]">
        Best Price Guaranteed for Luxury Stays
      </p>
    </div>
  );
};

export default BookingCard;
