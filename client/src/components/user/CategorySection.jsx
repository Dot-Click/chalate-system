import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import CategoryCard from './CategoryCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

const CategorySection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const baseCategories = [
    {
      id: 1,
      title: t('home.categories.resort'),
      image: '/assets/images/categories/beach.png'
    },
    {
      id: 2,
      title: t('home.categories.luxury'),
      image: '/assets/images/categories/luxury.png'
    },
    {
      id: 3,
      title: t('home.categories.desert'),
      image: '/assets/images/categories/desert.png'
    },
    {
      id: 4,
      title: t('home.categories.beach'),
      image: '/assets/images/categories/beach.png'
    }
  ];

  // Duplicate slides to ensure loop works perfectly with slidesPerView
  const categories = [...baseCategories, ...baseCategories];

  return (
    <section className={`relative bg-[#050505] pt-12 pb-12 overflow-hidden ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Unified Luxury Gold Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mb-16 text-left rtl:text-right">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-xs mb-3 block">
            {t('common.chalets')}
          </span>
          <h2 className="text-5xl md:text-6xl font-heading font-black text-gold-gradient mb-6 uppercase tracking-tight">
            {t('home.categories.title')}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-heading font-light max-w-xl leading-relaxed opacity-90">
            {t('home.categories.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        <Swiper
          key={`${i18n.language}-swiper`}
          dir={isRTL ? 'rtl' : 'ltr'}
          modules={[Autoplay, Pagination, FreeMode]}
          spaceBetween={30}
          slidesPerView={1.3}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-gold-500 !opacity-20',
            bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !w-8 !rounded-full transition-all duration-300',
          }}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.5 },
            1440: { slidesPerView: 4 },
          }}
          className="categories-swiper !pb-20"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={`${category.id}-${index}`} className="p-4">
              <CategoryCard 
                title={category.title}
                image={category.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;
