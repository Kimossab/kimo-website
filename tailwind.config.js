/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['roboto'],
    },
    extend: {
      backgroundImage: {
        'noise-pattern': "url('@/assets/bg.png')",
      },
      spacing: {
        content: "calc(99vh - theme('spacing.24') - theme('spacing.12') - theme('spacing.24'))",
        "content-width": "calc(100% - 60rem)",
        "content-padding": "max(0px, calc((100% - 60rem) / 2));",
        'home-nav': "min(41rem, 50vw)",
        'nav-p-x': `calc(theme('spacing.home-nav') / ${3.73205080757 * 2})`
      }
    },
  },
  plugins: [],
}

