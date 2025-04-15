import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(-45deg, var(--cor-1), var(--cor-2), var(--cor-3), var(--cor-4))',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
    fontFamily: {
      poppins: ['var(--fonte-primaria)', 'sans-serif'],
      boogaloo: ['var(--fonte-secundaria)', 'sans-serif'],
    },
  },
  plugins: [],
} satisfies Config;
