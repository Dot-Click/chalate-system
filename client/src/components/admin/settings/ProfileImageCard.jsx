import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Upload, User, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../ui/badge';

const ProfileImageCard = ({ avatar, fullName, role, onUpload, onRemove, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(avatar || null);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(async (file) => {
    if (!file) return;
    // Show immediate preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
    // Upload
    await onUpload(file);
  }, [onUpload]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  }, [handleFileChange]);

  const handleRemove = async () => {
    setPreviewUrl(null);
    await onRemove();
  };

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/8 bg-[#111111] p-6 flex flex-col items-center gap-5"
    >
      {/* Avatar + Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative group cursor-pointer transition-all duration-300 ${
          isDragging ? 'scale-105' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Avatar Circle */}
        <div className={`w-28 h-28 rounded-full overflow-hidden border-2 transition-all duration-300 ${
          isDragging
            ? 'border-gold-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]'
            : 'border-white/10 group-hover:border-gold-500/50'
        }`}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold-600/30 to-gold-500/10 flex items-center justify-center">
              <span className="text-3xl font-black text-gold-400 font-inter">{initials}</span>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={22} className="text-white" />
        </div>

        {/* Online indicator */}
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#111111]" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />

      {/* Name & Role */}
      <div className="text-center space-y-1">
        <h3 className="text-white font-inter font-bold text-lg">{fullName || 'Admin User'}</h3>
        <div className="flex items-center gap-2 justify-center">
          <Badge variant="default" className="text-[10px] px-2.5 py-0.5">
            {role || 'Super Admin'}
          </Badge>
        </div>
      </div>

      {/* Drop Zone Hint */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-4 rounded-2xl border-2 border-dashed border-gold-500/60 bg-gold-500/5 flex items-center justify-center pointer-events-none"
          >
            <p className="text-gold-400 text-sm font-work">Drop image here</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload / Remove Buttons */}
      <div className="w-full space-y-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl 
                     border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-work
                     hover:bg-gold-500/20 hover:border-gold-500/50 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={14} />
          {isLoading ? 'Uploading...' : 'Upload Photo'}
        </button>

        {previewUrl && (
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                       border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-work
                       hover:bg-red-500/10 hover:border-red-500/30 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={14} />
            Remove Photo
          </button>
        )}
      </div>

      {/* Hint text */}
      <p className="text-xs text-slate-600 text-center leading-relaxed">
        JPG, PNG or WebP. Max 5MB.<br />Drag & drop or click to upload.
      </p>
    </motion.div>
  );
};

export default ProfileImageCard;
