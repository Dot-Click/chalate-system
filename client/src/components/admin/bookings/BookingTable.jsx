import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const statusConfig = {
  Confirmed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', dot: 'bg-green-400' },
  Pending:   { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20',  dot: 'bg-amber-400'  },
  Cancelled: { bg: 'bg-red-500/10',   text: 'text-red-400',   border: 'border-red-500/20',   dot: 'bg-red-400'   },
  Completed: { bg: 'bg-blue-500/10',  text: 'text-blue-400',  border: 'border-blue-500/20',  dot: 'bg-blue-400'  },
};

const BookingTable = ({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalResults,
  startIndex,
  endIndex,
}) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#0d0d0d] border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
        <div className="p-4 rounded-full bg-white/5">
          <SearchX size={32} className="text-slate-500" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-[700] text-white">{t('admin.bookingMgmt.noResults')}</h3>
          <p className="text-sm font-[400] text-slate-400 mt-1">{t('admin.bookingMgmt.noResultsSub')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colId')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colGuest')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colChalet')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colCheckIn')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colCheckOut')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colAmount')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.bookingMgmt.colStatus')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500 text-right">{t('admin.bookingMgmt.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((booking, index) => {
                const s = statusConfig[booking.status] || statusConfig.Pending;
                return (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-6">
                      <span className="text-[12px] font-[700] text-gold-500 font-mono">{booking.id}</span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 text-[11px] font-[700] shrink-0">
                          {booking.guest.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-[600] text-white">{booking.guest}</p>
                          <p className="text-[11px] font-[400] text-slate-500">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 group-hover:border-gold-500/30 transition-all shrink-0">
                          <img src={booking.chaletImage} alt={booking.chalet} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[13px] font-[500] text-slate-300">{booking.chalet}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className="text-[12px] font-[500] text-slate-300">{booking.checkIn}</span>
                    </td>
                    <td className="py-3 px-6">
                      <span className="text-[12px] font-[500] text-slate-300">{booking.checkOut}</span>
                    </td>
                    <td className="py-3 px-6">
                      <span className="text-[13px] font-[700] text-white">{booking.amount}</span>
                    </td>
                    <td className="py-3 px-6">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-[600] tracking-wide border',
                        s.bg, s.text, s.border
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all border border-transparent hover:border-gold-500/20 cursor-pointer">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[12px] font-[400] text-slate-500">
          {t('admin.bookingMgmt.showing')} <span className="text-white font-[600]">{startIndex}</span> {t('admin.bookingMgmt.to')} <span className="text-white font-[600]">{endIndex}</span> {t('admin.bookingMgmt.of')} <span className="text-white font-[600]">{totalResults}</span> {t('admin.bookingMgmt.bookings')}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-[600] transition-all cursor-pointer',
                  currentPage === i + 1
                    ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                    : 'border border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
