module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    },
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
      borderRadius: ['hover', 'group-hover'],
      width: ['group-hover'],
      display: ['hover', 'group-hover', 'focus'],
      backgroundImage: ['hover', 'group-hover', 'focus'],
    },
  },
  plugins: [],
}
