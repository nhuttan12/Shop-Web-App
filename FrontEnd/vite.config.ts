import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define:{
    'process.env':{}
  },
  optimizeDeps: {
    esbuildOptions: {
      // Thêm định nghĩa global để polyfill process nếu cần
      define: {
        global: 'globalThis'
      }
    }
  }
})
