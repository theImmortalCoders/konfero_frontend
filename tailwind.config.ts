import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        close2White: "rgb(var(--color-close2White) / <alpha-value>)",
      },
      padding: {
        navbar: "var(--navbar)",
      },
      height: {
        navbar: "var(--navbar)",
      },
      minHeight: {
        navbar: "var(--navbar)",
        max: "calc(100vh - var(--navbar))",
      },
      minWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
      maxHeight: {
        max: "calc(100vh - var(--navbar))",
      },
      maxWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
    },
  },
  plugins: [],
};
export default config;
