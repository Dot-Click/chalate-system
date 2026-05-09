import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChaletTable = ({ 
  data, 
  currentPage, 
  setCurrentPage, 
  totalPages, 
  totalResults, 
  startIndex, 
  endIndex 
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
      {/* Structural Accent Glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[2.5rem]" />
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-6 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest">{t('admin.chaletMgmt.colProperty')}</th>
              <th className="px-4 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest">{t('admin.chaletMgmt.colCategory')}</th>
              <th className="px-4 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest">{t('admin.chaletMgmt.colLocation')}</th>
              <th className="px-4 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest">{t('admin.chaletMgmt.colPrice')}</th>
              <th className="px-4 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest text-center">{t('admin.chaletMgmt.colStatus')}</th>
              <th className="px-6 py-4 text-[11px] font-[700] text-gold-500 uppercase tracking-widest text-right">{t('admin.chaletMgmt.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? data.map((chalet) => (
              <tr key={chalet.id} className="group/row hover:bg-white/[0.02] transition-all duration-300">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-white/10 group-hover/row:border-gold-500/40 transition-all duration-500">
                      <img src={chalet.image} alt={chalet.name} className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-[600] text-white group-hover/row:text-gold-500 transition-colors duration-300">{chalet.name}</span>
                      <span className={cn(
                        "text-[9px] font-[700] uppercase tracking-wider",
                        chalet.availability === 'Available' ? "text-green-500" : "text-orange-500"
                      )}>
                        {chalet.availability}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-[400] text-slate-400">{chalet.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-[400] text-slate-400">{chalet.location}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col -space-y-1">
                    <span className="text-[13px] font-[700] text-white">{chalet.price}</span>
                    <span className="text-[9px] font-[400] text-slate-600 uppercase">{t('admin.chaletMgmt.perNight')}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[9px] font-[700] uppercase tracking-wide border",
                      chalet.status === 'Active' 
                        ? "bg-green-500/5 text-green-500 border-green-500/10" 
                        : "bg-red-500/5 text-red-500 border-red-500/10"
                    )}>
                      {chalet.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-40 group-hover/row:opacity-100 transition-opacity duration-300">
                    <button className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
                         <Trash2 size={32} className="opacity-20" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-[600]">{t('admin.chaletMgmt.noResults')}</p>
                        <p className="text-slate-500 text-xs">{t('admin.chaletMgmt.noResultsSub')}</p>
                      </div>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Elite Pagination Module */}
      <div className="px-8 py-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <p className="text-[13px] font-[400] text-slate-500">
          {t('admin.chaletMgmt.showing')} <span className="text-slate-300 font-[600]">{startIndex}</span> {t('admin.chaletMgmt.to')} <span className="text-slate-300 font-[600]">{endIndex}</span> {t('admin.chaletMgmt.of')} <span className="text-slate-300 font-[600]">{totalResults}</span> {t('admin.chaletMgmt.luxuryProperties')}
        </p>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "w-10 h-10 rounded-xl font-[700] text-[13px] transition-all cursor-pointer",
                  currentPage === i + 1 
                    ? "bg-gold-500 text-black shadow-lg shadow-gold-500/20" 
                    : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChaletTable;
