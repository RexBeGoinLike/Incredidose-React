import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(
  {
    server: {
      allowedHosts: ['phenotypically-heterotypic-thomas.ngrok-free.dev'],
      proxy: {
        '/server/includes': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server\/includes/, '')
        },
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
      }
    },
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
      react(), tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
)