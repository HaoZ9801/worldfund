import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Ensure this matches the port your Express server is running on
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
