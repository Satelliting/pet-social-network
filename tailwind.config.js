/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accentYellow: "var(--color-accent-yellow)",
        accentOrange: "var(--color-accent-orange)",
        accentRed: "var(--color-accent-red)",
        accentBlue: "var(--color-accent-blue)",
        backgroundLight: "var(--color-background-light)",
        textDark: "var(--color-text-dark)",
      },
    },
  },
  plugins: [],
};
