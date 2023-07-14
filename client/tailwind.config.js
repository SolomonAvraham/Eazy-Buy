/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wh-10": "#F4F4F4",
        "wh-50": "#FBFBFB",
        "wh-100": "#C9C9C9",
        "wh-300": "#939393",
        "wh-500": "#595959",
        "wh-900": "#0F0F0F",
        "accent-red": "#EA9648",
        "accent-orange": "#F6CF68",
        "accent-green": "#C2E9B4",
      },
      screens: {
        sm: "0px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        one: " 'Acme' ,sans-'serif'",
        two: " 'M PLUS 1p',sans-serif  ",
        three: " 'Amatic SC', sans-serif",
      },
    },
  },
  plugins: [],
};
