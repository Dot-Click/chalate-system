import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20">
      {/* Background with cinematic zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/assets/images/hero.png" 
          alt="Luxury Chalet" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-20">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gold-400 font-bold uppercase text-[10px] md:text-xs mb-4 block drop-shadow-lg"
          >
            {t('home.heroOverline') || "Experience Ultimate Luxury"}
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-[1.1] mb-10 drop-shadow-2xl max-w-5xl mx-auto uppercase">
            <span className="block mb-2 tracking-tight">{t('home.heroTitlePart1')}</span>
            <span className="text-gold-gradient block tracking-[0.05em] font-black">
              {t('home.heroTitlePart2')}
            </span>
          </h1>
          
          <p className="text-slate-200 text-base md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light drop-shadow-xl opacity-90">
            {t('home.heroSubtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="gold" size="xl" className="font-black shadow-2xl shadow-gold-950/50 hover:scale-105 transition-all duration-300 px-12">
              {t('home.exploreBtn')}
            </Button>
            <Button variant="outline" size="xl" className="backdrop-blur-xl shadow-sm border-white/20 hover:bg-white/10 transition-all duration-300 px-12">
              {t('common.bookNow')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
