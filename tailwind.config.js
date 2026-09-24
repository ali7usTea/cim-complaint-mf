/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  content: ["./index.html",
            './app/**/*.{js,ts,jsx,tsx}', 
            './components/**/*.{js,ts,jsx,tsx}', 
            './pages/**/*.{js,ts,jsx,tsx}',
          ],
  darkMode: 'class', // false or 'media' or 'class'
 theme: {
    extend: {
      colors: {
        "primary": "rgb(var(--color-primary) / <alpha-value>)",
        "mauves": "rgb(var(--color-mauves) / <alpha-value>)",
        "green": "rgb(var(--color-green) / <alpha-value>)",
        "default": "rgb(var(--color-default) / <alpha-value>)",
        "brand-primary": "rgb(var(--color-primary) / <alpha-value>)",
        "warning": "rgb(var(--color-warning) / <alpha-value>)",
        "error": "rgb(var(--color-error) / <alpha-value>)",
        "info": "rgb(var(--color-info) / <alpha-value>)",
      },
      fontFamily: {
        'suisse_intlregular': ['var(--font-suisse-intlregular)', 'sans-serif'],
        'suisse_intlblack': ['var(--font-suisse-intlblack)', 'sans-serif'],
        'suisse_intlbold': ['var(--font-suisse-intlbold)', 'sans-serif'],
        'suisse_intlbook': ['var(--font-suisse-intlbook)', 'sans-serif'],
        'suisse_intllight': ['var(--font-suisse-intllight)', 'sans-serif'],
        'suisse_intlmedium': ['var(--font-suisse-intlmedium)', 'sans-serif'],
        'suisse_intlitalic': ['var(--font-suisse-intlitalic)', 'sans-serif'],
        'suisse_intlsemi_bold': ['var(--font-suisse-intlsemi_bold)', 'sans-serif'],
        'suisse_intlthin': ['var(--font-suisse-intlthin)', 'sans-serif'],
        'suisse_intlultralight': ['var(--font-suisse-intlultralight)', 'sans-serif'],
      },
      spacing: {
        'table-cell-horizontal-spacing': "10px",
        'table-cell-vertical-spacing': "14px",
      },
    },
  },
  plugins: [],
}

