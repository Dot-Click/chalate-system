import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const AmenityModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false,
  amenity = null, // null for create, amenity object for edit
  isRTL = false 
}) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or amenity changes
  useEffect(() => {
    if (isOpen) {
      if (amenity) {
        // Edit mode - populate with existing data
        setFormData({ name: amenity.name });
      } else {
        // Create mode - reset form
        setFormData({ name: '' });
      }
      setErrors({});
    }
  }, [isOpen, amenity]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Amenity name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Amenity name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Amenity name must be less than 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      name: formData.name.trim()
    });
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className={cn(
                "flex items-center gap-3 text-xl font-semibold",
                isRTL && "flex-row-reverse"
              )}>
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gold-500" />
                </div>
                {amenity ? 'Edit Amenity' : 'Add New Amenity'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amenity Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-inter font-medium text-slate-300">
                  Amenity Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="e.g., WiFi, Swimming Pool, BBQ Area"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-slate-500",
                    "focus:border-gold-500/50 focus:ring-gold-500/20",
                    errors.name && "border-red-500/50 focus:border-red-500/50"
                  )}
                  disabled={isLoading}
                  maxLength={50}
                />
                {errors.name && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    {errors.name}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  {formData.name.length}/50 characters
                </p>
              </div>

              
              {/* Action Buttons */}
              <div className={cn(
                "flex gap-3 pt-4",
                isRTL && "flex-row-reverse"
              )}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 border-white/10 text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "flex-1 bg-gold-500 hover:bg-gold-600 text-black font-medium",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      {amenity ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    amenity ? 'Update Amenity' : 'Create Amenity'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AmenityModal;
