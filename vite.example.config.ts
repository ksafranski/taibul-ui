import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  root: 'example',
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'design-system': path.resolve(__dirname, './src'),
      'taibul-ui/style.css': path.resolve(__dirname, './src/index.css'),
      'taibul-ui': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../dist-example',
    emptyOutDir: true,
  },
})
