import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Crown, 
  Heart, 
  Gem, 
  Star, 
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '../../components/user/Footer';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // AI Generated Image Path
  const mainImage = "/about_hero.png";

  return (
    <div className={`min-h-screen bg-[#050505] flex flex-col ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Unified Luxury Gold Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,rgba(0,0,0)_70%)] blur-[100px]" />
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-gold-950/10 blur-[150px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-gold-900/5 blur-[150px] rounded-full opacity-40" />
      </div>

      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
          
          {/* Main About Layout - Inspired by Image Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-40">
            
            {/* Left Column: The Narrative */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10 lg:pt-10"
            >
              <div className="space-y-4">
                <span className="text-[13px] font-[600] text-gold-500 uppercase tracking-[0.3em] font-work">
                   {isRTL ? 'كيف بدأنا' : 'How it Started'}
                </span>
                <h1 className="text-4xl md:text-6xl font-work font-[700] text-white uppercase leading-[1.1] tracking-tight">
                   {t('about.heroTitle')}
                </h1>
              </div>

              <div className="space-y-8">
                 <p className="text-slate-400 text-lg font-[300] font-inter leading-relaxed max-w-xl">
                    {t('about.storyText')}
                 </p>
                 <p className="text-slate-500 text-base font-[300] font-inter leading-relaxed max-w-xl">
                    {t('about.heroSubtitle')}
                 </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                 {[
                   { icon: <CheckCircle2 className="w-4 h-4" />, text: "Exclusive Portfolio" },
                   { icon: <CheckCircle2 className="w-4 h-4" />, text: "Verified Properties" },
                   { icon: <CheckCircle2 className="w-4 h-4" />, text: "24/7 Concierge" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-[500] text-slate-300 uppercase tracking-widest">
                      <span className="text-gold-500">{item.icon}</span>
                      {item.text}
                   </div>
                 ))}
              </div>
            </motion.div>

            {/* Right Column: Visuals & Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* AI Generated Hero Image */}
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group">
                 <img 
                   src={mainImage} 
                   alt="Luxury Brand Story" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
              </div>

              {/* Stats Grid - 2x2 Matching Image Structure */}
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { value: "8.5", label: "Years Experience", suffix: "" },
                   { value: "250", label: "Luxury Projects", suffix: "+" },
                   { value: "1.2k", label: "Happy Clients", suffix: "+" },
                   { value: "100", label: "Trusted Partners", suffix: "%" }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-2 hover:bg-gold-500/5 transition-all group">
                      <div className="text-3xl font-work font-[700] text-gold-gradient group-hover:scale-110 transition-transform origin-left">
                         {stat.value}{stat.suffix}
                      </div>
                      <div className="text-[11px] font-[600] text-slate-500 uppercase tracking-[0.2em]">
                         {stat.label}
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision Section */}
          <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-12 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                   <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-work font-[700] text-white uppercase tracking-tight">{t('about.missionTitle')}</h3>
                <p className="text-slate-400 font-[300] leading-relaxed">{t('about.missionText')}</p>
             </div>
             <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-12 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                   <Gem className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-work font-[700] text-white uppercase tracking-tight">{t('about.visionTitle')}</h3>
                <p className="text-slate-400 font-[300] leading-relaxed">{t('about.visionText')}</p>
             </div>
          </section>

          {/* CTA Section */}
          <section className="relative">
             <div className="bg-gold-500 rounded-[4rem] p-12 md:p-24 text-center space-y-10 overflow-hidden shadow-2xl shadow-gold-500/30">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
                <h2 className="text-4xl md:text-6xl font-work font-[800] text-black uppercase tracking-tight relative z-10 leading-tight">
                   {t('about.ctaTitle')}
                </h2>
                <Link to="/chalets" className="inline-block relative z-10">
                   <Button className="bg-black text-gold-500 hover:bg-slate-900 px-12 py-8 rounded-2xl text-base font-[700] uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl">
                      {t('about.ctaBtn')}
                      <ArrowRight className={`w-5 h-5 ml-4 ${isRTL ? 'rotate-180' : ''}`} />
                   </Button>
                </Link>
             </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
