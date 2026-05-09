import React from 'react';
import Hero from '../../components/user/Hero';
import CategorySection from '../../components/user/CategorySection';
import FeaturedSection from '../../components/user/FeaturedSection';
import Footer from '../../components/user/Footer';

const Home = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <Hero />
      
      {/* Premium Category Slider Section */}
      <CategorySection />

      {/* Premium Featured Chalets Section */}
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Home;
