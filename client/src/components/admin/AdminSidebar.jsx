import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Home, 
  Layers, 
  Calendar, 
  Users, 
  Star, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bell,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  const menuItems = [
    { name: t('admin.dashboard'), icon: <LayoutDashboard />, path: '/admin' },
    { name: t('admin.chalets'), icon: <Home />, path: '/admin/chalets' },
    { name: t('admin.categories'), icon: <Layers />, path: '/admin/categories' },
    { name: t('admin.bookings'), icon: <Calendar />, path: '/admin/bookings' },
    { name: t('admin.settings'), icon: <Settings />, path: '/admin/settings' },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-[#0a0a0a] border-r border-white/5 transition-all duration-500 relative z-30",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        {!isCollapsed && (
          <span className="text-xl font-black text-white tracking-tighter uppercase">
            CHALET<span className="text-gold-500">.</span>
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-gold-500 transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-gold-500 text-black font-[600] shadow-lg shadow-gold-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className={cn("shrink-0", isActive ? "text-black" : "group-hover:text-gold-500")}>
                {React.cloneElement(item.icon, { size: 20 })}
              </div>
              {!isCollapsed && (
                <span className="text-[15px] font-inter ">{item.name}</span>
              )}
              
              {/* Active Indicator Line */}
             
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-4 inset-x-4">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all group">
          <LogOut size={20} />
          {!isCollapsed && (
            <span className="text-[13px] font-work uppercase tracking-wider">{t('common.logout')}</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
