import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, AtSign, ShieldCheck, Save, Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

const FormField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-1.5">
      {Icon && <Icon size={11} className="text-slate-500" />}
      {label}
    </Label>
    {children}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
);

const ProfileInfoForm = ({ profile, onSave, isSaving, onToast }) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await onSave(form);
      setIsDirty(false);
      onToast({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      onToast({ type: 'error', message: err.message || 'Failed to update profile.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-white/8 bg-[#111111] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <User size={16} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-inter font-semibold text-[15px]">Profile Information</h2>
            <p className="text-slate-500 text-xs mt-0.5">Update your personal details and public profile.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Name */}
        <FormField label="Full Name" icon={User} error={errors.fullName}>
          <Input
            value={form.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
            placeholder="Mohammed Al-Admin"
            className={errors.fullName ? 'border-red-500/50 focus:ring-red-500/30' : ''}
          />
        </FormField>

        {/* Phone */}
        <FormField label="Phone Number" icon={Phone} error={errors.phone}>
          <Input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+966 50 123 4567"
          />
        </FormField>

        {/* Divider */}
        <Separator />

        {/* Email — Read Only Section */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <AtSign size={11} className="text-slate-500" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              value={profile?.email || ''}
              readOnly
              disabled
              className="pr-28 opacity-60 cursor-not-allowed bg-white/3"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" />
              <Badge variant="success" className="text-[9px] px-2 py-0.5">Verified</Badge>
            </div>
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            <span>ℹ</span> Email address cannot be changed for security reasons.
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {isDirty && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-amber-400 font-work"
            >
              ● Unsaved changes
            </motion.p>
          )}
          <Button
            type="submit"
            disabled={isSaving || !isDirty}
            className={`ml-auto flex items-center gap-2 rounded-xl font-semibold px-6 transition-all ${
              isDirty
                ? 'bg-gold-500 hover:bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                : 'bg-white/5 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={15} />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileInfoForm;
