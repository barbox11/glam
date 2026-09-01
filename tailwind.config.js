/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        glam: {
          white: '#FAF7F5',
          cream: '#F4EFEB',
          paper: '#FBF8F5',
          rose: {
            50: '#FDF2F6',
            100: '#F8E5EC',
            200: '#F0C7D6',
            300: '#E89BB6',
            400: '#E84B8A',
            500: '#C0306B',
            600: '#9A1F53',
          },
          ink: '#0F0F12',
          muted: '#5C5C66',
          line: '#E8E2DD',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.32em',
      },
      maxWidth: {
        editorial: '1440px',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 1, 0.36, 1)',
        editorial: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};