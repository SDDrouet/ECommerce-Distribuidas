import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno definidas en .env y .env.[mode]
  const env = loadEnv(mode, process.cwd(), '')
  // Leer la variable VITE_DEV_SERVER_PORT, o usar 5173 por defecto
  const port = Number(env.VITE_DEV_SERVER_PORT) || 5173

  return {
    plugins: [react()],
    server: {
      port, // Se usa el puerto configurado en el .env
    },
    esbuild: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
})
