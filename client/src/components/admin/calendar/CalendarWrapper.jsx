import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';

const CalendarWrapper = ({ events, onDateClick, onEventClick, isLoading }) => {
  const calendarRef = useRef(null);

  // Custom event render
  const renderEventContent = (eventInfo) => {
    const props = eventInfo.event.extendedProps;
    const statusIcons = { booked: '✓', blocked: '🚫', pending: '⏳' };
    const icon = statusIcons[props.status] || '•';

    return (
      <div
        className="fc-event-inner flex items-center gap-1 px-1.5 py-0.5 w-full overflow-hidden"
        title={eventInfo.event.title}
      >
        <span className="text-[10px] flex-shrink-0">{icon}</span>
        <span className="text-[11px] font-inter font-semibold truncate leading-tight">
          {eventInfo.event.title.replace(/^[^\s]+\s/, '')}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`calendar-container rounded-2xl border border-white/8 bg-[#111111] overflow-hidden transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={3}
        weekends={true}
        dateClick={onDateClick}
        eventClick={onEventClick}
        eventContent={renderEventContent}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.8}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
        }}
        dayCellClassNames="fc-dark-cell"
        eventClassNames="fc-dark-event"
        nowIndicator={true}
        scrollTime="08:00:00"
      />
    </motion.div>
  );
};

export default CalendarWrapper;
