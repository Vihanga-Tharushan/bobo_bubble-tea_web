import { useState } from 'react';
import { Routes, useLocation, Route } from 'react-router-dom';
import { FiShoppingCart, FiPackage, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import RecentOrdersTable from '../components/RecentOrdersTable';
import AdminProductPage from './admin/adminProductPage';
import AddProductPage from './admin/adminAddNewProduct';

export default function AdminPage() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine current view based on URL
  const getActiveMenu = () => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') return 'dashboard';
    if (location.pathname === '/admin/orders') return 'orders';
    if (location.pathname === '/admin/products') return 'products';
    if (location.pathname === '/admin/users') return 'users';
    return 'dashboard';
  };

  const activeMenu = getActiveMenu();

  // Mock data for charts
  const ordersChartData = [
    { label: 'Mon', percentage: 65, value: '1,240' },
    { label: 'Tue', percentage: 78, value: '1,480' },
    { label: 'Wed', percentage: 72, value: '1,360' },
    { label: 'Thu', percentage: 85, value: '1,620' },
    { label: 'Fri', percentage: 90, value: '1,720' },
    { label: 'Sat', percentage: 95, value: '1,810' },
  ];

  const salesTrendData = [
    { label: 'Jan', value: 8 },
    { label: 'Feb', value: 10 },
    { label: 'Mar', value: 7 },
    { label: 'Apr', value: 11 },
    { label: 'May', value: 12 },
    { label: 'Jun', value: 9 },
  ];

  const productPerformanceData = [
    { label: 'Classic Milk Tea', percentage: 92, value: '2,450 orders' },
    { label: 'Taro Latte', percentage: 78, value: '1,860 orders' },
    { label: 'Strawberry Smoothie', percentage: 85, value: '2,030 orders' },
    { label: 'Matcha Green Tea', percentage: 68, value: '1,620 orders' },
  ];

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-primary'}`}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Container */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'} flex-1 flex flex-col`}>
        {/* Navbar */}
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isCollapsed={isCollapsed}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pt-24 pb-8">
          <div className="px-4 max-w-7xl mx-auto">
            <Routes path="/admin">

                <Route path="/" element={<WelcomeCard />} />
                <Route path="/orders" element={<h1>Orders</h1>} />
                <Route path="/products" element={<AdminProductPage />} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/add-product" element={<AddProductPage />} />

            </Routes>   
          </div>
        </main>
      </div>
    </div>
  );
}
