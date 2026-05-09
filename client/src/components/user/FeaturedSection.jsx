import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import ChaletCard from './ChaletCard';

const FeaturedSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const categories = [
    t('home.featured.all'),
    t('home.categories.resort'),
    t('home.categories.luxury'),
    t('home.categories.desert'),
    t('home.categories.beach'),
    t('home.categories.pool')
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const chalets = [
    {
      id: 1,
      title: t('home.featured.chalets.oasis.title'),
      location: t('home.featured.chalets.oasis.location'),
      price: "250",
      rating: "4.9",
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.resort')
    },
    {
      id: 2,
      title: t('home.featured.chalets.pearl.title'),
      location: t('home.featured.chalets.pearl.location'),
      price: "180",
      rating: "4.8",
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.desert')
    },
    {
      id: 3,
      title: t('home.featured.chalets.azure.title'),
      location: t('home.featured.chalets.azure.location'),
      price: "320",
      rating: "5.0",
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.beach')
    },
    {
      id: 4,
      title: t('home.featured.chalets.palace.title'),
      location: t('home.featured.chalets.palace.location'),
      price: "210",
      rating: "4.7",
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.luxury')
    },
    {
      id: 5,
      title: t('home.featured.chalets.lagoon.title'),
      location: t('home.featured.chalets.lagoon.location'),
      price: "280",
      rating: "4.9",
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.pool')
    },
    {
      id: 6,
      title: t('home.featured.chalets.emerald.title'),
      location: t('home.featured.chalets.emerald.location'),
      price: "195",
      rating: "4.6",
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.family')
    },
    {
      id: 7,
      title: t('home.featured.chalets.zenith.title'),
      location: t('home.featured.chalets.zenith.location'),
      price: "450",
      rating: "5.0",
      image: 'https://images.unsplash.com/photo-1600607687940-477a28453676?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.luxury')
    },
    {
      id: 8,
      title: t('home.featured.chalets.misty.title'),
      location: t('home.featured.chalets.misty.location'),
      price: "230",
      rating: "4.8",
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800',
      type: t('home.categories.resort')
    }
  ];

  const filteredChalets = activeCategory === categories[0]
    ? chalets 
    : chalets.filter(chalet => chalet.type === activeCategory);

  return (
    <section className={`relative bg-[#050505] py-20 overflow-hidden ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Unified Luxury Gold Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-xs mb-3 block">
            {t('common.chalets')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-gold-gradient mb-2 uppercase tracking-tight">
            {t('home.featured.title')}
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-heading font-light max-w-xl">
             {t('home.featured.subtitle')}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ x: isRTL ? -5 : 5 }}
          className="flex items-center gap-2 text-gold-400 font-bold uppercase text-sm tracking-widest group cursor-pointer"
        >
          {t('home.featured.exploreBtn')}
          <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>

      {/* Modern Luxury Filter Tabs */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 mb-12 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 md:gap-2.5 min-w-max pb-1.5">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-[12.5px] font-[600] uppercase tracking-wider transition-all duration-500 border cursor-pointer ${
                activeCategory === category 
                ? 'bg-gold-500 text-black border-gold-500 shadow-[0_8px_20px_rgba(180,83,9,0.3)]' 
                : 'bg-[#111] text-slate-400 border-white/5 hover:border-gold-500/30 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredChalets.slice(0, 6).map((chalet) => (
              <motion.div
                layout
                key={chalet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <ChaletCard 
                  id={chalet.id}
                  title={chalet.title}
                  location={chalet.location}
                  price={chalet.price}
                  rating={chalet.rating}
                  image={chalet.image}
                  type={chalet.type}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
