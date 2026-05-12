import React from 'react';
import { STATUS_COLORS } from '../../../types/calendar';

const LEGEND_ITEMS = [
  { status: 'booked', icon: '✓' },
  { status: 'blocked', icon: '🚫' },
  { status: 'pending', icon: '⏳' },
  { status: 'available', icon: '○' },
];

const CalendarLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {LEGEND_ITEMS.map(({ status, icon }) => {
        const color = STATUS_COLORS[status];
        return (
          <div
            key={status}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/5 hover:bg-white/10 transition-all"
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color.bg }}
            />
            <span className="text-xs text-slate-400 font-work capitalize">{color.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarLegend;
