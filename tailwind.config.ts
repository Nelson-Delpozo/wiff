import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        paint: ['Paint', 'sans-serif'], // Replace 'MyFont' with your font name
      },
      colors: {
        gold: "#EFBF04", // Your custom gold color
      },
    },
  },
  plugins: [],
} satisfies Config;
