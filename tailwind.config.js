/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [],
  theme: {
    extend: {}
  },
  plugins: []
}
