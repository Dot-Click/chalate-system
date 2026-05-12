import { useState, useCallback, useEffect } from 'react';
import { calendarService } from '../services/api/calendarService';
import { STATUS_COLORS } from '../types/calendar';

/**
 * Converts raw booking/blocked data into FullCalendar event objects
 */
function buildEvents(bookings, blockedDates) {
  const events = [];

  bookings.forEach((b) => {
    const status = b.bookingStatus === 'pending' ? 'pending' : 'booked';
    const colors = STATUS_COLORS[status];
    events.push({
      id: b.id,
      title: b.bookingStatus === 'pending' ? `⏳ ${b.guestName}` : `✓ ${b.guestName}`,
      start: b.checkIn,
      end: b.checkOut,
      backgroundColor: colors.bg,
      borderColor: colors.border,
      textColor: colors.text,
      extendedProps: {
        type: 'booking',
        status,
        guestName: b.guestName,
        totalAmount: b.totalAmount,
        chaletId: b.chaletId,
        bookingStatus: b.bookingStatus,
        rawId: b.id,
      },
    });
  });

  blockedDates.forEach((bl) => {
    const colors = STATUS_COLORS.blocked;
    events.push({
      id: bl.id,
      title: `🚫 ${bl.reason || 'Blocked'}`,
      start: bl.startDate,
      end: bl.endDate,
      backgroundColor: colors.bg,
      borderColor: colors.border,
      textColor: colors.text,
      extendedProps: {
        type: 'blocked',
        status: 'blocked',
        reason: bl.reason,
        blockStatus: bl.status,
        chaletId: bl.chaletId,
        rawId: bl.id,
      },
    });
  });

  return events;
}

export function useCalendar() {
  const [selectedChalet, setSelectedChalet] = useState('all');
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    blockedDates: 0,
    availableDates: 0,
    pendingRequests: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [blockModal, setBlockModal] = useState({ open: false, date: null });
  const [eventModal, setEventModal] = useState({ open: false, event: null });

  const fetchData = useCallback(async (chaletId) => {
    setIsLoading(true);
    setError(null);
    try {
      const [bookings, blockedDates, statsData] = await Promise.all([
        calendarService.getBookings(chaletId),
        calendarService.getBlockedDates(chaletId),
        calendarService.getStats(chaletId),
      ]);
      setEvents(buildEvents(bookings, blockedDates));
      setStats(statsData);
    } catch (err) {
      setError('Failed to load calendar data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedChalet);
  }, [selectedChalet, fetchData]);

  const handleChaletChange = useCallback((chaletId) => {
    setSelectedChalet(chaletId);
  }, []);

  const handleDateClick = useCallback((info) => {
    setBlockModal({ open: true, date: info.dateStr });
  }, []);

  const handleEventClick = useCallback((info) => {
    setEventModal({ open: true, event: info.event });
  }, []);

  const handleBlockDate = useCallback(async (formData) => {
    await calendarService.blockDates({
      chaletId: formData.chaletId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: formData.blockStatus,
    });
    setBlockModal({ open: false, date: null });
    await fetchData(selectedChalet);
  }, [selectedChalet, fetchData]);

  const handleUnblock = useCallback(async (blockId) => {
    await calendarService.unblockDate(blockId);
    setEventModal({ open: false, event: null });
    await fetchData(selectedChalet);
  }, [selectedChalet, fetchData]);

  const closeBlockModal = useCallback(() => {
    setBlockModal({ open: false, date: null });
  }, []);

  const closeEventModal = useCallback(() => {
    setEventModal({ open: false, event: null });
  }, []);

  const refresh = useCallback(() => {
    fetchData(selectedChalet);
  }, [selectedChalet, fetchData]);

  return {
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
  };
}
