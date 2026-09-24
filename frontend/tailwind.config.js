/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'spirulina-dark': '#0a2e1f',
        'spirulina-green': '#1b5e3f',
        'spirulina-light': '#e8f5e9',
        'spirulina-emerald': '#10b981',
        'spirulina-teal': '#14b8a6',
        'spirulina-gold': '#f59e0b',
        'spirulina-sun': '#fbbf24',
        'spirulina-coral': '#fb7185',
        'spirulina-berry': '#a855f7',
        'spirulina-sky': '#0ea5e9',
        'spirulina-ocean': '#0891b2',
        'spirulina-cream': '#fefce8',
        'spirulina-peach': '#fed7aa',
        'spirulina-mint': '#a5d6a7',
        'spirulina-accent': '#4caf50',
        'spirulina-lime': '#84cc16',
      },
      fontFamily: { marathi: ['Mukta', 'sans-serif'] },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}