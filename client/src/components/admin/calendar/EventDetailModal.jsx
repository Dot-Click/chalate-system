import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarDays, User, DollarSign, MapPin, Trash2, X } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { MOCK_CHALETS } from '../../../services/api/calendarService';
import { STATUS_COLORS } from '../../../types/calendar';

const STATUS_BADGE_MAP = {
  booked: 'info',
  blocked: 'destructive',
  pending: 'warning',
  available: 'success',
};

const EventDetailModal = ({ open, onClose, event, onUnblock }) => {
  const [isUnblocking, setIsUnblocking] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!event) return null;

  const props = event.extendedProps || {};
  const isBlocked = props.type === 'blocked';
  const isBooking = props.type === 'booking';
  const chalet = MOCK_CHALETS.find(c => c.id === props.chaletId);

  const handleUnblock = async () => {
    setIsUnblocking(true);
    try {
      await onUnblock(props.rawId);
    } finally {
      setIsUnblocking(false);
      setShowConfirm(false);
    }
  };

  const formatDate = (dateStr) => {
    try { return format(new Date(dateStr), 'MMM dd, yyyy'); }
    catch { return dateStr; }
  };

  const statusColor = STATUS_COLORS[props.status] || STATUS_COLORS.available;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setShowConfirm(false); } }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: statusColor.bg }}
            />
            <DialogTitle className="text-white capitalize">{props.status} — Details</DialogTitle>
          </div>
          <DialogDescription>
            {isBlocked ? 'Blocked date information' : 'Booking reservation details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-work">Status</span>
            <Badge variant={STATUS_BADGE_MAP[props.status] || 'secondary'} className="capitalize">
              {props.status}
            </Badge>
          </div>

          {/* Chalet */}
          {chalet && (
            <div className="flex items-center justify-between py-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} />
                <span className="text-xs font-work">Chalet</span>
              </div>
              <span className="text-sm text-white font-inter font-medium">{chalet.name}</span>
            </div>
          )}

          {/* Date Range */}
          <div className="flex items-center justify-between py-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={14} />
              <span className="text-xs font-work">Dates</span>
            </div>
            <span className="text-sm text-white font-inter">
              {formatDate(event.startStr)} → {formatDate(event.endStr)}
            </span>
          </div>

          {/* Booking-specific */}
          {isBooking && (
            <>
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={14} />
                  <span className="text-xs font-work">Guest</span>
                </div>
                <span className="text-sm text-white font-inter font-medium">{props.guestName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                  <DollarSign size={14} />
                  <span className="text-xs font-work">Amount</span>
                </div>
                <span className="text-sm text-gold-400 font-inter font-bold">
                  SAR {props.totalAmount?.toLocaleString()}
                </span>
              </div>
            </>
          )}

          {/* Blocked-specific */}
          {isBlocked && props.reason && (
            <div className="py-2 border-t border-white/5">
              <p className="text-xs text-slate-400 font-work mb-1">Reason</p>
              <p className="text-sm text-white">{props.reason}</p>
            </div>
          )}
        </div>

        {/* Unblock Confirmation */}
        {isBlocked && (
          <div className="mt-4 border-t border-white/5 pt-4">
            {!showConfirm ? (
              <Button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 rounded-xl transition-all"
              >
                <Trash2 size={14} className="mr-2" />
                Remove Block
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-amber-400 text-center">Are you sure? This will make these dates available again.</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleUnblock}
                    disabled={isUnblocking}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
                  >
                    {isUnblocking ? 'Removing...' : 'Yes, Remove'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Close Button */}
        {!isBlocked && (
          <DialogFooter className="mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="w-full bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 rounded-xl"
            >
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
