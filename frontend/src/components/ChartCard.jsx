export default function ChartCard({ title, subtitle, data, type = 'bar' }) {
  return (
    <div className="bg-primary border border-accent/20 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-secondary mb-1">{title}</h3>
        <p className="text-sm text-secondary/50">{subtitle}</p>
      </div>

      {/* Chart */}
      {type === 'bar' && (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary/70">{item.label}</span>
                <span className="text-sm font-semibold text-secondary">{item.value}</span>
              </div>
              <div className="w-full bg-accent/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'line' && (
        <div className="relative h-64 flex items-end justify-between gap-2 px-2 py-4 bg-accent/5 rounded-xl">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 gap-2">
              <div className="text-xs font-semibold text-secondary/70 mb-2">${item.value}K</div>
              <div
                className="w-full bg-accent rounded-t-lg transition-all duration-500 hover:shadow-lg"
                style={{ height: `${(item.value / 12) * 100}%`, minHeight: '20px' }}
              ></div>
              <span className="text-xs text-secondary/60 mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
