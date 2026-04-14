import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          900: '#0f1115', // Base background
          800: '#161920', // Card background
          700: '#21252d', // Interactivity/borders
        },
        brand: {
          500: '#3b82f6', // primary blue
          400: '#60a5fa', 
        }
      }
    },
  },
  plugins: [],
}
