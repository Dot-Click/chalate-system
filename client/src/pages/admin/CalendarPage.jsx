import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays, BookMarked, Lock, LayoutGrid, Clock, RefreshCw, Plus
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import CalendarWrapper from '../../components/admin/calendar/CalendarWrapper';
import BlockDateModal from '../../components/admin/calendar/BlockDateModal';
import EventDetailModal from '../../components/admin/calendar/EventDetailModal';
import CalendarStatCard from '../../components/admin/calendar/CalendarStatCard';
import CalendarLegend from '../../components/admin/calendar/CalendarLegend';
import ChaletFilter from '../../components/admin/calendar/ChaletFilter';
import { StatCardSkeleton, CalendarSkeleton, CalendarError } from '../../components/admin/calendar/CalendarSkeletons';
import { useCalendar } from '../../hooks/useCalendar';

const CalendarPage = () => {
  const {
    selectedChalet,
    events,
    stats,
    isLoading,
    error,
    blockModal,
    eventModal,
    handleChaletChange,
    handleDateClick,
    handleEventClick,
    handleBlockDate,
    handleUnblock,
    closeBlockModal,
    closeEventModal,
    refresh,
  } = useCalendar();

  const statCards = [
    {
      label: 'Total Bookings',
      value: isLoading ? '—' : stats.totalBookings,
      icon: <BookMarked />,
      color: 'bg-blue-500',
      delay: 0,
    },
    {
      label: 'Blocked Dates',
      value: isLoading ? '—' : stats.blockedDates,
      icon: <Lock />,
      color: 'bg-red-500',
      delay: 0.05,
    },
    {
      label: 'Available (30d)',
      value: isLoading ? '—' : stats.availableDates,
      icon: <LayoutGrid />,
      color: 'bg-emerald-500',
      delay: 0.1,
    },
    {
      label: 'Pending Requests',
      value: isLoading ? '—' : stats.pendingRequests,
      icon: <Clock />,
      color: 'bg-amber-500',
      delay: 0.15,
    },
  ];

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gold-500/15 border border-gold-500/20">
              <CalendarDays size={20} className="text-gold-500" />
            </div>
            <h1 className="text-[28px] font-inter font-black text-gold-500 uppercase tracking-tight">
              Calendar
            </h1>
          </div>
          <p className="text-slate-400 text-sm font-inter pl-1 mt-1">
            Manage availability, block dates, and track bookings across all chalets.
          </p>
        </div>

        {/* Top-right actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={refresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 
                       text-slate-400 hover:text-white hover:bg-white/10 text-sm font-work 
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => handleDateClick({ dateStr: new Date().toISOString().split('T')[0] })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 
                       text-black font-semibold text-sm font-inter transition-all shadow-lg shadow-gold-500/20"
          >
            <Plus size={15} />
            Block Dates
          </button>
        </div>
      </motion.header>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((card) => (
              <CalendarStatCard key={card.label} {...card} />
            ))}
      </div>

      {/* ── Toolbar: Filter + Legend ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 
                   px-5 py-3 rounded-2xl border border-white/8 bg-[#111111]"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-work uppercase tracking-wider text-slate-500">Filter by Chalet</span>
          <ChaletFilter value={selectedChalet} onChange={handleChaletChange} />
        </div>
        <CalendarLegend />
      </motion.div>

      {/* ── Calendar Area ── */}
      {error ? (
        <CalendarError message={error} onRetry={refresh} />
      ) : isLoading ? (
        <CalendarSkeleton />
      ) : (
        <CalendarWrapper
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          isLoading={isLoading}
        />
      )}

      {/* ── Modals ── */}
      <BlockDateModal
        open={blockModal.open}
        selectedDate={blockModal.date}
        selectedChalet={selectedChalet}
        onClose={closeBlockModal}
        onSubmit={handleBlockDate}
      />

      <EventDetailModal
        open={eventModal.open}
        event={eventModal.event}
        onClose={closeEventModal}
        onUnblock={handleUnblock}
      />
    </AdminLayout>
  );
};

export default CalendarPage;
