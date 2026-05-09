import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ title, image, onClick }) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative group cursor-pointer overflow-hidden rounded-[2rem] bg-[#111] border border-white/10 h-[320px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-gold-500/10 transition-all duration-700"
      onClick={onClick}
    >
      {/* Background Image with Cinematic Effects */}
      <motion.div
        variants={{
          hover: { scale: 1.05, y: -8 }
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover contrast-[1.1] saturate-[1.1]"
        />
        {/* Stronger Dark Overlay for better readability and cinematic mood */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </motion.div>

      {/* Elegant Glowing Rim */}
      <div className="absolute inset-0 border border-white/5 group-hover:border-gold-500/30 rounded-[2rem] transition-all duration-700 z-10" />
      
      {/* Centered Minimal Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-end pb-10 text-center px-4">
        <motion.h3
          variants={{
            initial: { y: 12, opacity: 0.9 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl md:text-2xl font-heading font-black text-gold-400 uppercase tracking-[0.1em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          {title}
        </motion.h3>
        
        <motion.div 
           variants={{
             initial: { scaleX: 0, opacity: 0 },
             hover: { scaleX: 1, opacity: 1 }
           }}
           className="w-16 h-[2px] bg-gold-500 mt-4 rounded-full origin-center transition-all duration-500" 
        />
      </div>

      {/* Glossy Glass Reflection Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none" />
    </motion.div>
  );
};

export default CategoryCard;
