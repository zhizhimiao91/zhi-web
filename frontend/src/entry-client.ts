// 客户端入口：不 hydration（SSG 纯静态），仅收集组件样式 + 轻量交互
import './styles.css'
import './pages-manifest'

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