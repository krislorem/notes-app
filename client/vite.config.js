import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from "unocss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Unocss()],
  assetsInclude: ['**/*.TTF'],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd'],
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['axios']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'cherry-markdown/dist/fonts/ch-icon.woff2'
    ]
  }
})
