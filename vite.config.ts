import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // این خط مهم
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(), // این خط مهم
  ],
  base: '/vue-shop/',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.escuelajs.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
})
