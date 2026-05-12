// Settings API Service — mock implementation
// Replace with real API calls (axios/fetch) in production

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

// Mock admin profile data
let MOCK_PROFILE = {
  id: 'admin-001',
  fullName: 'Mohammed Al-Admin',
  username: 'm.aladmin',
  email: 'admin@chaletsystem.sa',
  phone: '+966 50 123 4567',
  avatar: null,
  role: 'Super Admin',
  createdAt: '2024-01-15',
  emailVerified: true,
};

export const settingsService = {
  // Get current admin profile
  async getProfile() {
    await delay(500);
    return { ...MOCK_PROFILE };
  },

  // Update profile info
  async updateProfile({ fullName, phone }) {
    await delay(700);
    // Simulate server-side validation
    if (!fullName?.trim()) throw new Error('Full name is required.');

    MOCK_PROFILE = { ...MOCK_PROFILE, fullName, phone };
    return { success: true, profile: { ...MOCK_PROFILE } };
  },

  // Upload profile image
  async uploadAvatar(file) {
    await delay(900);
    if (!file) throw new Error('No file provided.');
    if (file.size > 5 * 1024 * 1024) throw new Error('File too large. Max 5MB allowed.');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Invalid file type. Use JPG, PNG, or WebP.');
    }
    // In real app: upload to S3/Cloudinary, get back URL
    const avatarUrl = URL.createObjectURL(file);
    MOCK_PROFILE = { ...MOCK_PROFILE, avatar: avatarUrl };
    return { success: true, avatarUrl };
  },

  // Remove avatar
  async removeAvatar() {
    await delay(400);
    MOCK_PROFILE = { ...MOCK_PROFILE, avatar: null };
    return { success: true };
  },

  // Change password
  async changePassword({ currentPassword, newPassword, confirmPassword }) {
    await delay(800);
    if (!currentPassword) throw new Error('Current password is required.');
    if (!newPassword) throw new Error('New password is required.');
    if (newPassword.length < 8) throw new Error('Password must be at least 8 characters.');
    if (!/[A-Z]/.test(newPassword)) throw new Error('Password must contain at least one uppercase letter.');
    if (!/[0-9]/.test(newPassword)) throw new Error('Password must contain at least one number.');
    if (newPassword !== confirmPassword) throw new Error('Passwords do not match.');
    if (currentPassword !== 'Admin@123') {
      // Mock: correct current password is 'Admin@123'
      throw new Error('Current password is incorrect.');
    }
    return { success: true, message: 'Password changed successfully.' };
  },
};
