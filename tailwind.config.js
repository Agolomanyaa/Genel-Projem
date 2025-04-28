/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#252B42',
          'primary-dark': '#1b2031',
          secondary: '#23A6F0',
          'dark-text': '#252B42',
          'second-text': '#737373',
          'muted-text': '#BDBDBD',
          'light-bg': '#FAFAFA',
          'lighter-bg': '#F5F5F5',
        },
      },
    },
    plugins: [],
  }