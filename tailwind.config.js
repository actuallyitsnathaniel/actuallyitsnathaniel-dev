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
      blue: colors.blue,
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
        flicker: {
          "0%": {
            opacity: 0.27861,
          },
          "5%": {
            opacity: 0.34769,
          },
          "10%": {
            opacity: 0.23604,
          },
          "15%": {
            opacity: 0.90626,
          },
          "20%": {
            opacity: 0.18128,
          },
          "25%": {
            opacity: 0.83891,
          },
          "30%": {
            opacity: 0.65583,
          },
          "35%": {
            opacity: 0.67807,
          },
          "40%": {
            opacity: 0.26559,
          },
          "45%": {
            opacity: 0.84693,
          },
          "50%": {
            opacity: 0.96019,
          },
          "55%": {
            opacity: 0.08594,
          },
          "60%": {
            opacity: 0.20313,
          },
          "65%": {
            opacity: 0.71988,
          },
          "70%": {
            opacity: 0.53455,
          },
          "75%": {
            opacity: 0.37288,
          },
          "80%": {
            opacity: 0.71428,
          },
          "85%": {
            opacity: 0.70419,
          },
          "90%": {
            opacity: 0.7003,
          },
          "95%": {
            opacity: 0.36108,
          },
          "100%": {
            opacity: 0.24387,
          },
        },
      },
      animation: {
        "mobile-links": "link-floaters 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
