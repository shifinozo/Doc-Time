/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'primary':"#5f6fff"

      },
      gridTemplateColumns:{
        "auto":"repeat(auto-fill,minmax(200px,1fr))"
      }
    },
  },
  plugins: [],
});
