import React from 'react';

// Skeleton loader for stats cards
export const StatCardSkeleton = () => (
  <div className="rounded-2xl border border-white/5 bg-[#111111] p-5 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-3 flex-1">
        <div className="h-2.5 w-24 bg-white/8 rounded-full" />
        <div className="h-8 w-16 bg-white/10 rounded-lg" />
      </div>
      <div className="w-10 h-10 rounded-xl bg-white/8" />
    </div>
  </div>
);

// Skeleton loader for the full calendar
export const CalendarSkeleton = () => (
  <div className="rounded-2xl border border-white/8 bg-[#111111] p-6 animate-pulse space-y-4">
    {/* Header row */}
    <div className="flex items-center justify-between">
      <div className="h-6 w-32 bg-white/10 rounded-lg" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-white/8 rounded-lg" />
        <div className="h-8 w-20 bg-white/8 rounded-lg" />
        <div className="h-8 w-20 bg-white/8 rounded-lg" />
      </div>
      <div className="h-6 w-24 bg-white/10 rounded-lg" />
    </div>
    {/* Days row */}
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-6 bg-white/5 rounded" />
      ))}
    </div>
    {/* Calendar grid */}
    {Array.from({ length: 5 }).map((_, row) => (
      <div key={row} className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, col) => (
          <div
            key={col}
            className={`h-16 rounded-xl ${
              (row + col) % 7 === 3 ? 'bg-blue-500/10' :
              (row + col) % 5 === 2 ? 'bg-red-500/10' :
              'bg-white/3'
            }`}
          />
        ))}
      </div>
    ))}
  </div>
);

// Error state component
export const CalendarError = ({ message, onRetry }) => (
  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 flex flex-col items-center justify-center gap-4">
    <div className="text-4xl">⚠️</div>
    <div className="text-center">
      <p className="text-red-400 font-inter font-semibold">{message}</p>
      <p className="text-slate-500 text-sm mt-1">Please check your connection and try again.</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 
                   hover:bg-red-500/30 transition-all text-sm font-work"
      >
        Try Again
      </button>
    )}
  </div>
);

// Empty state component
export const CalendarEmpty = () => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <div className="text-5xl">📅</div>
    <p className="text-slate-400 font-inter">No events found for this period.</p>
    <p className="text-slate-600 text-sm">Click any date to add a block or create a booking.</p>
  </div>
);
