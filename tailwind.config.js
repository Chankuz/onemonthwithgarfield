/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBF5',
          100: '#FFF8F0',
          200: '#F5E6D3',
          300: '#EAD8C0',
        },
        blush: {
          300: '#E8B4B8',
          400: '#D99A9E',
        },
        caramel: {
          400: '#D4A574',
          500: '#C08A52',
        },
        heart: '#E27D8F',
        ink: '#3A3028',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Sarabun', 'Inter', 'sans-serif'],
        handwriting: ['"Homemade Apple"', 'cursive'],
      },
    },
  },
  plugins: [],
}
