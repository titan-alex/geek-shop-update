/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./dist/views/**/*.{ejs,js}"],
  theme: {
    fontFamily:{
    'gilroy': ['Gilroy', 'Arial', 'sans-serif'],
    'roboto': ['Roboto'],
    'assasin': ['assassin', 'sans-serif']
  },
  colors:{
    'darkRed':'#c50d2a',
    'red': '#ff0000',
    'darkWhite': '#fdfffc',
    'darkGreen': 'rgb(27, 71, 27)',
    'blue' : '#0000ff',
    'white': '#ffffff',
    'black': '#000000',
  },

  },
  plugins:[]
}
