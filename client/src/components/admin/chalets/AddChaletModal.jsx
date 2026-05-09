import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, DollarSign, List, Image as ImageIcon, Plus, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddChaletModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    country: '',
    address: '',
    description: '',
    weekdayPrice: '',
    weekendPrice: '',
    amenities: [],
    images: [] // Max 6 images
  });

  const [errors, setErrors] = useState({});
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const amenitiesOptions = ['Pool', 'WiFi', 'Beach Access', 'BBQ Area', 'Gym', 'Cinema', 'Garden', 'Jacuzzi', 'Firepit', 'Gaming Console'];

  // Close amenities dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAmenitiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Create object URLs for preview
    const newImages = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => {
      // Only allow up to 6 images total
      const availableSlots = 6 - prev.images.length;
      const imagesToAdd = newImages.slice(0, availableSlots);
      
      return {
        ...prev,
        images: [...prev.images, ...imagesToAdd]
      };
    });
    
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: null }));
    }
    
    // Clear input so same file can be selected again if needed
    e.target.value = null;
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.images.length) newErrors.images = 'At least 1 image is required';
    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.weekdayPrice) newErrors.weekdayPrice = 'Required';
    if (!formData.weekendPrice) newErrors.weekendPrice = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic here
    console.log('Form Submitted successfully:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Root Container with Forced Stacking */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 pointer-events-auto"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-xl max-h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] shadow-[0_30px_70px_rgba(0,0,0,1)] overflow-hidden flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-0.5">
              <h2 className="text-[18px] font-[700] text-gold-500 uppercase tracking-tight">Add New Chalet</h2>
              <p className="text-[11px] font-[400] text-slate-500">Fill in the property details below.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="text-[10px] font-[700] text-gold-500 uppercase tracking-wide flex items-center gap-2">
                <ImageIcon size={12} /> Property Images ({formData.images.length}/6) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="aspect-square rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 6 && (
                  <label 
                    className={cn(
                      "aspect-square rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group",
                      errors.images ? "border-red-500/50 hover:bg-red-500/5" : "border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5"
                    )}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                    <div className={cn("p-2 rounded-full transition-all", errors.images ? "bg-red-500/10" : "bg-white/5 group-hover:bg-gold-500/10")}>
                      <Plus size={16} className={cn(errors.images ? "text-red-500" : "text-slate-600 group-hover:text-gold-500")} />
                    </div>
                    <span className={cn("text-[9px] font-[600] uppercase", errors.images ? "text-red-500" : "text-slate-500 group-hover:text-gold-500")}>
                      {formData.images.length === 0 ? 'Upload' : 'Add More'}
                    </span>
                  </label>
                )}
              </div>
              {errors.images && <p className="text-[10px] text-red-500">{errors.images}</p>}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Royal Oasis Villa"
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all placeholder:text-slate-700",
                    errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )}
                />
                {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger className={cn(
                    "w-full bg-[#121212] rounded-lg py-2.5 h-auto text-[13px] font-[400] text-white focus:ring-0 transition-all",
                    errors.category ? "border border-red-500/50" : "border-white/5 focus:border-gold-500/50"
                  )}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] border-white/10 text-white z-[100000]">
                    <SelectItem value="luxury" className="focus:bg-gold-500 focus:text-black">Luxury</SelectItem>
                    <SelectItem value="modern" className="focus:bg-gold-500 focus:text-black">Modern</SelectItem>
                    <SelectItem value="beachfront" className="focus:bg-gold-500 focus:text-black">Beachfront</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-[10px] text-red-500">{errors.category}</p>}
              </div>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  City <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="e.g. Kuwait City"
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all placeholder:text-slate-700",
                    errors.city ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )}
                />
                {errors.city && <p className="text-[10px] text-red-500">{errors.city}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  Country <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="e.g. Kuwait"
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all placeholder:text-slate-700",
                    errors.country ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )}
                />
                {errors.country && <p className="text-[10px] text-red-500">{errors.country}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={2}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Full property address..."
                className={cn(
                  "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all resize-none placeholder:text-slate-700",
                  errors.address ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                )}
              />
              {errors.address && <p className="text-[10px] text-red-500">{errors.address}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={2}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief property description..."
                className={cn(
                  "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all resize-none placeholder:text-slate-700",
                  errors.description ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                )}
              />
              {errors.description && <p className="text-[10px] text-red-500">{errors.description}</p>}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                  <DollarSign size={10} className="text-gold-500 shrink-0" /> Weekday (Mon-Thu) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.weekdayPrice}
                  onChange={(e) => handleChange('weekdayPrice', e.target.value)}
                  placeholder="KWD" 
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[700] text-gold-500 focus:outline-none transition-all",
                    errors.weekdayPrice ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )} 
                />
                {errors.weekdayPrice && <p className="text-[10px] text-red-500">{errors.weekdayPrice}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                  <DollarSign size={10} className="text-gold-500 shrink-0" /> Weekend (Fri-Sun) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.weekendPrice}
                  onChange={(e) => handleChange('weekendPrice', e.target.value)}
                  placeholder="KWD" 
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[700] text-gold-500 focus:outline-none transition-all",
                    errors.weekendPrice ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )} 
                />
                {errors.weekendPrice && <p className="text-[10px] text-red-500">{errors.weekendPrice}</p>}
              </div>
            </div>

            {/* Amenities - Custom Multi Select */}
            <div className="space-y-1.5 relative" ref={dropdownRef}>
              <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide flex items-center gap-2">
                <List size={12} className="text-gold-500" /> Amenities
              </label>
              
              <div className="relative">
                <div 
                  onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                  className="w-full min-h-[42px] bg-[#121212] border border-white/5 rounded-lg py-2 px-3 flex items-center justify-between cursor-pointer focus:ring-0 focus:border-gold-500/50 transition-all"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {formData.amenities.length > 0 ? (
                      formData.amenities.map(item => (
                        <span key={item} className="bg-gold-500/10 border border-gold-500/30 text-gold-500 text-[10px] font-[600] px-2 py-1 rounded-md flex items-center gap-1.5">
                          {item}
                          <X size={10} className="cursor-pointer hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); toggleAmenity(item); }} />
                        </span>
                      ))
                    ) : (
                      <span className="text-[13px] font-[400] text-slate-500 mt-0.5">Select amenities...</span>
                    )}
                  </div>
                  <ChevronDown size={14} className="text-slate-500 opacity-50 ml-2 shrink-0" />
                </div>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {isAmenitiesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-1.5 bg-[#121212] border border-white/10 rounded-md shadow-2xl z-[100000] max-h-48 overflow-y-auto custom-scrollbar p-1"
                    >
                      {amenitiesOptions.map(option => {
                        const isSelected = formData.amenities.includes(option);
                        return (
                          <div 
                            key={option}
                            onClick={() => toggleAmenity(option)}
                            className={cn(
                              "flex items-center justify-between px-3 py-2 text-[13px] rounded-sm cursor-pointer transition-colors",
                              isSelected ? "bg-gold-500/10 text-gold-500 font-[500]" : "text-slate-300 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            <span>{option}</span>
                            {isSelected && <Check size={14} className="text-gold-500" />}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-[12px] font-[600] text-slate-500 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gold-500 text-black font-[700] text-[12px] uppercase rounded-lg hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/10 cursor-pointer"
            >
              Create Property
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddChaletModal;

