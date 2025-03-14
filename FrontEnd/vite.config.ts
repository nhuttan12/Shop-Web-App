import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  // Tải biến môi trường dựa theo mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({ 
        svgrOptions: {
          // svgr options
        },
      }),
    ],
    define: {
      'process.env': {}
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    server: {
      port: Number(env.VITE_SERVER_PORT)
    }
  }
})