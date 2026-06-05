export default function StatsCard({ icon: Icon, title, value, subtitle, trend, trendUp = true, bgColor = 'bg-accent' }) {
  return (
    <div className="bg-primary border border-accent/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full">
      {/* Icon Background */}
      <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center mb-4 shadow-md`}>
        <Icon size={28} className="text-white" />
      </div>

      {/* Content */}
      <h3 className="text-sm font-medium text-secondary/60 mb-1">{title}</h3>
      <div className="flex items-end justify-between mb-2">
        <p className="text-3xl font-bold text-secondary">{value}</p>
        {trend && (
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            trendUp 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}%
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-secondary/50">{subtitle}</p>}
    </div>
  );
}
