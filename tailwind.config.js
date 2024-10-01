/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mainFont: ["Bungee Tint"],
        customFont: ["Indie Flower"],
      }
      ,backgroundImage:{
        bgImage: "url('https://res.cloudinary.com/djby1yfko/image/upload/v1727796596/Black_and_Purple_Digital_Glitch_Tech_YouTube_Banner_xqiodu.png')"
      }
    },
    
  },
  plugins: [],
}