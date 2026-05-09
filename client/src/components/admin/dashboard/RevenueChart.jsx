import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7500 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-xl font-inter font-black text-white">
          {payload[0].value.toLocaleString()} <span className="text-xs text-gold-500">KWD</span>
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] p-7 space-y-10 hover:border-gold-500/20 transition-all duration-500 group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-inter font-[700] text-gold-500 uppercase">{t('admin.revenueGrowth')}</h3>
          <p className="text-[14px] font-[300] text-slate-400 ">{t('admin.revenueSubtitle')}</p>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse" />
            <span className="text-[11px] font-[400] text-slate-300 uppercase tracking-widest">{t('admin.earnings')}</span>
          </div>

          <Select defaultValue="2024">
             <SelectTrigger className="w-[140px] bg-white/5 border-white/10 rounded-xl text-[12px] font-[400] text-gold-500 h-10 hover:bg-gold-500/5 transition-all">
                <SelectValue placeholder={t('admin.selectYear')} />
             </SelectTrigger>
             <SelectContent className="bg-[#0a0a0a] border-white/10 rounded-xl">
                <SelectItem value="2024" className="text-[12px] font-[400] text-slate-400 focus:bg-gold-500 focus:text-black">2024</SelectItem>
                <SelectItem value="2023" className="text-[12px] font-[400] text-slate-400 focus:bg-gold-500 focus:text-black">2023</SelectItem>
             </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff03" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#475569', fontSize: 11, fontWeight: 700}} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#475569', fontSize: 11, fontWeight: 700}} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#f59e0b" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#revenueGradient)"
              animationDuration={2000}
              activeDot={{ r: 6, fill: '#f59e0b', stroke: '#000', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
