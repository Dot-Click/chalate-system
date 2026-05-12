import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import AdminLayout from '../../components/admin/AdminLayout';
import ProfileImageCard from '../../components/admin/settings/ProfileImageCard';
import ProfileInfoForm from '../../components/admin/settings/ProfileInfoForm';
import PasswordForm from '../../components/admin/settings/PasswordForm';
import { settingsService } from '../../services/api/settingsService';

const SettingsPage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const data = await settingsService.getProfile();
      setProfile(data);
    } catch (err) {
      toast.error('Failed to load profile data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (formData) => {
    setIsSavingProfile(true);
    try {
      const { profile: updatedProfile } = await settingsService.updateProfile(formData);
      setProfile(updatedProfile);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (formData) => {
    setIsSavingPassword(true);
    try {
      await settingsService.changePassword(formData);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleUploadAvatar = async (file) => {
    setIsUploadingAvatar(true);
    try {
      const { avatarUrl } = await settingsService.uploadAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
      toast.success('Profile picture updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to upload image.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setIsUploadingAvatar(true);
    try {
      await settingsService.removeAvatar();
      setProfile((prev) => ({ ...prev, avatar: null }));
      toast.success('Profile picture removed.');
    } catch (err) {
      toast.error(err.message || 'Failed to remove image.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleToast = ({ type, message }) => {
    if (type === 'success') toast.success(message);
    else toast.error(message);
  };

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gold-500/15 border border-gold-500/20">
              <SettingsIcon size={20} className="text-gold-500" />
            </div>
            <h1 className="text-[28px] font-inter font-black text-gold-500 uppercase tracking-tight">
              Settings
            </h1>
          </div>
          <p className="text-slate-400 text-sm font-inter pl-1 mt-1">
            Manage your account settings, profile information, and security preferences.
          </p>
        </div>
      </motion.header>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-4 xl:col-span-3">
          {isLoading ? (
            <div className="rounded-2xl border border-white/5 bg-[#111111] p-6 animate-pulse h-[300px]" />
          ) : (
            <ProfileImageCard
              avatar={profile?.avatar}
              fullName={profile?.fullName}
              role={profile?.role}
              onUpload={handleUploadAvatar}
              onRemove={handleRemoveAvatar}
              isLoading={isUploadingAvatar}
            />
          )}
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          {isLoading ? (
            <>
              <div className="rounded-2xl border border-white/5 bg-[#111111] p-6 animate-pulse h-[300px]" />
              <div className="rounded-2xl border border-white/5 bg-[#111111] p-6 animate-pulse h-[300px]" />
            </>
          ) : (
            <>
              <ProfileInfoForm
                profile={profile}
                onSave={handleSaveProfile}
                isSaving={isSavingProfile}
                onToast={handleToast}
              />
              <PasswordForm
                onChangePassword={handleChangePassword}
                isSaving={isSavingPassword}
                onToast={handleToast}
              />
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
