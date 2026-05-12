import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { 
  Building2, 
  Search, 
  Plus, 
  Filter,
  Grid3X3,
  List,
  RefreshCw
} from 'lucide-react';

import AdminLayout from '../../components/admin/AdminLayout';
import AmenityCard from '../../components/admin/amenities/AmenityCard';
import AmenityModal from '../../components/admin/amenities/AmenityModal';
import DeleteConfirmDialog from '../../components/admin/amenities/DeleteConfirmDialog';
import AmenitySkeleton from '../../components/admin/amenities/AmenitySkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { amenitiesService } from '../../services/api/amenitiesService';
import { cn } from '@/lib/utils';

const AmenitiesManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // State management
  const [amenities, setAmenities] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Load amenities
  const loadAmenities = async () => {
    try {
      setIsLoading(true);
      const data = await amenitiesService.getAmenities();
      setAmenities(data);
      setFilteredAmenities(data);
    } catch (error) {
      toast.error(error.message || 'Failed to load amenities');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh amenities
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await loadAmenities();
      toast.success('Amenities refreshed successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to refresh amenities');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAmenities(amenities);
    } else {
      const filtered = amenities.filter(amenity =>
        amenity.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAmenities(filtered);
    }
  }, [searchQuery, amenities]);

  // Initial load
  useEffect(() => {
    loadAmenities();
  }, []);

  // Handle create amenity
  const handleCreateAmenity = async (formData) => {
    try {
      setIsSubmitting(true);
      const newAmenity = await amenitiesService.createAmenity(formData);
      setAmenities(prev => [...prev, newAmenity]);
      setIsModalOpen(false);
      toast.success('Amenity created successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to create amenity');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit amenity
  const handleEditAmenity = (amenity) => {
    setSelectedAmenity(amenity);
    setIsModalOpen(true);
  };

  // Handle update amenity
  const handleUpdateAmenity = async (formData) => {
    try {
      setIsSubmitting(true);
      const updatedAmenity = await amenitiesService.updateAmenity(selectedAmenity.id, formData);
      setAmenities(prev => 
        prev.map(a => a.id === selectedAmenity.id ? updatedAmenity : a)
      );
      setIsModalOpen(false);
      setSelectedAmenity(null);
      toast.success('Amenity updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update amenity');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete amenity
  const handleDeleteAmenity = (amenity) => {
    setSelectedAmenity(amenity);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await amenitiesService.deleteAmenity(selectedAmenity.id);
      setAmenities(prev => prev.filter(a => a.id !== selectedAmenity.id));
      setIsDeleteDialogOpen(false);
      setSelectedAmenity(null);
      toast.success('Amenity deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete amenity');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle modal submit
  const handleModalSubmit = (formData) => {
    if (selectedAmenity) {
      handleUpdateAmenity(formData);
    } else {
      handleCreateAmenity(formData);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSelectedAmenity(null);
    }
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setSelectedAmenity(null);
    }
  };

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center">
        <Building2 className="w-10 h-10 text-gold-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No Amenities Found</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        {searchQuery 
          ? `No amenities found matching "${searchQuery}". Try a different search term.`
          : 'Get started by adding your first amenity to the system.'
        }
      </p>
      {!searchQuery && (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Amenity
        </Button>
      )}
    </motion.div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-black text-white mb-2">
              Amenities Management
            </h1>
            <p className="text-slate-400">
              Manage property amenities and facilities
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-white/10 text-slate-300 hover:bg-white/5"
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Amenity
            </Button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400",
              isRTL && "left-auto right-3"
            )} />
            <Input
              type="text"
              placeholder="Search amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500",
                "focus:border-gold-500/50 focus:ring-gold-500/20",
                isRTL && "pl-4 pr-10"
              )}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-white/10 text-slate-300">
              {filteredAmenities.length} {filteredAmenities.length === 1 ? 'Amenity' : 'Amenities'}
            </Badge>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white"
              >
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Amenities Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <AmenitySkeleton key={index} isRTL={isRTL} />
              ))}
            </div>
          ) : filteredAmenities.length === 0 ? (
            // Empty state
            <EmptyState />
          ) : (
            // Amenities grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredAmenities.map((amenity) => (
                  <AmenityCard
                    key={amenity.id}
                    amenity={amenity}
                    onEdit={handleEditAmenity}
                    onDelete={handleDeleteAmenity}
                    isLoading={isSubmitting || isDeleting}
                    isRTL={isRTL}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Modal */}
      <AmenityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        isLoading={isSubmitting}
        amenity={selectedAmenity}
        isRTL={isRTL}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        amenity={selectedAmenity}
        isRTL={isRTL}
      />
    </AdminLayout>
  );
};

export default AmenitiesManagement;
