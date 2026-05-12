import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CalendarStatCard = ({ icon, label, value, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#111111] p-5 group hover:border-white/15 transition-all duration-300"
    >
      {/* Subtle glow */}
      <div className={cn('absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity', color)} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-xs font-work uppercase tracking-widest text-slate-500">{label}</p>
          <p className="text-3xl font-black font-inter text-white">{value}</p>
        </div>
        <div className={cn('p-2.5 rounded-xl', color, 'bg-opacity-15')}>
          {React.cloneElement(icon, { size: 20, className: cn('text-current', getIconColor(color)) })}
        </div>
      </div>
    </motion.div>
  );
};

function getIconColor(colorClass) {
  if (colorClass.includes('blue')) return 'text-blue-400';
  if (colorClass.includes('red')) return 'text-red-400';
  if (colorClass.includes('emerald') || colorClass.includes('green')) return 'text-emerald-400';
  if (colorClass.includes('amber') || colorClass.includes('gold')) return 'text-amber-400';
  return 'text-slate-400';
}

export default CalendarStatCard;
