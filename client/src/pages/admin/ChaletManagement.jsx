import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '../../components/admin/AdminLayout';
import ChaletHeader from '../../components/admin/chalets/ChaletHeader';
import ChaletTable from '../../components/admin/chalets/ChaletTable';
import AddChaletModal from '../../components/admin/chalets/AddChaletModal';

const ChaletManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Expanded Mock data for chalets (20 items)
  const allChalets = [
    { id: 1, name: 'Royal Oasis', category: 'Luxury', location: 'Al Khiran', price: '450 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1580587767503-36873587b5cd?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Desert Pearl', category: 'Modern', location: 'Subiyah', price: '320 KWD', status: 'Active', availability: 'Booked', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Azure Beach', category: 'Beachfront', location: 'Bnaider', price: '280 KWD', status: 'Inactive', availability: 'Available', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Golden Sands', category: 'Luxury', location: 'Mina Abdulla', price: '510 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Crystal Cove', category: 'Beachfront', location: 'Al Khiran', price: '380 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Skyline Retreat', category: 'Modern', location: 'Kuwait City', price: '600 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400' },
    { id: 7, name: 'Palm View', category: 'Luxury', location: 'Bnaider', price: '420 KWD', status: 'Inactive', availability: 'Booked', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400' },
    { id: 8, name: 'Ocean Mist', category: 'Beachfront', location: 'Subiyah', price: '350 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400' },
    { id: 9, name: 'Amber Glow', category: 'Modern', location: 'Al Khiran', price: '290 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400' },
    { id: 10, name: 'Silver Moon', category: 'Luxury', location: 'Mina Abdulla', price: '550 KWD', status: 'Active', availability: 'Booked', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400' },
    { id: 11, name: 'Emerald Isle', category: 'Beachfront', location: 'Subiyah', price: '310 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400' },
    { id: 12, name: 'Ivory Tower', category: 'Modern', location: 'Kuwait City', price: '750 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1512915922686-57c11deb9b6b?auto=format&fit=crop&q=80&w=400' },
    { id: 13, name: 'Coral Reef', category: 'Beachfront', location: 'Al Khiran', price: '330 KWD', status: 'Inactive', availability: 'Available', image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=400' },
    { id: 14, name: 'Sunset Villa', category: 'Luxury', location: 'Bnaider', price: '480 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1449156006006-08147959e7b5?auto=format&fit=crop&q=80&w=400' },
    { id: 15, name: 'Marble Arch', category: 'Modern', location: 'Kuwait City', price: '520 KWD', status: 'Active', availability: 'Booked', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400' },
    { id: 16, name: 'Zen Garden', category: 'Luxury', location: 'Al Khiran', price: '400 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400' },
    { id: 17, name: 'Pearl Wharf', category: 'Beachfront', location: 'Subiyah', price: '370 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400' },
    { id: 18, name: 'Sapphire Shores', category: 'Luxury', location: 'Bnaider', price: '590 KWD', status: 'Inactive', availability: 'Available', image: 'https://images.unsplash.com/photo-1512915922686-57c11deb9b6b?auto=format&fit=crop&q=80&w=400' },
    { id: 19, name: 'Onyx Point', category: 'Modern', location: 'Al Khiran', price: '410 KWD', status: 'Active', availability: 'Booked', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400' },
    { id: 20, name: 'Diamond Edge', category: 'Luxury', location: 'Mina Abdulla', price: '650 KWD', status: 'Active', availability: 'Available', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400' },
  ];

  // Search & Pagination logic
  const filteredChalets = allChalets.filter(chalet => 
    chalet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chalet.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chalet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredChalets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChalets = filteredChalets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      {/* Header & Search Component */}
      <ChaletHeader 
        title="Chalet Management" 
        subtitle="Manage your luxury properties and their status."
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        onAddClick={() => setIsModalOpen(true)}
      />

      {/* Main Data Table Component */}
      <ChaletTable 
        data={paginatedChalets} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={filteredChalets.length}
        startIndex={startIndex + 1}
        endIndex={Math.min(startIndex + itemsPerPage, filteredChalets.length)}
      />

      {/* Add Chalet Modal */}
      <AddChaletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AdminLayout>
  );
};

export default ChaletManagement;
