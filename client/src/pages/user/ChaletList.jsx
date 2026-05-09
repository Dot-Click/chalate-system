import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
} from 'lucide-react';
import ChaletCard from '../../components/user/ChaletCard';
import Footer from '../../components/user/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Moved FilterSidebar outside to prevent focus loss on re-render
const FilterSidebar = ({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  priceRange, 
  setPriceRange, 
  t, 
  isRTL, 
  categoryOptions 
}) => (
  <div className="space-y-8">
    {/* Search Bar */}
    <div className="relative group">
      <div className={`absolute inset-y-0 ${isRTL ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
        <Search className="w-4 h-4 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" />
      </div>
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('listing.searchPlaceholder')}
        className={`w-full bg-[#111] border border-white/5 rounded-2xl py-3.5 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/30 focus:bg-[#151515] transition-all`}
      />
    </div>

    {/* Categories */}
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest">{t('listing.categories')}</h3>
      <div className="flex flex-wrap gap-2">
        {categoryOptions.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeCategory === cat 
              ? 'bg-gold-500 text-black border-gold-500' 
              : 'bg-[#111] border-white/5 text-slate-400 hover:text-white hover:border-gold-500/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest">{t('listing.priceRange')}</h3>
        <span className="text-xs font-bold text-white">{priceRange} KWD</span>
      </div>
      <input 
        type="range" 
        min="50" 
        max="1000" 
        value={priceRange}
        onChange={(e) => setPriceRange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-[#111] rounded-lg appearance-none cursor-pointer accent-gold-500"
      />
      <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
        <span>50 KWD</span>
        <span>1000 KWD</span>
      </div>
    </div>

    {/* Amenities */}
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest">{t('listing.amenities')}</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          { id: 'pool', label: t('listing.amenityPool') },
          { id: 'gym', label: t('listing.amenityGym') },
          { id: 'wifi', label: t('listing.amenityWiFi') },
          { id: 'parking', label: t('listing.amenityParking') },
        ].map((item) => (
          <label key={item.id} className="flex items-center gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded-md bg-[#111] border border-white/5 flex items-center justify-center group-hover:border-gold-500/30 transition-all">
              <div className="w-2.5 h-2.5 rounded-sm bg-gold-500 opacity-0 group-hover:opacity-20" />
            </div>
            <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors uppercase tracking-wide">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

const ChaletList = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('newest');

  // Categories list
  const categoryOptions = ['All', 'Luxury', 'Resort', 'Desert', 'Beach', 'Family'];

  // Mock Data
  const allChalets = useMemo(() => [
    {
      id: 1,
      title: t('home.featured.chalets.oasis.title'),
      location: t('home.featured.chalets.oasis.location'),
      price: 250,
      rating: "4.9",
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
      type: 'Resort'
    },
    {
      id: 2,
      title: t('home.featured.chalets.pearl.title'),
      location: t('home.featured.chalets.pearl.location'),
      price: 180,
      rating: "4.8",
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      type: 'Desert'
    },
    {
      id: 3,
      title: t('home.featured.chalets.azure.title'),
      location: t('home.featured.chalets.azure.location'),
      price: 320,
      rating: "5.0",
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
      type: 'Beach'
    },
    {
      id: 4,
      title: t('home.featured.chalets.palace.title'),
      location: t('home.featured.chalets.palace.location'),
      price: 210,
      rating: "4.7",
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      type: 'Luxury'
    },
    {
      id: 5,
      title: t('home.featured.chalets.lagoon.title'),
      location: t('home.featured.chalets.lagoon.location'),
      price: 280,
      rating: "4.9",
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      type: 'Pool'
    },
    {
      id: 6,
      title: t('home.featured.chalets.emerald.title'),
      location: t('home.featured.chalets.emerald.location'),
      price: 195,
      rating: "4.6",
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      type: 'Family'
    },
    {
      id: 7,
      title: t('home.featured.chalets.zenith.title'),
      location: t('home.featured.chalets.zenith.location'),
      price: 450,
      rating: "5.0",
      image: 'https://images.unsplash.com/photo-1600607687940-477a28453676?auto=format&fit=crop&q=80&w=800',
      type: 'Luxury'
    },
    {
      id: 8,
      title: t('home.featured.chalets.misty.title'),
      location: t('home.featured.chalets.misty.location'),
      price: 230,
      rating: "4.8",
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800',
      type: 'Resort'
    }
  ], [t]);

  // Filtering Logic
  const filteredChalets = useMemo(() => {
    let result = allChalets.filter(chalet => {
      const matchesSearch = 
        chalet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chalet.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || chalet.type === activeCategory;
      const matchesPrice = chalet.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sorting
    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    return result;
  }, [allChalets, searchQuery, activeCategory, priceRange, sortBy]);

  const sharedFilterProps = {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    t,
    isRTL,
    categoryOptions
  };

  return (
    <div className={`min-h-screen bg-[#050505] flex flex-col ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Unified Luxury Gold Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[100px]" />
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-gold-950/10 blur-[150px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-gold-900/5 blur-[150px] rounded-full opacity-40" />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow pt-32 pb-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
          
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block">
                {t('common.chalets')}
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-gold-gradient uppercase tracking-tight mb-2">
                {t('home.featured.title')}
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                {t('listing.showing')} <span className="text-gold-500">{filteredChalets.length}</span> {t('listing.results')}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex lg:hidden items-center justify-center gap-2 bg-[#111] border border-white/5 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex-grow"
              >
                <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                {t('listing.filterTitle')}
              </button>
              
              <div className="flex-grow md:flex-grow-0 min-w-[160px]">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-[#111] border-white/5 rounded-xl py-2 h-10 px-4 text-[11px] font-medium uppercase tracking-widest text-white/80 focus:ring-gold-500/10 focus:border-gold-500/20 font-inter">
                    <SelectValue placeholder={t('listing.sortBy')} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white rounded-xl p-1 shadow-2xl">
                    <SelectItem value="newest" className="rounded-lg py-2 px-3 focus:bg-gold-500 focus:text-black transition-colors uppercase text-[10px] font-medium tracking-widest cursor-pointer font-inter">
                      {t('listing.sortNewest')}
                    </SelectItem>
                    <SelectItem value="low" className="rounded-lg py-2 px-3 focus:bg-gold-500 focus:text-black transition-colors uppercase text-[10px] font-medium tracking-widest cursor-pointer font-inter">
                      {t('listing.sortPriceLow')}
                    </SelectItem>
                    <SelectItem value="high" className="rounded-lg py-2 px-3 focus:bg-gold-500 focus:text-black transition-colors uppercase text-[10px] font-medium tracking-widest cursor-pointer font-inter">
                      {t('listing.sortPriceHigh')}
                    </SelectItem>
                    <SelectItem value="rating" className="rounded-lg py-2 px-3 focus:bg-gold-500 focus:text-black transition-colors uppercase text-[10px] font-medium tracking-widest cursor-pointer font-inter">
                      {t('listing.sortRating')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block w-[300px] shrink-0 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar pr-4">
              <FilterSidebar {...sharedFilterProps} />
            </aside>

            {/* Chalet Grid */}
            <div className="flex-grow">
              <AnimatePresence mode='popLayout'>
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredChalets.map((chalet) => (
                    <motion.div
                      layout
                      key={chalet.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                    <ChaletCard 
                        id={chalet.id}
                        title={chalet.title}
                        location={chalet.location}
                        price={chalet.price.toString()}
                        rating={chalet.rating}
                        image={chalet.image}
                        type={chalet.type}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredChalets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2 uppercase tracking-tighter">No Chalets Found</h3>
                  <p className="text-slate-500 text-sm max-w-xs">We couldn't find any chalets matching your current filters. Try adjusting your search or price range.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              className={`fixed top-0 bottom-0 w-[85%] max-w-[400px] bg-[#0d0d0d] z-[101] p-8 shadow-2xl border-l border-white/5 ${isRTL ? 'left-0' : 'right-0'}`}
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tighter">{t('listing.filterTitle')}</h2>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 bg-[#111] rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
                <FilterSidebar {...sharedFilterProps} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent">
                <button 
                   onClick={() => setIsMobileFilterOpen(false)}
                   className="w-full bg-gold-600 text-black font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-gold-900/20"
                >
                   {t('common.save')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ChaletList;
