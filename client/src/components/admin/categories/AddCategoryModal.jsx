import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    image: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFormData(prev => ({
      ...prev,
      image: URL.createObjectURL(file)
    }));
    
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: null }));
    }
    
    e.target.value = null;
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.image) newErrors.image = 'Category cover image is required';
    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form Submitted successfully:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 pointer-events-auto"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] shadow-[0_30px_70px_rgba(0,0,0,1)] overflow-hidden flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-0.5">
              <h2 className="text-[18px] font-[700] text-gold-500 uppercase tracking-tight">Add New Category</h2>
              <p className="text-[11px] font-[400] text-slate-500">Define a new property classification.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="text-[10px] font-[700] text-gold-500 uppercase tracking-wide flex items-center gap-2">
                <ImageIcon size={12} /> Cover Image <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {formData.image ? (
                  <div className="w-32 h-32 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <label 
                    className={cn(
                      "w-32 h-32 rounded-xl border border-dashed transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group",
                      errors.image ? "border-red-500/50 hover:bg-red-500/5" : "border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5"
                    )}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                    <div className={cn("p-2.5 rounded-full transition-all", errors.image ? "bg-red-500/10" : "bg-white/5 group-hover:bg-gold-500/10")}>
                      <Upload size={18} className={cn(errors.image ? "text-red-500" : "text-slate-600 group-hover:text-gold-500")} />
                    </div>
                    <span className={cn("text-[10px] font-[600] uppercase tracking-wide", errors.image ? "text-red-500" : "text-slate-500 group-hover:text-gold-500")}>
                      Upload
                    </span>
                  </label>
                )}
              </div>
              {errors.image && <p className="text-[10px] text-red-500">{errors.image}</p>}
            </div>

            {/* Basic Info & Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Beachfront Retreats"
                  className={cn(
                    "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all placeholder:text-slate-700",
                    errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                  )}
                />
                {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="w-full bg-[#121212] border-white/5 rounded-lg py-2.5 h-auto text-[13px] font-[400] text-white focus:ring-0 focus:border-gold-500/50 transition-all">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] border-white/10 text-white z-[100000]">
                    <SelectItem value="Active" className="focus:bg-gold-500 focus:text-black">Active</SelectItem>
                    <SelectItem value="Inactive" className="focus:bg-gold-500 focus:text-black">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-inter font-[700] text-gold-500 uppercase tracking-wide">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="What defines properties in this category?"
                className={cn(
                  "w-full bg-white/[0.03] border rounded-lg py-2.5 px-3.5 text-[13px] font-[400] text-white focus:outline-none transition-all resize-none placeholder:text-slate-700",
                  errors.description ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold-500/50"
                )}
              />
              {errors.description && <p className="text-[10px] text-red-500">{errors.description}</p>}
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
              Create Category
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddCategoryModal;
