const production = !process.env.ROLLUP_WATCH;

const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: [
     "./src/**/*.{ts,svelte}",
    ],
    enabled: production // disable purge in dev
  },
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blue': colors.blue[500],
        'blue-light': colors.blue[400],
        'blue-dark': colors.blue[700]
      }
    },
  }
};