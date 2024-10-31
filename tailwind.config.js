/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclui todas as extensões do projeto
  ],
  theme: {
    extend: {
      colors: {
        primary: "#025bab", // Adiciona a cor primária para reutilização fácil
        'primary-dark': '#e65100', // Uma variação mais escura
      },
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg.jpg')", // Define uma imagem de fundo personalizada
      },
    },
  },
  darkMode: false,
  plugins: [],
};
