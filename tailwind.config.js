module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#272643",
        accent: "#e3f6f5",
        teritory: "#bae8e8",
        teritory2: "#2c698d",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),

  ],
};
