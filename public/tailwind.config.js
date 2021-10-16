module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '84': '21rem'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    extend: {
      transform: ['hover', 'focus'],
      borderWidth: ['hover', 'focus'],
      display: ['hover', 'focus'],
      backgroundImage: ['hover', 'focus'],
    },
  },
  plugins: [],
}
