/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          // BOBO Brand Colors
        'bobo-primary': '#A855F7',      // Primary Purple
        'bobo-secondary': '#C084FC',    // Secondary Purple
        'bobo-lavender': '#FAF7FF',     // Light Lavender Background
        'bobo-soft': '#F3E8FF',         // Soft Purple Background
        'bobo-dark': '#1E1B4B',         // Dark Text
        'bobo-gray': '#6B7280',         // Secondary Text
        'bobo-accent': '#38BDF8',       // Accent Blue
        'bobo-border': '#E9D5FF',       // Borders

        // Legacy colors for compatibility
        'accent': '#9D4EDD',
        'secondary': '#2E1A47',
        'primary': '#FAF7FF',
      },
      backgroundImage: {
        'gradient-bobo': 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
        'gradient-bobo-dark': 'linear-gradient(135deg, #7D2FBE 0%, #A855F7 100%)',
      },
      boxShadow: {
        'bobo-sm': '0 2px 8px rgba(168, 85, 247, 0.1)',
        'bobo-md': '0 4px 16px rgba(168, 85, 247, 0.15)',
        'bobo-lg': '0 8px 24px rgba(168, 85, 247, 0.2)',
      },
      minHeight: {
        '70': '280px',
        '160': '640px',
      },
      animation: {
        'bobo-wave': 'wave 2s ease-in-out infinite',
        'bobo-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-20deg)' },
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
