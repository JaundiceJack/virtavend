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
      transform: ['hover', 'group-hover', 'focus'],
      borderWidth: ['hover', 'group-hover', 'focus'],
      borderRadius: ['group-hover'],
      width: ['group-hover'],
      display: ['hover', 'group-hover', 'focus'],
      backgroundImage: ['hover', 'group-hover', 'focus'],
    },
  },
  plugins: [],
}
