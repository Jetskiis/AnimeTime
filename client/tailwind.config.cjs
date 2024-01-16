/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: ".7rem",
      },
      screens: {
        smx: "700px",
        base: "960px",
        //sm,smx,md,base,xl,2xl
      },
    },
  },
  plugins: [],
};
