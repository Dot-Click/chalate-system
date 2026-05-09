import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { cn } from '@/lib/utils';

const AdminLayout = ({ children }) => {
  const { i18n } = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isRTL = i18n.language === 'ar';

  return (
    <div className={cn(
      "h-screen overflow-hidden bg-[#000000] flex",
      isRTL ? "font-arabic" : "font-inter"
    )} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Persistent Sidebar */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen bg-[#000000]">
        {/* Persistent Header */}
        <AdminHeader />
        
        {/* Scrollable Main Content */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-9">
            {children}
          </div>
        </main>

        {/* Global UI Accent - Subtle Bottom Glow */}
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] pointer-events-none -z-10" />
      </div>
    </div>
  );
};

export default AdminLayout;
