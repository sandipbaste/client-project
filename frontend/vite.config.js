import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',   // ✅ हे महत्त्वाचे आहे!
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 10000,
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