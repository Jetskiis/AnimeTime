/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: ".7rem",
      },
      screens: {
        base: "960px",
      },
    },
  },
  plugins: [],
};
