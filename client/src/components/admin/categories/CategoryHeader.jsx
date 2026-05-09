import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CategoryHeader = ({ searchQuery, setSearchQuery, onAddClick }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
              <Layers size={22} className="text-gold-500" />
            </div>
            <h1 className="text-3xl font-[700] text-white uppercase tracking-tight">
              {t('admin.categoryMgmt.title')}
            </h1>
          </div>
          <p className="text-[14px] font-[400] text-slate-400 pl-14">
            {t('admin.categoryMgmt.subtitle')}
          </p>
        </div>

        <motion.button
          onClick={onAddClick}
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 bg-gold-500 text-black font-[700] text-[13px] uppercase rounded-xl transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] cursor-pointer overflow-hidden whitespace-nowrap"
        >
          <Plus size={18} strokeWidth={2.5} className="relative z-10" />
          <span className="relative z-10">{t('admin.addCategory')}</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      <div className="relative max-w-xl group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500 group-focus-within:text-gold-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder={t('admin.categoryMgmt.searchPlaceholder')}
          className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl py-3 pl-14 pr-8 text-[13.5px] font-[400] text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all shadow-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-500/0 group-focus-within:ring-gold-500/50 transition-all pointer-events-none" />
      </div>
    </div>
  );
};

export default CategoryHeader;
