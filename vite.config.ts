import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells Vite to forward any request to '/api'
      '/api': {
        // This should be the address of your Vercel dev server
        target: 'https://anomaly-nine.vercel.app/', 
        changeOrigin: true,
        // Optional: You can remove '/api' from the forwarded request if needed
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})
