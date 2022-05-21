const colors = require('./app/colors');

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
      backgroundImage: {
        'full-gradient': "url('/img/hero-pattern.svg')",
      },
    },
  },
  variants: {},
  plugins: [],
};
