/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom rural theme colors
      colors: {
        'forest': '#2E7D32',      // Primary accent - deep forest green
        'terra': '#D84315',       // Secondary accent - warm terracotta
        'terra-light': '#FF8A65', // Light terracotta for hover states
        'terra-dark': '#BF360C',  // Dark terracotta for active states
        'off-white': '#F9F9F9',   // Neutral off-white
        'charcoal': '#333333',    // Dark charcoal
      },
      fontFamily: {
        'sans': ['Public Sans', 'Mukta', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
} 