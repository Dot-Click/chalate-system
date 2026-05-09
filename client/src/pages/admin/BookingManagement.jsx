import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import BookingHeader from '../../components/admin/bookings/BookingHeader';
import BookingTable from '../../components/admin/bookings/BookingTable';

const allBookings = [
  { id: '#BK-0041', guest: 'Ahmed Al-Rashid',   email: 'ahmed@example.com',  chalet: 'Royal Oasis',     chaletImage: 'https://images.unsplash.com/photo-1580587767503-36873587b5cd?auto=format&fit=crop&q=80&w=400', checkIn: 'May 12, 2026', checkOut: 'May 15, 2026', amount: '1,350 KWD', status: 'Confirmed'  },
  { id: '#BK-0040', guest: 'Sara Al-Mutairi',   email: 'sara@example.com',   chalet: 'Azure Beach',     chaletImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400', checkIn: 'May 10, 2026', checkOut: 'May 13, 2026', amount: '840 KWD',   status: 'Pending'    },
  { id: '#BK-0039', guest: 'Khalid Al-Otaibi',  email: 'khalid@example.com', chalet: 'Desert Pearl',    chaletImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400', checkIn: 'May 08, 2026', checkOut: 'May 11, 2026', amount: '960 KWD',   status: 'Completed'  },
  { id: '#BK-0038', guest: 'Fatima Al-Enezi',   email: 'fatima@example.com', chalet: 'Golden Sands',    chaletImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400', checkIn: 'May 06, 2026', checkOut: 'May 09, 2026', amount: '1,530 KWD', status: 'Cancelled'  },
  { id: '#BK-0037', guest: 'Omar Al-Shammari',  email: 'omar@example.com',   chalet: 'Crystal Cove',    chaletImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400', checkIn: 'May 04, 2026', checkOut: 'May 07, 2026', amount: '1,140 KWD', status: 'Confirmed'  },
  { id: '#BK-0036', guest: 'Noura Al-Harbi',    email: 'noura@example.com',  chalet: 'Skyline Retreat', chaletImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400', checkIn: 'May 02, 2026', checkOut: 'May 05, 2026', amount: '1,800 KWD', status: 'Completed'  },
  { id: '#BK-0035', guest: 'Jassim Al-Sabah',   email: 'jassim@example.com', chalet: 'Palm View',       chaletImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 30, 2026', checkOut: 'May 03, 2026', amount: '1,260 KWD', status: 'Confirmed'  },
  { id: '#BK-0034', guest: 'Lulwa Al-Adsani',   email: 'lulwa@example.com',  chalet: 'Ocean Mist',      chaletImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 28, 2026', checkOut: 'May 01, 2026', amount: '1,050 KWD', status: 'Pending'    },
  { id: '#BK-0033', guest: 'Bader Al-Azemi',    email: 'bader@example.com',  chalet: 'Amber Glow',      chaletImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 25, 2026', checkOut: 'Apr 28, 2026', amount: '870 KWD',   status: 'Completed'  },
  { id: '#BK-0032', guest: 'Dalal Al-Khaledi',  email: 'dalal@example.com',  chalet: 'Silver Moon',     chaletImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 22, 2026', checkOut: 'Apr 25, 2026', amount: '1,650 KWD', status: 'Cancelled'  },
  { id: '#BK-0031', guest: 'Turki Al-Amer',     email: 'turki@example.com',  chalet: 'Emerald Isle',    chaletImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 20, 2026', checkOut: 'Apr 23, 2026', amount: '930 KWD',   status: 'Confirmed'  },
  { id: '#BK-0030', guest: 'Hessa Al-Buainain', email: 'hessa@example.com',  chalet: 'Ivory Tower',     chaletImage: 'https://images.unsplash.com/photo-1512915922686-57c11deb9b6b?auto=format&fit=crop&q=80&w=400', checkIn: 'Apr 18, 2026', checkOut: 'Apr 21, 2026', amount: '2,250 KWD', status: 'Completed'  },
];

const itemsPerPage = 10;

const BookingManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allBookings.filter((b) =>
    b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.chalet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      <BookingHeader
        title="Booking Management"
        subtitle="Track and manage all property reservations."
        searchQuery={searchQuery}
        setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
      />
      <BookingTable
        data={paginated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={filtered.length}
        startIndex={startIndex + 1}
        endIndex={Math.min(startIndex + itemsPerPage, filtered.length)}
      />
    </AdminLayout>
  );
};

export default BookingManagement;
