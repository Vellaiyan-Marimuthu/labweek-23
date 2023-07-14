/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        blackOverlay: "rgba(0,0,0,0.7)",
      },
      width: {
        10: "10%",
        20: "20%",
        30: "30%",
        40: "40%",
        50: "50%",
        55: "55%",
        60: "60%",
        70: "70%",
        80: "80%",
        90: "90%",
        100: "100%",
      },
    },
  },
  plugins: [],
};
