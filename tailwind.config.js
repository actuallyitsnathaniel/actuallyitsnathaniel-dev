/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      orange: colors.orange,
      yellow: colors.yellow,
    },
    extend: {
      fontFamily: {
        vcr: ["VCR", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
