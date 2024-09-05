import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#0c487f',
        'newPrimary': '#B1D8FB',
        'end': '#4398e7',
        'secondary':'#878787',
        'extra':'#083148',
        'textExtra':"#084E8E",
        'tableColor':"#347EC2",
        'third':'#5E5F5F',
        'buttonOutline':'#878787',
        'textInput':'#F8FFA2'

      },
      fontFamily: {
        'noto-sans-thai': ['Noto Sans Thai', 'sans-serif'],
        'ibm-plex-sans-thai': ['IBM Plex Sans Thai', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
