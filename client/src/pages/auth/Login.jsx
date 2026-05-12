import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Building,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { sanitizeErrorMessage } from '@/lib/sanitizer';
import { loginUser, initializeAuth } from '@/redux/features/auth/auth.actions';
import { clearError } from '@/redux/features/auth/auth.reducer';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const isRTL = i18n.language === 'ar';

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState('');

  // Initialize auth from localStorage
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated && isMounted) {
      navigate('/admin');
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, navigate]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(sanitizeErrorMessage(error));
    }
  }, [error]);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.password]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(clearError());

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      toast.success('Login successful! Welcome back.');
      navigate('/admin');
    } else if (loginUser.rejected.match(result)) {
      toast.error(sanitizeErrorMessage(result.payload) || 'Login failed. Please try again.');
    }
  }, [validateForm, dispatch, formData, navigate]);

  // Handle input changes
  const handleInputChange = useCallback((field) => (event) => {
    // Handle checkbox (boolean) and text inputs
    let finalValue;
    if (typeof event === 'boolean') {
      finalValue = event;
    } else if (event?.target) {
      if (event.target.type === 'checkbox') {
        finalValue = event.target.checked;
      } else {
        finalValue = event.target.value;
      }
    } else {
      finalValue = event;
    }

    setFormData(prev => ({ ...prev, [field]: finalValue }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Handle focus states
  const handleFocus = useCallback((field) => () => setIsFocused(field), []);
  const handleBlur = useCallback(() => setIsFocused(''), []);

  // Background animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex",
      isRTL && "font-arabic"
    )} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large golden orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gold-600/20 to-gold-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gold-500/15 to-amber-600/10 rounded-full blur-3xl animate-pulse" />

        {/* Medium golden accents */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gold-500/12 to-yellow-600/8 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-gold-600/8 rounded-full blur-2xl animate-pulse" />

        {/* Central golden glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-gold-400/8 via-amber-500/6 to-gold-600/4 rounded-full blur-3xl animate-pulse" />

        {/* Subtle golden particles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold-500/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-32 right-32 w-24 h-24 bg-amber-500/4 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-yellow-600/3 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-400/4 rounded-full blur-2xl animate-pulse" />

        {/* Golden gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold-900/10 via-transparent to-gold-900/5 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full">

        {/* Left Side - Illustration/Branding */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-lg text-center space-y-8"
          >
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/30">
                <Building className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-gold-400" />
              </div>
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-black text-white font-work leading-tight"
            >
              CHALET<span className="text-gold-500">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-300 font-inter leading-relaxed"
            >
              Premium Chalet Management System
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-slate-400"
            >
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-5 h-5 text-gold-400" />
                <span className="font-inter">Secure Admin Dashboard</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Building className="w-5 h-5 text-gold-400" />
                <span className="font-inter">Property Management</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex items-center justify-center p-8 lg:p-12"
        >
          <motion.div
            variants={itemVariants}
            className="w-full max-w-md"
          >
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardContent className="p-8 space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-white font-work">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 font-inter">
                    Sign in to your admin dashboard
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-inter font-medium text-slate-300">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail
                        className={cn(
                          "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                          isFocused === 'email' || formData.email ? "text-gold-400" : "text-slate-500"
                        )}
                        aria-hidden="true"
                      />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        onFocus={handleFocus('email')}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        aria-label="Email address"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-required="true"
                        className={cn(
                          "pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500",
                          "focus:border-gold-500/50 focus:ring-gold-500/20",
                          errors.email && "border-red-500/50 focus:border-red-500/50",
                          isRTL && "pl-4 pr-10"
                        )}
                        disabled={loading}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 font-inter"
                        role="alert"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-inter font-medium text-slate-300">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock
                        className={cn(
                          "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                          isFocused === 'password' || formData.password ? "text-gold-400" : "text-slate-500"
                        )}
                        aria-hidden="true"
                      />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        onFocus={handleFocus('password')}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        aria-label="Password"
                        aria-describedby={errors.password ? "password-error" : undefined}
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-required="true"
                        className={cn(
                          "pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500",
                          "focus:border-gold-500/50 focus:ring-gold-500/20",
                          errors.password && "border-red-500/50 focus:border-red-500/50",
                          isRTL && "pl-10 pr-4"
                        )}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                          showPassword ? "text-gold-400" : "text-slate-500 hover:text-gold-400",
                          isRTL && "right-auto left-3"
                        )}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        id="password-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 font-inter"
                        role="alert"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={handleInputChange('rememberMe')}
                        disabled={loading}
                        aria-label="Remember me"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-inter text-slate-300 cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm font-inter text-gold-400 hover:text-gold-300 transition-colors duration-200"
                      aria-label="Forgot password"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    aria-label={loading ? "Signing in, please wait" : "Sign in to your account"}
                    className={cn(
                      "w-full bg-gold-500 hover:bg-gold-600 text-black font-inter font-medium py-3",
                      "shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40",
                      "transition-all duration-200 active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-400 text-sm font-inter"
                    role="alert"
                    aria-live="polite"
                  >
                    {sanitizeErrorMessage(error)}
                  </motion.div>
                )}

              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
