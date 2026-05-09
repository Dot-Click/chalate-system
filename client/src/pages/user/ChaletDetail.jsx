import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval, 
  isWithinInterval,
  isBefore,
  startOfToday,
  getDay
} from 'date-fns';
import { 
  Star, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Waves, 
  Wind, 
  Utensils, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Calendar as CalendarIcon,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Info,
  Clock,
  Lock,
  CalendarCheck
} from 'lucide-react';
import ChaletCard from '../../components/user/ChaletCard';
import Footer from '../../components/user/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Luxury Custom Calendar Component ---
const BookingCalendar = ({ 
  selectedRange, 
  onRangeSelect, 
  bookedDates, 
  adminClosedDates,
  isRTL, 
  t,
  pricing 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="space-y-1">
          <h3 className="text-lg font-work font-black text-gold-gradient uppercase tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Select Your Dates</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={prevMonth}
            disabled={isBefore(startOfMonth(currentMonth), startOfMonth(today))}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-gold-500 hover:bg-gold-500/5 hover:border-gold-500/30 disabled:opacity-10 transition-all cursor-pointer"
          >
            <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-gold-500 hover:bg-gold-500/5 hover:border-gold-500/30 transition-all cursor-pointer"
          >
            <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateNames = isRTL 
      ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'] 
      : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-[10px] font-black text-slate-600 text-center uppercase tracking-widest py-3">
          {dateNames[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 border-b border-white/5">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isBooked = bookedDates.some(d => isSameDay(d, cloneDay));
        const isAdminClosed = adminClosedDates.some(d => isSameDay(d, cloneDay));
        const isPast = isBefore(cloneDay, today);
        const isDisabled = isBooked || isAdminClosed || isPast;
        
        const isSelected = selectedRange.start && isSameDay(cloneDay, selectedRange.start);
        const isEndSelected = selectedRange.end && isSameDay(cloneDay, selectedRange.end);
        const isInRange = selectedRange.start && selectedRange.end && isWithinInterval(cloneDay, { start: selectedRange.start, end: selectedRange.end });

        const dOfWeek = getDay(day);
        const isWeekend = dOfWeek === 5 || dOfWeek === 6 || dOfWeek === 0; // Fri, Sat, Sun

        days.push(
          <div
            key={day}
            className={cn(
              "relative aspect-square flex flex-col items-center justify-center text-[13px] font-medium transition-all cursor-pointer rounded-2xl group overflow-hidden",
              !isSameMonth(day, monthStart) ? "opacity-0 pointer-events-none" : "text-white/80",
              isPast ? "text-slate-800 line-through opacity-30 cursor-not-allowed" : "",
              isBooked ? "bg-red-500/10 text-red-500/50 cursor-not-allowed" : "",
              isAdminClosed ? "bg-slate-800/40 text-slate-600 cursor-not-allowed" : "",
              !isDisabled && "hover:bg-gold-500/10 hover:text-gold-500 hover:scale-[1.05]",
              isSelected || isEndSelected ? "bg-gold-500 text-black font-black z-10 hover:bg-gold-600 scale-[1.05] shadow-lg shadow-gold-500/20" : "",
              isInRange && !isSelected && !isEndSelected ? "bg-gold-500/10 text-gold-500 rounded-none z-0" : ""
            )}
            onClick={() => !isDisabled && onRangeSelect(cloneDay)}
          >
            <span className={cn(isSelected || isEndSelected ? "text-black" : "")}>{formattedDate}</span>
            
            {/* Price tag on hover */}
            {!isDisabled && isSameMonth(day, monthStart) && !isSelected && !isEndSelected && (
              <div className="absolute bottom-1.5 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-gold-500">
                {isWeekend ? pricing.weekend : pricing.weekday}KWD
              </div>
            )}

            {/* Status Indicators */}
            {isBooked && !isPast && (
              <div className="absolute top-1 text-[11px] font-[500] uppercase text-red-500/60 tracking-tighter">Booked</div>
            )}
            {isAdminClosed && (
              <div className="absolute top-1 text-[11px] font-[500] uppercase text-slate-500 tracking-tighter">Closed</div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
      {/* Glossy Overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[80px] rounded-full" />
      
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-500 shadow-sm shadow-gold-500/50" />
          <span className="text-[13px] font-inter font-[500] text-slate-400 uppercase tracking-widest">Available</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-40" />
          <span className="text-[13px] font-inter font-[500] text-slate-400 uppercase tracking-widest">Booked</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <span className="text-[13px] font-inter font-[500] text-slate-400 uppercase tracking-widest">Admin Closed</span>
        </div>
      </div>
    </div>
  );
};

const ChaletDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // State
  const [activeImage, setActiveImage] = useState(0);
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(2);

  // Mock property data
  const chaletData = useMemo(() => {
    const basePrice = id === '1' ? 250 : id === '2' ? 180 : id === '3' ? 320 : 210;
    return {
      id: id,
      title: t(`home.featured.chalets.${id === '1' ? 'oasis' : id === '2' ? 'pearl' : id === '3' ? 'azure' : 'palace'}.title`),
      location: t(`home.featured.chalets.${id === '1' ? 'oasis' : id === '2' ? 'pearl' : id === '3' ? 'azure' : 'palace'}.location`),
      pricing: {
        weekday: basePrice,
        weekend: Math.round(basePrice * 1.4),
        holiday: Math.round(basePrice * 2.2)
      },
      rating: id === '3' ? "5.0" : "4.9",
      reviews: "124",
      description: "Experience the pinnacle of luxury in this architecturally stunning chalet. Designed for those who demand the finest things in life, this property offers panoramic views, state-of-the-art amenities, and absolute privacy. Every detail has been meticulously crafted to provide an unforgettable stay, from the hand-picked furnishings to the seamless indoor-outdoor living spaces.",
      capacity: 12,
      bedrooms: 5,
      bathrooms: 4,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
      ],
      bookedDates: [
        addDays(startOfToday(), 2),
        addDays(startOfToday(), 3),
      ],
      adminClosedDates: [
        addDays(startOfToday(), 10),
        addDays(startOfToday(), 11),
        addDays(startOfToday(), 12)
      ]
    };
  }, [id, t]);

  // Pricing Calculation Logic
  const bookingSummary = useMemo(() => {
    if (!selectedRange.start || !selectedRange.end) return null;

    const nights = eachDayOfInterval({ 
      start: selectedRange.start, 
      end: subMonths(addMonths(selectedRange.end, 0), 0)
    }).slice(0, -1);

    let total = 0;
    const details = nights.map(date => {
      const day = getDay(date);
      let price = chaletData.pricing.weekday;
      let label = "Weekday";

      if (day === 5 || day === 6 || day === 0) {
        price = chaletData.pricing.weekend;
        label = "Weekend";
      }

      total += price;
      return { date, price, label };
    });

    return { total, nightCount: nights.length, details };
  }, [selectedRange, chaletData]);

  const handleRangeSelect = (date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else if (isBefore(date, selectedRange.start)) {
      setSelectedRange({ start: date, end: null });
    } else {
      const interval = eachDayOfInterval({ start: selectedRange.start, end: date });
      const hasBlocked = interval.some(d => 
        chaletData.bookedDates.some(bd => isSameDay(bd, d)) || 
        chaletData.adminClosedDates.some(ad => isSameDay(ad, d))
      );
      
      if (hasBlocked) {
        setSelectedRange({ start: date, end: null });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className={`min-h-screen bg-[#050505] flex flex-col ${isRTL ? 'font-arabic' : 'font-work'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Unified Luxury Gold Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,rgba(0,0,0)_70%)] blur-[100px]" />
      </div>

      <main className="flex-grow pt-24 pb-20 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Section */}
            <div className="lg:col-span-7 space-y-12">
              {/* Gallery */}
              <div className="space-y-5">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      src={chaletData.images[activeImage]} 
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8">
                    <button onClick={() => setActiveImage((v) => (v - 1 + chaletData.images.length) % chaletData.images.length)} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-gold-500 hover:text-black transition-all cursor-pointer flex items-center justify-center">
                      <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <button onClick={() => setActiveImage((v) => (v + 1) % chaletData.images.length)} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-gold-500 hover:text-black transition-all cursor-pointer flex items-center justify-center">
                      <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {chaletData.images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImage(idx)} className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-gold-500 scale-95 shadow-lg shadow-gold-500/20' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <section className="space-y-6">
                 <h2 className="text-3xl font-work font-[700] text-gold-gradient uppercase tracking-tight">About this Space</h2>
                 <p className="text-slate-400 leading-relaxed text-[15px] font-light font-inter max-w-3xl">
                    {chaletData.description}
                 </p>
              </section>

              {/* Enhanced Calendar UI */}
              <section className="space-y-8 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="space-y-1">
                      <h2 className="text-2xl font-work font-black text-gold-gradient uppercase tracking-tight">Availability Calendar</h2>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Select your stay dates below</p>
                   </div>
                   <div className="flex items-center gap-3 bg-green-500/5 px-4 py-2 rounded-2xl border border-green-500/10">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50" />
                      <span className="text-[11px] font-[600] text-green-500 uppercase tracking-wide font-inter">Real-time Availability</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 gap-10">
                   <BookingCalendar 
                     selectedRange={selectedRange}
                     onRangeSelect={handleRangeSelect}
                     bookedDates={chaletData.bookedDates}
                     adminClosedDates={chaletData.adminClosedDates}
                     isRTL={isRTL}
                     t={t}
                     pricing={chaletData.pricing}
                   />
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
                         <div className="space-y-4">
                            <h4 className="text-[19px] font-[700] font-work text-gold-500 uppercase ">Pricing Logic</h4>
                            <div className="space-y-3">
                               <div className="flex items-center justify-between">
                                  <span className="text-[14px] font-[600] font-work text-slate-400">Weekdays (Mon-Thu)</span>
                                  <span className="text-[16px] font-[600] font-work text-white">{chaletData.pricing.weekday} KWD</span>
                               </div>
                               <div className="flex items-center justify-between">
                                  <span className="text-[14px] font-[600] font-work text-slate-400">Weekends (Fri-Sun)</span>
                                  <span className="text-[16px] font-[600] font-work text-gold-500">{chaletData.pricing.weekend} KWD</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-[9px] text-white  tracking-widest">
                            <Info className="w-3 h-3 text-gold-500" />
                            Dynamic rates apply based on selected dates.
                         </div>
                      </div>

                      <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 space-y-4">
                         <h4 className="text-[19px] font-[700] font-work text-gold-500 uppercase">Availability Legend</h4>
                         <div className="space-y-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500">
                                  <CalendarCheck className="w-4 h-4" />
                               </div>
                               <span className="text-[12px] font-[500] text-white uppercase tracking-widest">Available</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                  <Clock className="w-4 h-4" />
                               </div>
                               <span className="text-[12px] font-[500] text-white uppercase tracking-widest">Currently Booked</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-slate-500">
                                  <Lock className="w-4 h-4" />
                               </div>
                               <span className="text-[12px] font-[500] text-white uppercase tracking-widest">Closed by Admin</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </section>
            </div>

            {/* Right Section (Sticky) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
               <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 blur-[100px] rounded-full" />
                  
                  <div className="space-y-3">
                     <h1 className="text-4xl font-work font-black text-gold-gradient uppercase tracking-tight">{chaletData.title}</h1>
                     <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-4 h-4 text-gold-500" />
                        <span className="text-[15px] font-inter text-white font-[600] uppercase">{chaletData.location}</span>
                     </div>
                  </div>

                  {/* Compact Date Selection (Single Line) */}
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div className="flex-1">
                        <span className="text-[10px] font-[600] text-gold-500 uppercase block mb-0.5 opacity-70">Check In</span>
                        <div className="text-[13px] font-[500] text-white">{selectedRange.start ? format(selectedRange.start, 'MMM d, yyyy') : '--'}</div>
                     </div>
                     <div className="w-[1px] h-8 bg-white/10" />
                     <div className="flex-1 text-right">
                        <span className="text-[10px] font-[600] text-gold-500 uppercase block mb-0.5 opacity-70">Check Out</span>
                        <div className="text-[13px] font-[500] text-white">{selectedRange.end ? format(selectedRange.end, 'MMM d, yyyy') : '--'}</div>
                     </div>
                  </div>

                  {/* Compact Guest Counter */}
                  <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5">
                     <span className="text-[11px] font-[600] text-slate-400 uppercase tracking-widest ml-1">Total Guests</span>
                     <div className="flex items-center gap-4">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-gold-500 hover:border-gold-500/30 transition-all cursor-pointer">-</button>
                        <span className="text-sm font-[600] text-white min-w-[50px] text-center">{guests} {t('detail.guests')}</span>
                        <button onClick={() => setGuests(Math.min(chaletData.capacity, guests + 1))} className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-gold-500 hover:border-gold-500/30 transition-all cursor-pointer">+</button>
                     </div>
                  </div>

                  <div className="pt-6 space-y-5">
                     {bookingSummary ? (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="space-y-4"
                       >
                          <div className="space-y-2 max-h-[120px] overflow-y-auto no-scrollbar pr-2">
                             {bookingSummary.details.map((item, idx) => (
                               <div key={idx} className="flex justify-between text-[12px] font-medium text-slate-500">
                                  <span>{format(item.date, 'EEEE, MMM d')}</span>
                                  <span className={cn(item.label === 'Weekend' ? "text-gold-500" : "text-white")}>{item.price} KWD</span>
                               </div>
                             ))}
                          </div>
                          <div className="flex justify-between items-end pt-6 border-t border-white/5">
                             <div className="space-y-1">
                                <div className="text-[13px] font-[400] text-slate-500 uppercase ">Total for {bookingSummary.nightCount} nights</div>
                                <div className="text-[12px] text-slate-600 font-[500] italic">Includes all taxes & service fees</div>
                             </div>
                             <div className="text-[30px] font-[700] font-work font-[500] text-white">{bookingSummary.total} <span className="text-[20px] text-gold-500">KWD</span></div>
                          </div>
                       </motion.div>
                     ) : (
                       <div className="p-4 bg-gold-500/5 rounded-3xl border border-gold-500/10 text-center space-y-2">
                          <p className="text-[13px] font-[600] text-gold-500 uppercase">Ready to book?</p>
                          <p className="text-[12px] font-[500] text-slate-500">Select your dates on the calendar to see the final reservation price.</p>
                       </div>
                     )}

                     <Button 
                       variant="gold" 
                       disabled={!bookingSummary}
                       className="w-full py-6 rounded-[1.5rem] font-[700] cursor-pointer uppercase text-[15px] shadow-2xl shadow-gold-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale"
                     >
                        {t('detail.reserve')}
                     </Button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChaletDetail;
