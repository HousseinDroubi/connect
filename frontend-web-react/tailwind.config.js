/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#0C7FF2",
        black: "#0D141C",
        ice_blue: "#E7EDF4",
        dusty_blue: "#49739C",
        white: "#F8FAFC",
      },
      width: {
        100: "25rem",
        104: "26rem",
        108: "26rem",
        112: "27rem",
        116: "28rem",
      },
    },
  },
  plugins: [],
};
