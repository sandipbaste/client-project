import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: [
      'jeevan-samruddhi-spirulina.onrender.com',
      '.onrender.com', // allows all Render subdomains
      'localhost',
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spirulina-dark': '#0a2e1f',
        'spirulina-green': '#1b5e3f',
        'spirulina-light': '#e8f5e9',
        'spirulina-accent': '#4caf50',
        'spirulina-mint': '#a5d6a7',
        'spirulina-emerald': '#10b981',
        'spirulina-teal': '#14b8a6',
        'spirulina-lime': '#84cc16',
        'spirulina-gold': '#f59e0b',
        'spirulina-sun': '#fbbf24',
        'spirulina-coral': '#fb7185',
        'spirulina-berry': '#a855f7',
        'spirulina-sky': '#0ea5e9',
        'spirulina-ocean': '#0891b2',
        'spirulina-cream': '#fefce8',
        'spirulina-peach': '#fed7aa',
      },
      fontFamily: {
        'marathi': ['Mukta', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
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
})
