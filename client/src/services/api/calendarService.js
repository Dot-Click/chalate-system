import { format, addDays, subDays } from 'date-fns';

// =====================
// Mock Chalets Data
// =====================
export const MOCK_CHALETS = [
  { id: 'all', name: 'All Chalets', location: '', image: '' },
  { id: 'c1', name: 'Azure Villa', location: 'Al Khobar', image: '' },
  { id: 'c2', name: 'Desert Pearl', location: 'Riyadh', image: '' },
  { id: 'c3', name: 'Golden Sands', location: 'Jeddah', image: '' },
  { id: 'c4', name: 'Royal Retreat', location: 'Dammam', image: '' },
];

// Helper to generate dates relative to today
const today = new Date();
const fmt = (d) => format(d, 'yyyy-MM-dd');

// =====================
// Mock Bookings Data
// =====================
export const MOCK_BOOKINGS = [
  {
    id: 'b1', chaletId: 'c1', guestName: 'Ahmed Al-Rashid',
    checkIn: fmt(addDays(today, 2)), checkOut: fmt(addDays(today, 5)),
    bookingStatus: 'confirmed', totalAmount: 1800,
    createdAt: fmt(subDays(today, 3)),
  },
  {
    id: 'b2', chaletId: 'c1', guestName: 'Sara Mohammed',
    checkIn: fmt(addDays(today, 10)), checkOut: fmt(addDays(today, 13)),
    bookingStatus: 'confirmed', totalAmount: 2400,
    createdAt: fmt(subDays(today, 1)),
  },
  {
    id: 'b3', chaletId: 'c2', guestName: 'Khalid Al-Amir',
    checkIn: fmt(addDays(today, 1)), checkOut: fmt(addDays(today, 4)),
    bookingStatus: 'confirmed', totalAmount: 1500,
    createdAt: fmt(subDays(today, 2)),
  },
  {
    id: 'b4', chaletId: 'c2', guestName: 'Fatima Hassan',
    checkIn: fmt(addDays(today, 8)), checkOut: fmt(addDays(today, 10)),
    bookingStatus: 'pending', totalAmount: 900,
    createdAt: fmt(today),
  },
  {
    id: 'b5', chaletId: 'c3', guestName: 'Omar Al-Farsi',
    checkIn: fmt(addDays(today, 3)), checkOut: fmt(addDays(today, 7)),
    bookingStatus: 'confirmed', totalAmount: 2100,
    createdAt: fmt(subDays(today, 5)),
  },
  {
    id: 'b6', chaletId: 'c3', guestName: 'Nora Al-Qahtani',
    checkIn: fmt(addDays(today, 15)), checkOut: fmt(addDays(today, 18)),
    bookingStatus: 'pending', totalAmount: 1200,
    createdAt: fmt(today),
  },
  {
    id: 'b7', chaletId: 'c4', guestName: 'Abdullah Malik',
    checkIn: fmt(addDays(today, 5)), checkOut: fmt(addDays(today, 9)),
    bookingStatus: 'confirmed', totalAmount: 3200,
    createdAt: fmt(subDays(today, 4)),
  },
];

// =====================
// Mock Blocked Dates
// =====================
export const MOCK_BLOCKED_DATES = [
  {
    id: 'bl1', chaletId: 'c1',
    startDate: fmt(addDays(today, 7)), endDate: fmt(addDays(today, 8)),
    reason: 'Annual maintenance', status: 'maintenance', createdAt: fmt(today),
  },
  {
    id: 'bl2', chaletId: 'c2',
    startDate: fmt(addDays(today, 12)), endDate: fmt(addDays(today, 14)),
    reason: 'Owner personal use', status: 'blocked', createdAt: fmt(today),
  },
  {
    id: 'bl3', chaletId: 'c3',
    startDate: fmt(addDays(today, 20)), endDate: fmt(addDays(today, 22)),
    reason: 'Deep cleaning', status: 'maintenance', createdAt: fmt(today),
  },
  {
    id: 'bl4', chaletId: 'c4',
    startDate: fmt(subDays(today, 2)), endDate: fmt(subDays(today, 1)),
    reason: 'Renovation', status: 'maintenance', createdAt: fmt(subDays(today, 5)),
  },
];

// =====================
// Calendar API Service
// =====================
class CalendarService {
  constructor() {
    // In-memory store (replace with real API calls)
    this._bookings = [...MOCK_BOOKINGS];
    this._blockedDates = [...MOCK_BLOCKED_DATES];
  }

  // Simulate network delay
  _delay(ms = 400) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getBookings(chaletId = 'all') {
    await this._delay();
    if (chaletId === 'all') return [...this._bookings];
    return this._bookings.filter(b => b.chaletId === chaletId);
  }

  async getBlockedDates(chaletId = 'all') {
    await this._delay();
    if (chaletId === 'all') return [...this._blockedDates];
    return this._blockedDates.filter(b => b.chaletId === chaletId);
  }

  async blockDates({ chaletId, startDate, endDate, reason, status = 'blocked' }) {
    await this._delay(600);
    const newBlock = {
      id: `bl${Date.now()}`,
      chaletId,
      startDate,
      endDate,
      reason,
      status,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    this._blockedDates.push(newBlock);
    return newBlock;
  }

  async unblockDate(blockId) {
    await this._delay(400);
    this._blockedDates = this._blockedDates.filter(b => b.id !== blockId);
    return { success: true };
  }

  async getStats(chaletId = 'all') {
    await this._delay(300);
    const bookings = chaletId === 'all'
      ? this._bookings
      : this._bookings.filter(b => b.chaletId === chaletId);
    const blocked = chaletId === 'all'
      ? this._blockedDates
      : this._blockedDates.filter(b => b.chaletId === chaletId);

    return {
      totalBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
      blockedDates: blocked.length,
      availableDates: 30 - bookings.length - blocked.length,
      pendingRequests: bookings.filter(b => b.bookingStatus === 'pending').length,
    };
  }
}

export const calendarService = new CalendarService();
