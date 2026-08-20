// 客户端入口（通用）：不 hydration（SSG 纯静态），仅收集组件样式 + 轻量交互
import './styles/style.css'
// 显式引用组件，防止 tree-shaking 移除 scoped style
import Layout from './app/Layout.vue'
import IndexPage from './pages/HomePage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import ArticlePage from './pages/ArticlePage.vue'
globalThis.__ZHI_COMPONENTS = { Layout, IndexPage, CategoryPage, ArticlePage }

// 浏览量上报
const m = location.pathname.match(/\/page\/[^/]+\/([^/]+)/)
if (m) {
  const api = import.meta.env.VITE_API_BASE
  if (api) {
    fetch(`${api}/api/articles/${m[1]}/views`, { method: 'POST' }).catch(() => {
      /* 静默 */
    })
  }
}