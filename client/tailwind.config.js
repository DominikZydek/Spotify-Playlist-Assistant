/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
      'spotify-green': '#1ed760',
      'spotify-black': '#000000',
      'spotify-light-grey': '#2a2a2a',
      'spotify-dark-grey': '#121212',
      'spotify-white': '#ffffff',
      }
    }
  },
  plugins: [],
}

