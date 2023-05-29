import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    pages({
      routeStyle: 'nuxt'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
