import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = [
    { 
      name: 'Instagram', 
      href: '#',
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.395.283-3.32.1.32-.924.975-1.58 1.93-1.939 1.277-.058 1.688-.072 4.947-.072s3.667.014 4.947.072c1.277.057 2.395.283 3.32.1.32.924.975 1.58 1.93 1.939 1.277.058 1.688.072 4.947.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/></svg>
    },
    { 
      name: 'Facebook', 
      href: '#',
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
    },
    { 
      name: 'Twitter', 
      href: '#',
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    },
  ];

  return (
    <footer className={`relative w-full bg-gold-gradient py-16 overflow-hidden ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Cinematic Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black/5 select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        {t('common.chalets')}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-heading font-[800] text-black uppercase tracking-tighter">
                Chalate
              </h2>
              <p className="text-black/70 text-base leading-relaxed max-w-md font-[500]">
                {t('footer.brandDesc')}
              </p>
            </div>

            <div className="flex items-center gap-6">
              {socialIcons.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ y: -5 }}
                  className="text-black hover:text-white transition-all duration-300"
                  aria-label={item.name}
                >
                  {item.svg}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-base font-work font-[700] text-black uppercase">{t('footer.navTitle')}</h4>
              <ul className="space-y-4">
                {[
                  { key: 'common.home', href: '/' },
                  { key: 'common.chalets', href: '/chalets' },
                  { key: 'common.about', href: '/about' }
                ].map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className={`text-black/60 hover:text-black transition-all text-base font-[500] block ${isRTL ? 'hover:-translate-x-1' : 'hover:translate-x-1'}`}>
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-base font-work font-[700] text-black uppercase">{t('footer.catTitle')}</h4>
              <ul className="space-y-4">
                {[
                  { key: 'home.categories.luxury', href: '#' },
                  { key: 'home.categories.desert', href: '#' },
                  { key: 'home.categories.beach', href: '#' },
                  { key: 'home.categories.resort', href: '#' }
                ].map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className={`text-black/60 hover:text-black transition-all text-base font-[500] block ${isRTL ? 'hover:-translate-x-1' : 'hover:translate-x-1'}`}>
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-base font-work font-[700] text-black uppercase">{t('footer.reachTitle')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-black shrink-0 mt-1" />
                  <span className="text-black/60 text-xs font-[500] leading-relaxed">{t('footer.location')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 text-black shrink-0 ${isRTL ? 'rotate-270' : ''}`} />
                  <span className="text-black/60 text-xs font-[500] dir-ltr">+965 2244 5566</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-black shrink-0" />
                  <span className="text-black/60 text-xs font-[500]">hello@chalate.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line & Back to Top */}
        <div className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
             <p className="text-black/40 text-[10px] font-[600] uppercase tracking-widest">
               &copy; {new Date().getFullYear()} Chalate.co | {t('footer.rights')}
             </p>
             <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-black/40 hover:text-black text-[10px] font-[600] uppercase tracking-widest transition-colors">{t('footer.privacy')}</a>
                <a href="#" className="text-black/40 hover:text-black text-[10px] font-inter font-[600] uppercase tracking-widest transition-colors">{t('footer.terms')}</a>
             </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, scale: 1.1 }}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-gold-400 transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
