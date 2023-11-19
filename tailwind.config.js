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
      cyan: colors.cyan,
    },
    extend: {
      fontFamily: {
        vcr: ["VCR", ...defaultTheme.fontFamily.sans],
        lincoln: ["Lincoln", ...defaultTheme.fontFamily.sans],
        ibm1: ["IBM-1", ...defaultTheme.fontFamily.sans],
        pokemon: ["Pokemon", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "link-floaters": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(3px)" },
        },
      },
      animation: {
        "mobile-links": "link-floaters 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
