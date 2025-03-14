import { env } from './src/configs/env';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({ 
      svgrOptions: {
        // svgr options
      },
    }),
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
  },
  server: {
    port: env.VITE_SERVER_PORT
  }
})
