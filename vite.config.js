import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Permite desplegar en GitHub Pages o cualquier subruta sin romperse
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Permite conectarse desde el teléfono móvil en la red local
    port: 5173
  }
})
