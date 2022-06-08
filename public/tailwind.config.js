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
        '29': '7.25rem',
        '30': '7.5rem',
        '32':	'8rem',
        '34': '8.5rem',
        '36':	'9rem',
        '42': '10.5rem',
        '82': '20.5rem',
        '84': '21rem',
        '104': '26rem',
        '120': '30rem',
        '136': '34rem',
        '152': '38rem',
        '168': '42rem',
        '184': '46rem'
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
