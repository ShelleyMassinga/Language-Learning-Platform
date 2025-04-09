/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D9CDB',
          dark: '#2B6CB0',
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          dark: '#E53E3E',
        },
        accent: {
          DEFAULT: '#FFD166',
          dark: '#D69E2E',
        },
        text: {
          heading: '#1A365D',
          body: '#4A5568',
          light: '#718096',
        },
        success: '#48BB78',
        warning: '#ECC94B',
        error: '#F56565',
        'card-bg': '#FFFFFF',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 