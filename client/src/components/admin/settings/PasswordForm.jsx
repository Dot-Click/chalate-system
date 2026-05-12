import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';

// Password strength checker
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score === 4) return { score, label: 'Strong', color: 'bg-blue-500' };
  return { score, label: 'Very Strong', color: 'bg-emerald-500' };
};

const REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];

const PasswordField = ({ label, value, onChange, placeholder, showToggle = true }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5">
        <Lock size={11} className="text-slate-500" />
        {label}
      </Label>
      <div className="relative">
        <Input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '••••••••'}
          className="pr-10"
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

const PasswordForm = ({ onChangePassword, isSaving, onToast }) => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(form.newPassword);

  const setField = (field) => (value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = 'Current password is required.';
    if (!form.newPassword) e.newPassword = 'New password is required.';
    else if (form.newPassword.length < 8) e.newPassword = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(form.newPassword)) e.newPassword = 'Must contain at least one uppercase letter.';
    else if (!/[0-9]/.test(form.newPassword)) e.newPassword = 'Must contain at least one number.';
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await onChangePassword(form);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      onToast({ type: 'success', message: 'Password changed successfully! 🔐' });
    } catch (err) {
      onToast({ type: 'error', message: err.message || 'Failed to change password.' });
    }
  };

  const passwordsMatch = form.confirmPassword && form.newPassword === form.confirmPassword;
  const passwordsMismatch = form.confirmPassword && form.newPassword !== form.confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-white/8 bg-[#111111] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20">
            <ShieldCheck size={16} className="text-gold-400" />
          </div>
          <div>
            <h2 className="text-white font-inter font-semibold text-[15px]">Change Password</h2>
            <p className="text-slate-500 text-xs mt-0.5">Ensure your account uses a strong, unique password.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Current Password */}
        <div>
          <PasswordField
            label="Current Password"
            value={form.currentPassword}
            onChange={setField('currentPassword')}
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-red-400">⚠ {errors.currentPassword}</p>
          )}
          <p className="mt-1.5 text-[11px] text-slate-600">
            (Hint: for testing use <code className="text-slate-500">Admin@123</code>)
          </p>
        </div>

        {/* New Password */}
        <div>
          <PasswordField
            label="New Password"
            value={form.newPassword}
            onChange={setField('newPassword')}
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="mt-1.5 text-xs text-red-400">⚠ {errors.newPassword}</p>
          )}

          {/* Strength Bar */}
          {form.newPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-work uppercase tracking-wider">Strength</span>
                <span className={`text-[10px] font-semibold ${
                  strength.label === 'Weak' ? 'text-red-400' :
                  strength.label === 'Fair' ? 'text-amber-400' :
                  strength.label === 'Strong' ? 'text-blue-400' : 'text-emerald-400'
                }`}>{strength.label}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= strength.score ? strength.color : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Requirements checklist */}
              <div className="space-y-1 pt-1">
                {REQUIREMENTS.map(({ label, test }) => {
                  const passed = test(form.newPassword);
                  return (
                    <div key={label} className="flex items-center gap-2">
                      {passed
                        ? <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" />
                        : <XCircle size={11} className="text-slate-600 flex-shrink-0" />
                      }
                      <span className={`text-[11px] ${passed ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Lock size={11} className="text-slate-500" />
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setField('confirmPassword')(e.target.value)}
                placeholder="Re-enter new password"
                className={`pr-10 ${
                  passwordsMismatch ? 'border-red-500/50 focus:ring-red-500/30' :
                  passwordsMatch ? 'border-emerald-500/50 focus:ring-emerald-500/30' : ''
                }`}
              />
              {passwordsMatch && (
                <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" />
              )}
              {passwordsMismatch && (
                <XCircle size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400">⚠ {errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold
                       bg-gold-500 hover:bg-gold-400 text-black transition-all
                       shadow-lg shadow-gold-500/20 disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Changing Password...
              </>
            ) : (
              <>
                <ShieldCheck size={15} />
                Change Password
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PasswordForm;
