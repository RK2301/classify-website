import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        tiny: '3px',
        sm: '5px',
        md: '7px',
        lg: '9px',
      },
      colors: {
        brand: {
          50: '#f3f7fc',
          100: '#e1ecf8',
          200: '#c3daf1',
          300: '#9cc1e5',
          400: '#6ea1d3',
          500: '#3f72af', // ⬅️ primary brand color
          600: '#335c92',
          700: '#2b4b77',
          800: '#243c5f',
          900: '#1d314d',
        }
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config