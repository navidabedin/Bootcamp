import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ⚠️ این مقدار باید دقیقاً نام ریپوی گیتهاب باشد
const REPO_NAME = 'product-recommender'

export default defineConfig(({ command }) => ({
  // در dev از ریشه، در build از زیرمسیر ریپو (لازمهی GitHub Pages)
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist', sourcemap: false },
}))
