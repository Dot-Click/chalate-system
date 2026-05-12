import React from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { MOCK_CHALETS } from '../../../services/api/calendarService';

const ChaletFilter = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Home size={15} className="text-gold-500" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 pl-9 pr-8 rounded-xl border border-white/10 bg-[#111111] text-sm text-white 
                   focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/40 
                   appearance-none cursor-pointer transition-all hover:border-white/20 min-w-[180px]"
      >
        {MOCK_CHALETS.map((c) => (
          <option key={c.id} value={c.id} className="bg-[#111111] text-white">
            {c.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </div>
  );
};

export default ChaletFilter;
