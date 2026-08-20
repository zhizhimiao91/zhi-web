import vue from '@vitejs/plugin-vue'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), vike()],
  // 子域名绑定根路径，Base URL 保持 '/'，无需额外 base 配置
})
