import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // Hacer que las variables de entorno estén disponibles en el código
      'process.env': env
    },
    server: {
      port: Number(env.VITE_DEV_SERVER_PORT) || 5173,
    },
    build: {
      outDir: 'dist'
    }
  }
})