const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}', 
    './src/features/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xxs': '.5rem'
      },
      colors: {
        'teal': colors.teal
      }
    },
  },
  plugins: [],
}
