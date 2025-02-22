/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FEB22E',
          cream: '#FFE4B4',
          blue: '#30358B'
        },
        'brand-purple': '#7C3AED',
      }
    },
  },
  plugins: [],
} 