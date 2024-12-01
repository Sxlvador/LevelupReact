/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'black': '#080808',
      'white': '#E3F0D3',
      'blue': '#31ADE3',
      'green': '#71C389',
      'orange': '#F1A51F',
      'red': '#ED2224'
    },
    fontFamily: {
      orbitronRegular: ["Orbitron Regular", "sans-serif"],
      orbitronBold: ["Orbitron Bold", "sans-serif"],
      micro5: ["Micro 5", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

