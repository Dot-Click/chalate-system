// ===========================
// Calendar Feature Types
// ===========================

/**
 * @typedef {Object} Chalet
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {string} image
 */

/**
 * @typedef {'available' | 'booked' | 'blocked' | 'pending'} DateStatus
 */

/**
 * @typedef {Object} BlockedDate
 * @property {string} id
 * @property {string} chaletId
 * @property {string} startDate - ISO date string
 * @property {string} endDate - ISO date string
 * @property {string} reason
 * @property {'blocked' | 'maintenance' | 'reserved'} status
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} chaletId
 * @property {string} guestName
 * @property {string} checkIn - ISO date string
 * @property {string} checkOut - ISO date string
 * @property {'confirmed' | 'pending' | 'cancelled'} bookingStatus
 * @property {number} totalAmount
 * @property {string} createdAt
 */

/**
 * @typedef {Object} CalendarEvent
 * @property {string} id
 * @property {string} title
 * @property {string} start
 * @property {string} end
 * @property {string} backgroundColor
 * @property {string} borderColor
 * @property {string} textColor
 * @property {Object} extendedProps
 * @property {DateStatus} extendedProps.status
 * @property {string} [extendedProps.reason]
 * @property {string} [extendedProps.guestName]
 * @property {number} [extendedProps.totalAmount]
 * @property {string} extendedProps.chaletId
 */

/**
 * @typedef {Object} CalendarStats
 * @property {number} totalBookings
 * @property {number} blockedDates
 * @property {number} availableDates
 * @property {number} pendingRequests
 */

export const STATUS_COLORS = {
  available: {
    bg: '#10b981',
    border: '#059669',
    text: '#ffffff',
    tailwind: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Available',
  },
  booked: {
    bg: '#3b82f6',
    border: '#2563eb',
    text: '#ffffff',
    tailwind: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    label: 'Booked',
  },
  blocked: {
    bg: '#ef4444',
    border: '#dc2626',
    text: '#ffffff',
    tailwind: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'Blocked',
  },
  pending: {
    bg: '#f59e0b',
    border: '#d97706',
    text: '#000000',
    tailwind: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Pending',
  },
};
