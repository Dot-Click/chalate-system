import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Users, 
  Home, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  Unlock,
  Lock,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/dashboard/StatCard';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import LatestBookings from '../../components/admin/dashboard/LatestBookings';
import ChaletsOverview from '../../components/admin/dashboard/ChaletsOverview';
import { cn } from '@/lib/utils';

// --- Mock Data for Charts ---

const bookingActivity = [
  { name: 'Sun', bookings: 12 },
  { name: 'Mon', bookings: 18 },
  { name: 'Tue', bookings: 15 },
  { name: 'Wed', bookings: 22 },
  { name: 'Thu', bookings: 35 },
  { name: 'Fri', bookings: 45 },
  { name: 'Sat', bookings: 40 },
];


const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isRTL = i18n.language === 'ar';

  const stats = [
    { title: t('admin.totalGuests'), value: "1,248", icon: <Users />, trend: 'up', trendValue: '+12%', color: 'bg-blue-500' },
    { title: t('admin.totalChalets'), value: "84", icon: <Home />, trend: 'up', trendValue: '+4%', color: 'bg-gold-500' },
    { title: t('admin.totalBookings'), value: "452", icon: <Calendar />, trend: 'up', trendValue: '+18%', color: 'bg-purple-500' },
    { title: t('admin.revenue'), value: "12.4k", icon: <Wallet />, trend: 'up', trendValue: '+24%', color: 'bg-green-500' },
    { title: t('admin.pendingRequests'), value: "14", icon: <Clock />, trend: 'down', trendValue: '-5%', color: 'bg-orange-500' },
    { title: t('admin.activeBookings'), value: "28", icon: <CheckCircle2 />, trend: 'up', trendValue: '+8%', color: 'bg-cyan-500' },
    { title: t('admin.totalReviews'), value: "856", icon: <MessageSquare />, trend: 'up', trendValue: '+10%', color: 'bg-pink-500' },
    { title: t('admin.availableNow'), value: "12", icon: <Unlock />, trend: null, trendValue: null, color: 'bg-emerald-500' },
  ];

  return (
    <div className={`h-screen overflow-hidden bg-[#000000] flex ${isRTL ? 'font-arabic' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen bg-[#000000]">
        <AdminHeader />
        
        <main className="flex-1 p-8 overflow-y-auto space-y-9 custom-scrollbar">
          {/* Welcome Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-0">
              <h1 className="text-[32px] font-inter font-black text-gold-500 uppercase tracking-tight">
                {t('admin.dashboard')}
              </h1>
              <p className="text-slate-200 text-[14px] font-inter font-[400]">{t('admin.welcomeSub')}</p>
            </div>
           
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.slice(0, 4).map((stat, i) => <StatCard key={i} {...stat} />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Main Revenue Chart Component */}
             <div className="lg:col-span-3">
                <RevenueChart />
             </div>
          </div>

          {/* Bottom Grid: Latest Bookings & Chalets Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
             <LatestBookings />
             <ChaletsOverview />
          </div>
        </main>
      </div>

    </div>
  );
};

const Clock = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default AdminDashboard;
