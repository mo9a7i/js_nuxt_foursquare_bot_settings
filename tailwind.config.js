/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/content/**/*.md', 
    './components/**/*.{js,vue,ts}', 
    './layouts/**/*.vue', 
    './pages/**/*.vue', 
    './plugins/**/*.{js,ts}', 
    './app.vue', 
    './node_modules/flowbite/**/*.{js,ts}',
    "./node_modules/vue-tailwind-datepicker/**/*.js",
],
safelist: [{ pattern: /^bg-/ }, { pattern: /^text-/}],

  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')

  ],
}
