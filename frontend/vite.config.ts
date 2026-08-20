import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_URL ?? '/',
  server: {
    allowedHosts: ['.monkeycode-ai.online'],
  },
  preview: {
    allowedHosts: ['.monkeycode-ai.online'],
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'src/entry-client.ts',
    },
  },
})