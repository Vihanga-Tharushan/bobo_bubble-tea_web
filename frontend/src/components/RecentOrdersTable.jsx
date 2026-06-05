import { FiEye, FiMoreVertical } from 'react-icons/fi';

export default function RecentOrdersTable() {
  const orders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Classic Milk Tea', status: 'Completed', amount: '$24.99', date: '2024-05-28' },
    { id: '#ORD-002', customer: 'Mike Chen', product: 'Taro Latte', status: 'Processing', amount: '$18.50', date: '2024-05-28' },
    { id: '#ORD-003', customer: 'Emma Davis', product: 'Bubble Tea Set', status: 'Pending', amount: '$45.00', date: '2024-05-28' },
    { id: '#ORD-004', customer: 'Alex Rodriguez', product: 'Matcha Smoothie', status: 'Completed', amount: '$22.75', date: '2024-05-27' },
    { id: '#ORD-005', customer: 'Lisa Wang', product: 'Strawberry Tea', status: 'Shipped', amount: '$16.99', date: '2024-05-27' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-secondary/10 text-secondary/70';
    }
  };

  return (
    <div className="bg-primary border border-accent/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary">Recent Orders</h2>
        <button className="text-sm text-accent hover:text-accent/80 font-medium">View All</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent/20">
              <th className="text-left py-3 px-4 text-sm font-semibold text-secondary/60">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-secondary/60">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-secondary/60">Product</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-secondary/60">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-secondary/60">Amount</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-secondary/60">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-secondary">{order.id}</td>
                <td className="py-4 px-4 text-sm text-secondary/70">{order.customer}</td>
                <td className="py-4 px-4 text-sm text-secondary/70">{order.product}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-secondary">{order.amount}</td>
                <td className="py-4 px-4 text-center">
                  <button className="inline-flex items-center justify-center p-2 hover:bg-accent/10 rounded-lg transition-colors text-secondary/60 hover:text-accent">
                    <FiMoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
