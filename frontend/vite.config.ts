import vue from '@vitejs/plugin-vue'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), vike()],
  // 默认 github.io/zhi-web/ 部署用 /zhi-web/，绑定自定义子域名后用 /（部署时通过 BASE_URL 控制）
  base: process.env.BASE_URL ?? '/',
  server: {
    allowedHosts: ['.monkeycode-ai.online'],
  },
  preview: {
    allowedHosts: ['.monkeycode-ai.online'],
  },
})
