/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
          light: '#5eead4',
          neon: '#00ffe7',
          neon2: '#00c3ff',
        },
        dark: {
          DEFAULT: '#181a20',
          darker: '#101117',
          lighter: '#23263a',
          glass: 'rgba(24,26,32,0.7)',
          glassLight: 'rgba(35,38,58,0.4)',
        },
        borderGlass: 'rgba(255,255,255,0.08)',
        borderNeon: '#00ffe7',
        gradient1: 'linear-gradient(135deg, #23263a 0%, #0f172a 100%)',
        gradient2: 'linear-gradient(135deg, #00ffe7 0%, #14b8a6 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        neon: '0 0 16px #00ffe7',
        accent: '0 2px 8px 0 #14b8a6',
      },
      backdropBlur: {
        glass: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


