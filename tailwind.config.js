/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: [],
    // defaults to these values
    spinner: (theme) => ({
      default: {
        color: "#dae1e7", // color you want to make the spinner
        size: "1em", // size of the spinner (used for both width and height)
        border: "2px", // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: "500ms", // the speed at which the spinner should rotate
      },
    }),
  },
  plugins: [
    // optional configuration for resulting class name and/or tailwind theme key
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
  ],
};
