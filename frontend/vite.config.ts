import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/tasks': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
      },
      '/system': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
      },
      '/actuator': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
      },
    },
  },
})
