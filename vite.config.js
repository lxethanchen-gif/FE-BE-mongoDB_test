import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // 加上這行，讓打包後的資源能正確對應 GitHub Pages 的路徑
  // 注意：前後都要有斜線，例如 '/my-website/'
  base: 'FE-BE-mongoDB_test',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
