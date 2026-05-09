import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('common.home'), path: '/' },
    { name: t('common.chalets'), path: '/chalets' },
    { name: t('common.about'), path: '/about' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
      isRTL ? "font-arabic" : "font-inter"
    )}>
      {/* Top Golden Bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-[#b45309]" />

      <nav 
        dir={isRTL ? 'rtl' : 'ltr'}
        className={cn(
          "transition-all duration-500 px-6 md:px-12 py-6",
          isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
          
          {/* Column 1: Logo */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-gold-400 transition-colors uppercase">
                CHALET<span className="text-gold-500">.</span>
              </span>
            </Link>
          </div>

          {/* Column 2: Desktop Nav Links */}
          <div className="hidden md:flex justify-center items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-[13px] font-bold transition-all relative group tracking-widest uppercase",
                    isActive ? "text-gold-400" : "text-white/90 hover:text-gold-400"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full",
                    isActive ? "w-full" : "w-0",
                    isRTL ? "right-0" : "left-0"
                  )} />
                </Link>
              );
            })}
          </div>

          {/* Column 3: Right Side Actions */}
          <div className={`hidden md:flex items-center gap-6 ${isRTL ? 'justify-start' : 'justify-end'}`}>
            <LanguageSwitcher />
            <Button 
              variant="gold" 
              className="font-black tracking-widest px-8 py-3 rounded-full hover:scale-105 transition-all uppercase text-[11px] shadow-xl shadow-gold-900/40"
            >
              {t('common.bookNow')}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className={`flex md:hidden ${isRTL ? 'justify-start' : 'justify-end'}`}>
            <button 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu className={isRTL ? 'rotate-180' : ''} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/98 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-xl font-bold",
                    isActive ? "text-gold-400" : "text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
              <LanguageSwitcher />
              <Button variant="gold" size="lg" className="w-full">
                {t('common.bookNow')}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
