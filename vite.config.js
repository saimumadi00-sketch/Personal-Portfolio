import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const normalized = id.replaceAll('\\', '/')
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom)\//.test(normalized)) {
            return 'vendor-react'
          }
          if (normalized.includes('/node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          if (normalized.includes('/node_modules/bootstrap/')) {
            return 'vendor-bootstrap'
          }
          if (
            normalized.includes('/node_modules/react-countup/') ||
            normalized.includes('/node_modules/react-intersection-observer/') ||
            normalized.includes('/node_modules/react-helmet-async/')
          ) {
            return 'vendor-ui'
          }
          return undefined
        },
      },
    },
  },
})
