import React from 'react';
import { useTranslation } from 'react-i18next';
import { MoreVertical, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const LatestBookings = () => {
  const { t } = useTranslation();

  const bookings = [
    { id: 1, property: 'The Royal Oasis', guest: 'Ahmed Ali', status: 'confirmed', amount: '450 KWD', date: 'Oct 24' },
    { id: 2, property: 'Desert Pearl', guest: 'Sarah J.', status: 'pending', amount: '320 KWD', date: 'Oct 23' },
    { id: 3, property: 'Azure Beach', guest: 'Omar K.', status: 'confirmed', amount: '280 KWD', date: 'Oct 22' },
    { id: 4, property: 'Golden Sands', guest: 'Laila M.', status: 'rejected', amount: '510 KWD', date: 'Oct 21' },
  ];

  return (
    <div className="bg-[#0d0d0d] border border-white/5 rounded-[2rem] p-6 space-y-6 hover:border-gold-500/20 transition-all duration-500 group overflow-hidden">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-inter font-[700] text-gold-500 uppercase">{t('admin.latestBookings')}</h3>
          <p className="text-[14px] font-[300] text-slate-400">{t('admin.recentActivity')}</p>
        </div>
        <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gold-500 hover:bg-gold-500 hover:text-black transition-all cursor-pointer">
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[12px] font-[500] text-gold-500 uppercase tracking-widest border-b border-white/5">
              <th className="px-2  font-[600]">{t('admin.property')}</th>
              <th className="px-2  font-[600]">{t('admin.status')}</th>
              <th className="px-2  font-[600] text-right">{t('admin.amount')}</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="group/row hover:bg-white/5 transition-colors">
                <td className="px-2 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-[500] text-white group-hover/row:text-gold-500 transition-colors truncate max-w-[120px]">
                      {booking.property}
                    </span>
                    <span className="text-[10px] font-[500] text-slate-500">{booking.guest} • {booking.date}</span>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <span className={cn(
                    "inline-flex px-2 py-0.5 rounded-full text-[10px] font-[500] uppercase tracking-wide",
                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                    booking.status === 'pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
                  )}>
                    {t(`admin.${booking.status}`)}
                  </span>
                </td>
                <td className="px-2 py-4 text-right">
                  <span className="text-[11px] font-black text-white">{booking.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestBookings;
