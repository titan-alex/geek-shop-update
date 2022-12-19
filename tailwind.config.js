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
    'darkWhite': '#fdfffc',
    'darkGreen': 'rgb(27, 71, 27)'
  },

  },
  plugins:[
    plugin(function({ addUtilities, addComponents, e, config }) {
      'm-[20px]', 'w-[290px]', 'h-auto', 'p-[10px]', 
      'inline-flex', 'bg-[#066bb3]', 'justify-center',
      'align-center', 'text-center' 
    }),
  ]
}
