import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Star, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChaletsOverview = () => {
  const { t } = useTranslation();

  const chalets = [
    { id: 1, name: 'Royal Oasis', rating: 4.9, bookings: 124, status: 'available' },
    { id: 2, name: 'Desert Pearl', rating: 4.8, bookings: 98, status: 'booked' },
    { id: 3, name: 'Azure Beach', rating: 4.7, bookings: 86, status: 'available' },
    { id: 4, name: 'Golden Sands', rating: 5.0, bookings: 142, status: 'available' },
  ];

  return (
    <div className="bg-[#0d0d0d] border border-white/5 rounded-[2rem] p-6 space-y-6 hover:border-gold-500/20 transition-all duration-500 group overflow-hidden">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-inter font-[700] text-gold-500 uppercase">{t('admin.topChalets')}</h3>
          <p className="text-[14px] font-[300] text-slate-400">{t('admin.performanceOverview')}</p>
        </div>
        <button className="text-[10px] font-black text-gold-500 uppercase tracking-widest hover:underline cursor-pointer">
          {t('admin.manageAll')}
        </button>
      </div>

      <div className="space-y-3">
        {chalets.map((chalet) => (
          <div key={chalet.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all group/item cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover/item:bg-gold-500 group-hover/item:text-black transition-all">
                  <Home size={18} />
               </div>
               <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-black text-white truncate max-w-[100px]">{chalet.name}</span>
                  <div className="flex items-center gap-2">
                     <span className="flex items-center gap-1 text-[10px] font-bold text-gold-500">
                        <Star size={10} fill="currentColor" /> {chalet.rating}
                     </span>
                     <span className="text-[10px] font-bold text-slate-500 tracking-tighter">{chalet.bookings} {t('admin.bookingsCount')}</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className={cn(
                  "w-2 h-2 rounded-full",
                  chalet.status === 'available' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
               )} />
               <ChevronRight size={14} className="text-slate-600 group-hover/item:text-gold-500 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaletsOverview;
