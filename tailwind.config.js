/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      homeSegment: {
        background: "#918ed0",
      },
    },
    backgroundImage: () => ({
      "gradient-pastel-home": "linear-gradient(#9bc4fc, #d1c3fc)",
    }),
    fontFamily: {
      sans: ["var(--font-roboto)", ...fontFamily.sans],
    },
  },
};
export const plugins = [];
