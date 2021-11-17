const { plugins } = require("./postcss.config.cjs");

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  plugins: [
    require('daisyui'),
    require('@themesberg/flowbite/plugin'),
    require("@tailwindcss/aspect-ratio")
  ]
 }