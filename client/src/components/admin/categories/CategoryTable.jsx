import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const CategoryTable = ({ 
  data, 
  currentPage, 
  setCurrentPage, 
  totalPages, 
  totalResults,
  startIndex,
  endIndex
}) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#0d0d0d] border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
        <div className="p-4 rounded-full bg-white/5">
          <SearchX size={32} className="text-slate-500" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-[700] text-white">{t('admin.categoryMgmt.noResults')}</h3>
          <p className="text-sm font-[400] text-slate-400 mt-1">{t('admin.categoryMgmt.noResultsSub')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500 w-[80px]">{t('admin.categoryMgmt.colImage')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.categoryMgmt.colInfo')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500">{t('admin.categoryMgmt.colStatus')}</th>
                <th className="py-4 px-6 text-[10px] font-[700] uppercase tracking-widest text-slate-500 text-right">{t('admin.categoryMgmt.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((category, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={category.id} 
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-6">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-white/10 group-hover:border-gold-500/30 transition-all">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-[700] text-white">{category.name}</span>
                      <span className="text-[12px] font-[400] text-slate-400 mt-0.5 max-w-xs truncate">{category.description}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-[600] tracking-wide border",
                      category.status === 'Active' 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        category.status === 'Active' ? "bg-green-400" : "bg-red-400"
                      )} />
                      {category.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[12px] font-[400] text-slate-500">
          {t('admin.categoryMgmt.showing')} <span className="text-white font-[600]">{startIndex}</span> {t('admin.categoryMgmt.to')} <span className="text-white font-[600]">{endIndex}</span> {t('admin.categoryMgmt.of')} <span className="text-white font-[600]">{totalResults}</span> {t('admin.categoryMgmt.categories')}
        </p>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                  "w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-[600] transition-all cursor-pointer",
                  currentPage === i + 1 
                    ? "bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20" 
                    : "border border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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

export default CategoryTable;
