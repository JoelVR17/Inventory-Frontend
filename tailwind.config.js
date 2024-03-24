/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FFC72C",
        secondColor: "#26273B",
        background: "#0F0F21",
        textPrimary: "#EBEBF5",
        textSecond: "#CED1E4",
      },
    },
  },
  plugins: [],
};
