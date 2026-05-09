import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, icon, trend, trendValue, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -3 }}
    className={cn(
      "relative group border p-6 rounded-[1.8rem] overflow-hidden transition-all duration-500",
      "bg-[#080808] border-white/5 hover:border-gold-500/30",
      // Subtle background tint based on color prop
      color.replace('bg-', 'after:bg-').replace('500', '500/10')
    )}
  >
    {/* Dynamic Background Glow */}
    <div className={cn(
       "absolute -right-6 -top-6 w-24 h-24 blur-[40px] opacity-[0.03] group-hover:opacity-[0.1] transition-opacity",
       color
    )} />

    {/* Decorative Top Accent */}
    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gold-500 group-hover:text-black transition-all duration-500", color.replace('bg-', 'text-'))}>
          {React.cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter", 
            trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          )}>
            {trend === 'up' ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
            {trendValue}
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <h3 className="text-2xl font-inter font-black text-white tracking-tight leading-none">{value}</h3>
        <p className="text-[11px] font-[600] text-slate-500 uppercase tracking-widest ml-0.5 opacity-60">{title}</p>
      </div>
    </div>
  </motion.div>
);

export default StatCard;
