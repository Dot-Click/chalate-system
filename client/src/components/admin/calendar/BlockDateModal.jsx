import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { CalendarX, Home, AlertTriangle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { MOCK_CHALETS } from '../../../services/api/calendarService';

const BLOCK_TYPES = [
  { value: 'blocked', label: 'General Block', icon: '🚫', desc: 'Mark dates as unavailable' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧', desc: 'Scheduled maintenance work' },
  { value: 'reserved', label: 'Owner Reserved', icon: '👑', desc: 'Reserved for owner use' },
];

const BlockDateModal = ({ open, onClose, selectedDate, selectedChalet, onSubmit }) => {
  const [form, setForm] = useState({
    chaletId: selectedChalet !== 'all' ? selectedChalet : 'c1',
    startDate: selectedDate || format(new Date(), 'yyyy-MM-dd'),
    endDate: selectedDate ? format(addDays(new Date(selectedDate), 1), 'yyyy-MM-dd') : format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    reason: '',
    blockStatus: 'blocked',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedDate) {
      setForm(prev => ({
        ...prev,
        startDate: selectedDate,
        endDate: format(addDays(new Date(selectedDate), 1), 'yyyy-MM-dd'),
        chaletId: selectedChalet !== 'all' ? selectedChalet : 'c1',
      }));
    }
  }, [selectedDate, selectedChalet]);

  const validate = () => {
    const newErrors = {};
    if (!form.chaletId) newErrors.chaletId = 'Please select a chalet';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    if (form.endDate <= form.startDate) newErrors.endDate = 'End date must be after start date';
    if (!form.reason.trim()) newErrors.reason = 'Please provide a reason';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ chaletId: 'c1', startDate: '', endDate: '', reason: '', blockStatus: 'blocked' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const chalets = MOCK_CHALETS.filter(c => c.id !== 'all');

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20">
              <CalendarX size={18} className="text-red-400" />
            </div>
            <DialogTitle className="text-white">Block Dates</DialogTitle>
          </div>
          <DialogDescription>
            Mark selected dates as unavailable for bookings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Block Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-work uppercase tracking-wider text-slate-400">Block Type</label>
            <div className="grid grid-cols-3 gap-2">
              {BLOCK_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, blockStatus: type.value }))}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    form.blockStatus === type.value
                      ? 'border-gold-500/60 bg-gold-500/10 text-gold-400'
                      : 'border-white/8 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-[10px] font-work leading-tight">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chalet Select */}
          <div className="space-y-2">
            <label className="text-xs font-work uppercase tracking-wider text-slate-400">
              <Home size={12} className="inline mr-1.5" />Chalet
            </label>
            <select
              value={form.chaletId}
              onChange={(e) => setForm(prev => ({ ...prev, chaletId: e.target.value }))}
              className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all appearance-none cursor-pointer"
            >
              {chalets.map(c => (
                <option key={c.id} value={c.id} className="bg-[#111111] text-white">{c.name}</option>
              ))}
            </select>
            {errors.chaletId && <p className="text-xs text-red-400">{errors.chaletId}</p>}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-work uppercase tracking-wider text-slate-400">Start Date</label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                className="text-white [color-scheme:dark]"
              />
              {errors.startDate && <p className="text-xs text-red-400">{errors.startDate}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-work uppercase tracking-wider text-slate-400">End Date</label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                className="text-white [color-scheme:dark]"
              />
              {errors.endDate && <p className="text-xs text-red-400">{errors.endDate}</p>}
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="text-xs font-work uppercase tracking-wider text-slate-400">Reason</label>
            <Textarea
              value={form.reason}
              onChange={(e) => setForm(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="e.g. Annual maintenance, owner use..."
              rows={3}
            />
            {errors.reason && <p className="text-xs text-red-400">{errors.reason}</p>}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
            <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-300/80 leading-relaxed">
              Blocking these dates will prevent new bookings from being made. Existing confirmed bookings will not be affected.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Blocking...
                </span>
              ) : '🚫 Block Dates'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlockDateModal;
