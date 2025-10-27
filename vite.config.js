import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// Dominio propio ⇒ base en "/"
export default defineConfig({
  plugins: [react(), UnoCSS()],
  base: '/',            // ⚠️ Importante para custom domain
  build: { outDir: 'dist' }
})
