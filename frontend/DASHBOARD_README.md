# BOBO Admin Dashboard - Documentation

## Overview
A modern, premium admin dashboard for the BOBO bubble tea brand built with React.js and Tailwind CSS. The dashboard features a clean, minimal design with soft rounded cards and a purple/lavender color scheme.

## Project Structure

```
frontend/src/
├── pages/
│   └── adminPage.jsx          # Main dashboard container
├── components/
│   ├── Sidebar.jsx            # Left navigation sidebar
│   ├── Navbar.jsx             # Top navbar with search & profile
│   ├── WelcomeCard.jsx        # Welcome/hero section
│   ├── StatsCard.jsx          # Reusable statistics card
│   ├── ChartCard.jsx          # Analytics chart component
│   └── RecentOrdersTable.jsx  # Orders table display
└── ...
```

## Key Features

### 🎨 Design
- **Color Palette**: BOBO brand purples, soft lavenders, and accent colors
- **Typography**: Poppins (headings) + Inter (body text)
- **Spacing**: Consistent padding/margin with Tailwind utilities
- **Shadows**: Soft, subtle shadows for premium feel
- **Rounded Corners**: xl/2xl rounded cards and buttons

### 📱 Responsive Design
- **Desktop**: Full sidebar + navbar layout
- **Tablet**: Collapsible sidebar with responsive grid
- **Mobile**: Stacked layout with touch-friendly interface

### 🧭 Navigation
- **Sidebar**: 4 main menu items (Dashboard, Orders, Products, Users)
- **Collapsible**: Toggle sidebar to save screen space
- **Active States**: Purple highlight on selected menu
- **Hover Effects**: Smooth transitions and color changes

### 📊 Dashboard Sections

#### Welcome Card
- Greeting with time-based message (Morning/Afternoon/Evening)
- Quick stats overview (Sales, Orders, Visitors)
- CTA button to view analytics
- Decorative bubble tea emoji

#### Stats Cards
- **Total Orders**: Active orders count with trend
- **Total Products**: Product inventory status
- **Total Users**: Customer base metrics
- **Revenue**: Sales performance tracking
- Each card shows: Value, Trend percentage, Icon, Subtitle

#### Charts Section
- **Orders Analytics**: Weekly order trends (bar chart)
- **Sales Trend**: Monthly revenue overview (line/column chart)
- **Product Performance**: Top performing products (bar chart)

#### Recent Orders Table
- Order ID, Customer name, Product, Status, Amount
- Status badges (Completed, Processing, Pending, Shipped)
- Color-coded status indicators
- Action menu for each order

#### Other Sections
- **Products**: Product grid with mock data
- **Users**: User list with profiles
- **Orders**: Detailed orders management

### 🎯 Components Guide

#### Sidebar.jsx
```jsx
<Sidebar
  activeMenu={activeMenu}
  setActiveMenu={setActiveMenu}
  isCollapsed={isCollapsed}
  setIsCollapsed={setIsCollapsed}
/>
```
- Props: activeMenu (string), setActiveMenu (function), isCollapsed (bool), setIsCollapsed (function)

#### Navbar.jsx
```jsx
<Navbar
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  isCollapsed={isCollapsed}
/>
```
- Props: isDarkMode (bool), setIsDarkMode (function), isCollapsed (bool)
- Features: Search bar, notifications, dark mode toggle, user profile

#### StatsCard.jsx
```jsx
<StatsCard
  icon={IconComponent}
  title="Card Title"
  value="1,240"
  subtitle="Optional subtitle"
  trend="12"
  trendUp={true}
  bgColor="from-purple-500 to-purple-600"
/>
```
- Props: icon (React component), title (string), value (string), subtitle (string), trend (string), trendUp (bool), bgColor (gradient class)

#### ChartCard.jsx
```jsx
<ChartCard
  title="Chart Title"
  subtitle="Chart description"
  data={arrayOfData}
  type="bar" // or "line"
/>
```
- Data structure: `[{ label: string, value: number, percentage: number }]`

