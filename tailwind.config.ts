import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        nav_cards: "1282px",
        nav_lg: "968px",
        nav_md: "576px",
        nav_sm: "385px",
        wallet_md: "718px",
        trans_md: "800px"
      },
      
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
export default config;