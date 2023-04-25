/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
      },
      width: {
        nav: '200px',
        smallNav: '100px',
      },
    },
  },
  plugins: [],
};
