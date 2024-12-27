/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclui todas as extensões do projeto
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Define Roboto como padrão
      },
      colors: {
        primary: "#E80070",
        cinza: "#f8f7fc"
      },
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg.jpg')", // Define uma imagem de fundo personalizada
      },
    },
  },
  darkMode: false,
  plugins: [],
};
