import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',           // ✅ Listen on all interfaces
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      host: 'localhost',       // ✅ Prevents HMR from using the ngrok URL
    }
  }
})
