/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        'gradient': 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)',
        'blurred-landing':"url('public/images/blurred-background.png')"
      },
      fontFamily: {
        'helvetica-neue': ['Helvetica_Neue', 'sans-serif'],
        'montserrat': ['Montserrat'],
      },
    },
  },
  plugins: [],
}

