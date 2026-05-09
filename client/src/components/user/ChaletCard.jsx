import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Move, Calendar } from 'lucide-react';

const ChaletCard = ({ id, title, location, price, rating, image, type = "Luxury", area = "240sqft", beds = 4, baths = 4 }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-500 flex flex-col h-auto w-full shadow-2xl hover:shadow-gold-500/5 ${isRTL ? 'font-arabic' : 'font-inter'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Link to={`/chalets/${id || '1'}`} className="block">
        {/* Top Image Section */}
        <div className="relative h-[240px] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">{type}</span>
          </div>

          {/* Price Tag */}
          <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'}`}>
            <div className="bg-gold-600 text-black px-4 py-1.5 rounded-lg font-black text-xs shadow-xl uppercase tracking-tighter">
              {price} {isRTL ? 'د.ك' : 'KWD'}
            </div>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/chalets/${id || '1'}`}>
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <MapPin className="w-3 h-3 text-gold-500" />
            <span className="text-[10px] font-medium uppercase tracking-wide">{location}</span>
          </div>

          <h3 className="text-lg font-heading font-bold text-white mb-2 line-clamp-1 group-hover:text-gold-400 transition-colors uppercase tracking-tight">
            {title}
          </h3>
        </Link>

        {/* Features & Posted Row */}
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-400">
                 <Move className="w-3 h-3 text-gold-500/50" />
                 <span className="text-[10px] font-bold">{area}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                 <Bed className="w-3 h-3 text-gold-500/50" />
                 <span className="text-[10px] font-bold">{beds}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                 <Bath className="w-3 h-3 text-gold-500/50" />
                 <span className="text-[10px] font-bold">{baths}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-1 text-slate-500 text-[9px] font-medium opacity-80">
              <Calendar className="w-3 h-3" />
              <span>{t('common.posted')} {isRTL ? 'منذ يومين' : '2d ago'}</span>
           </div>
        </div>

        {/* Book Now Button */}
        <Link to={`/chalets/${id || '1'}`} className="w-full">
          <button className="w-full bg-gold-600 hover:bg-gold-500 text-black font-black text-xs uppercase tracking-widest py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-gold-500/20 active:scale-[0.98] mt-2">
            {t('common.bookNow')}
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ChaletCard;
