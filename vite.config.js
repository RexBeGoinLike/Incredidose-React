import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(
  {
    server: {
      proxy: {
        // Proxy requests starting with '/api'
        '/server': {
          target: 'http://localhost/Incredidose',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/, '') // ADD THIS LINE
        }
      },
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