import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiPackage, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/admin' },
    { id: 'orders', label: 'Orders', icon: FiShoppingCart, path: '/admin/orders' },
    { id: 'products', label: 'Products', icon: FiPackage, path: '/admin/products' },
    { id: 'users', label: 'Users', icon: FiUsers, path: '/admin/users' },
  ];

  const getActivePath = () => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') return 'dashboard';
    if (location.pathname === '/admin/orders') return 'orders';
    if (location.pathname === '/admin/products' || location.pathname === '/admin/add-product' || location.pathname === '/admin/update-product') return 'products' ;
    if (location.pathname === '/admin/users') return 'users';
    return 'dashboard';
  };

  const activeMenu = getActivePath();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-primary border-r border-accent/20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col shadow-sm z-40`}>
      {/* Logo Section */}
      <div className={`flex items-center justify-between p-6  ${isCollapsed && 'flex-col gap-4'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-30 h-20 rounded-xl flex items-center justify-center">
                <img src="/BOBOimg.png" alt="BOBO Logo" className="w-full h-full object-contain" />             
            </div>
            <span className="text-xl font-bold text-secondary">BOBO ADMIN</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-white shadow-md'
                  : 'text-secondary/60 hover:bg-accent/10'
              }`}
            >
              <Icon size={22} className={`shrink-0 ${isActive ? 'text-white' : 'text-accent'}`} />
              {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-accent/20 ${isCollapsed && 'text-center'}`}>
        <div className={`text-xs text-secondary/50 ${isCollapsed ? 'hidden' : ''}`}>
          <p className="font-semibold text-secondary/70 mb-1">Version 1.0</p>
          <p>© 2024 BOBO Admin</p>
        </div>
      </div>
    </aside>
  );
}
