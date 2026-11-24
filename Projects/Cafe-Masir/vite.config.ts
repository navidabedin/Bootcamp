/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  
})
base: '/Bootcamp/' */




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // روی گیت‌هاب پیجز مسیر مخزن را می‌گیرد، روی لوکال همان اسلش معمولی
  base: mode === 'production' ? '/Bootcamp/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
}))
