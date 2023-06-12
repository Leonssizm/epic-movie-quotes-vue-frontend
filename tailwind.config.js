/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        gradient: 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)',
        guards: 'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'blurred-landing': "url('/public/images/blurred-background.png')"
      },
      fontFamily: {
        'helvetica-neue': ['Helvetica_Neue', 'sans-serif'],
        montserrat: ['Montserrat']
      }
    }
  },
  plugins: []
}
