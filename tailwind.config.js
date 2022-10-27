module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      "4/sm": "160px",
      "2/sm": "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      width: {
        "custom-31": "31.871429%",
        "custom-66": "66%"
      }
    }
  },
  plugins: []
};
