import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '../../components/admin/AdminLayout';
import CategoryHeader from '../../components/admin/categories/CategoryHeader';
import CategoryTable from '../../components/admin/categories/CategoryTable';
import AddCategoryModal from '../../components/admin/categories/AddCategoryModal';

const CategoryManagement = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock data for categories
  const allCategories = [
    { id: 1, name: 'Luxury Villas', description: 'Premium properties with high-end amenities and exquisite designs.', propertyCount: 12, status: 'Active', image: 'https://images.unsplash.com/photo-1580587767503-36873587b5cd?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Beachfront Retreats', description: 'Stunning chalets located right on the shoreline with ocean views.', propertyCount: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Modern Escapes', description: 'Contemporary architecture with minimalist interiors.', propertyCount: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Desert Oasis', description: 'Unique properties offering an exclusive desert experience.', propertyCount: 4, status: 'Inactive', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Family Resorts', description: 'Spacious chalets perfect for large family gatherings and events.', propertyCount: 10, status: 'Active', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400' },
  ];

  // Search & Pagination logic
  const filteredCategories = allCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      {/* Header & Search Component */}
      <CategoryHeader 
        title="Category Management" 
        subtitle="Manage property classifications and their status."
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          setCurrentPage(1); // Reset to page 1 on search
        }}
        onAddClick={() => setIsModalOpen(true)}
      />

      {/* Main Data Table Component */}
      <CategoryTable 
        data={paginatedCategories} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={filteredCategories.length}
        startIndex={startIndex + 1}
        endIndex={Math.min(startIndex + itemsPerPage, filteredCategories.length)}
      />

      {/* Add Category Modal */}
      <AddCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AdminLayout>
  );
};

export default CategoryManagement;
