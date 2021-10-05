module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '84': '21rem'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    extend: {
      transform: ['hover', 'focus'],
    },
  },
  plugins: [],
}
