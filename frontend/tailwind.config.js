/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#9D4EDD',
        'secondary': '#2E1A47',
        'primary': '#FAF7FF',
      },
      backgroundImage: {
        'gradient-bobo': 'linear-gradient(135deg, #7D2FBE 0%, #9D4EDD 100%)',
      },
      minHeight: {
        '70': '280px',
        '160': '640px',
      },
      animation: {
        'bobo-wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-20deg)' },
        },
      },
    },
  },
  plugins: [],
}
