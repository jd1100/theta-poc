const { plugins } = require("./postcss.config.cjs");

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  plugins: [
    require('@tailwindcss/typography'),
    require("@tailwindcss/aspect-ratio"),
    require('daisyui')
  ],
  // config (optional)
  daisyui: {
    styled: true,
    themes: [
      'dark'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
 }