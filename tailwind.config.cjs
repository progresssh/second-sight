/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#232946",
        headline: "#fffffe",
        paragraph: "#b8c1ec",
        button: "#eebbc3",
        buttontext: "#232946",
      },
    },
    fontFamily: { sans: ["Roboto"] },
  },
  plugins: [],
}
