/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FBFFF1",
        primary: "#3066BE",
        secondary: "#B4C5E4",
        tertiary: "#090C9B",
        black: "#3C3744",
      },
    },
  },
  plugins: [],
};
