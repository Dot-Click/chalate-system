import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/user/Home';
import ChaletList from '../pages/user/ChaletList';
import ChaletDetail from '../pages/user/ChaletDetail';
import About from '../pages/user/About';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/admin/Dashboard';
import ChaletManagement from '../pages/admin/ChaletManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import BookingManagement from '../pages/admin/BookingManagement';
import Navbar from '../components/common/Navbar';
import { cn } from '@/lib/utils';

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Show Navbar only on User pages, not Admin */}
      {!isAdminPage && <Navbar />}
      
      <main className={cn(
        "min-h-screen",
        !isAdminPage ? "" : "" // Admin handles its own layout
      )}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/chalets" element={<ChaletList />} />
          <Route path="/chalets/:id" element={<ChaletDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/chalets" element={<ChaletManagement />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
