import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
        xs: "0.75rem",
        tiny: "0.875rem",
      },
      lineHeight: {
        xxs: "0.875rem",
        xs: "1rem",
        tiny: "1.15rem",
      },
      screens: {
        xs: "475px",
        mds: "799px",
        mdl: "910px",
        "3xl": "1760px",
      },
      backgroundImage: {
        "darkblue2blue-gradient":
          "linear-gradient(to bottom right, rgb(var(--color-darkblue)), rgb(var(--color-blue)))",
        "black2darkblue-gradient":
          "radial-gradient(circle at 0% 100%, rgb(var(--color-black)) 0%, transparent 60%), radial-gradient(circle at 14% 86%, rgb(var(--color-darkblue)) 20%, transparent 70%), radial-gradient(circle at 29% 71%, rgb(var(--color-black)) 20%, transparent 70%), radial-gradient(circle at 83% 17%, rgb(var(--color-darkblue)) 30%, transparent 90%), radial-gradient(circle at 57% 43%, rgb(var(--color-black)) 40%, transparent 90%), radial-gradient(circle at 91% 89%, rgb(var(--color-black)) 90%, transparent 80%), radial-gradient(circle at 86% 14%, rgb(var(--color-black)) 60%, transparent 70%), radial-gradient(circle at 100% 0%, rgb(var(--color-darkblue)) 50%, transparent 60%)",
      },
      colors: {
        close2White: "rgb(var(--color-close2White) / <alpha-value>)",
        blue: "rgb(var(--color-blue) / <alpha-value>)",
        darkblue: "rgb(var(--color-darkblue) / <alpha-value>)",
        black: "rgb(var(--color-black) / <alpha-value>)",
      },
      padding: {
        navbar: "var(--navbar)",
      },
      margin: {
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
      inset: {
        navbar: "var(--navbar)",
      },
      boxShadow: {
        navbarShadow: "0px 3px 20px 3px rgba(186, 182, 182, 1)",
        whiteShadow: "0px 0px 20px 3px rgba(186, 182, 182, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