#### RecentOrdersTable.jsx
- Displays mock order data in a clean table format
- Status badges with color coding
- Responsive horizontal scroll on mobile

## Color System

### BOBO Brand Colors (Tailwind Classes)
- `bobo-primary`: #A855F7 (Primary Purple)
- `bobo-secondary`: #C084FC (Secondary Purple)
- `bobo-lavender`: #FAF7FF (Light Background)
- `bobo-soft`: #F3E8FF (Soft Background)
- `bobo-dark`: #1E1B4B (Dark Text)
- `bobo-gray`: #6B7280 (Secondary Text)
- `bobo-accent`: #38BDF8 (Accent Blue)
- `bobo-border`: #E9D5FF (Borders)

### Quick Utility Classes
```css
/* Gradients */
from-purple-500 to-purple-600
from-blue-500 to-blue-600
from-green-500 to-green-600
from-orange-500 to-orange-600

/* Status Colors */
bg-green-100 text-green-700    /* Success/Completed */
bg-blue-100 text-blue-700      /* Processing */
bg-yellow-100 text-yellow-700  /* Pending */
bg-purple-100 text-purple-700  /* Shipped */
```

## Customization Guide

### Adding New Menu Items
Edit `Sidebar.jsx` menuItems array:
```jsx
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'orders', label: 'Orders', icon: FiShoppingCart },
  // Add new item:
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
];
```

### Creating New Stats Cards
```jsx
<StatsCard
  icon={FiActivity}
  title="New Title"
  value="999"
  subtitle="New metric"
  trend="5"
  trendUp={true}
  bgColor="from-red-500 to-red-600"
/>
```

### Adding Chart Data
Simply pass different data arrays to ChartCard:
```jsx
<ChartCard
  title="My Chart"
  subtitle="Description"
  data={[
    { label: 'Label', percentage: 60, value: '100' },
  ]}
  type="bar"
/>
```

### Changing Colors
Use Tailwind color utilities throughout components. Update `tailwind.config.js` for custom BOBO colors.

## Mock Data

### Orders Table
Located in `RecentOrdersTable.jsx`:
```javascript
const orders = [
  {
    id: '#ORD-001',
    customer: 'Sarah Johnson',
    product: 'Classic Milk Tea',
    status: 'Completed',
    amount: '$24.99',
    date: '2024-05-28',
  },
  // ... more orders
];
```

### Chart Data
Located in `adminPage.jsx`:
- ordersChartData: Weekly order analytics
- salesTrendData: Monthly revenue trends
- productPerformanceData: Product popularity metrics

## Features

### ✅ Implemented
- Responsive sidebar navigation with collapse toggle
- Top navbar with search, notifications, dark mode
- Welcome card with greeting and quick stats
- 4 stats cards with trend indicators
- Order analytics and sales trend charts
- Product performance visualization
- Recent orders table with status badges
- Products grid view
- Users list view
- Smooth transitions and hover effects

### 🎯 Optional Enhancements
- Integrate real data from backend API
- Add dark mode styling
- Implement chart libraries (Chart.js, Recharts)
- Add export/download functionality
- Create detailed views for each section
- Add notifications/alerts system
- Implement user role-based permissions
- Add filtering and search functionality

## Dependencies

```json
{
  "react": "^18.x",
  "react-icons": "^4.x",
  "tailwindcss": "^3.x"
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Roadmap

1. **Charts Integration**: Replace mock charts with Chart.js or Recharts
2. **Real Data**: Connect to backend APIs for live data
3. **Dark Mode**: Complete dark mode styling
4. **Notifications**: Toast notifications and alerts
5. **Export**: PDF/Excel export functionality
6. **Advanced Filtering**: Multi-field search and filters
7. **User Roles**: Admin, Manager, Staff role management
8. **Analytics**: Advanced metrics and insights

---

**Created for BOBO - Premium Bubble Tea Brand**
