import { FiArrowRight } from 'react-icons/fi';

export default function WelcomeCard() {
  const getCurrentHour = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400 rounded-full opacity-10 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300 rounded-full opacity-10 -ml-16 -mb-16"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{getCurrentHour()}! 👋</h1>
            <p className="text-white/90 text-sm">Welcome back to your BOBO bubble tea empire</p>
          </div>
          <div className="text-6xl opacity-20">🧋</div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-xs text-white/80 mb-1">Today's Sales</p>
            <p className="text-2xl font-bold">$1,240</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-xs text-white/80 mb-1">New Orders</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-xs text-white/80 mb-1">Visitors</p>
            <p className="text-2xl font-bold">1.2K</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white text-purple-600 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-50 transition-all duration-300 shadow-lg">
          View Analytics <FiArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
