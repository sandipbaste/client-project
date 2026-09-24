import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 10000,   // <-- Render 10000 पोर्ट वापरतो
    strictPort: false,
    allowedHosts: [
      'jeevan-samruddhi-spirulina.onrender.com',
      '.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})