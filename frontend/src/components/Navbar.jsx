import { FiSearch, FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar({ isDarkMode, setIsDarkMode, isCollapsed }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className={`fixed top-0 ${isCollapsed ? 'left-20' : 'left-64'} right-0 h-20 bg-primary border-b border-accent/20 shadow-sm transition-all duration-300 z-30`}>
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary/40" size={18} />
            <input
              type="text"
              placeholder="Search orders, products, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-accent/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm text-secondary placeholder-secondary/40 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-accent/10 rounded-xl transition-colors text-secondary/60 hover:text-accent">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 hover:bg-accent/10 rounded-xl transition-colors text-secondary/60 hover:text-accent"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-accent/20 ml-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-secondary">Admin User</p>
              <p className="text-xs text-secondary/50">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-md transition-shadow">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
