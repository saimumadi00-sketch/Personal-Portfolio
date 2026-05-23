import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 650,
    rolldownOptions: {
      checks: {
        pluginTimings: false,
      },
    },
  },
  plugins: [react()],
})
