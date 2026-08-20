import type { OnBeforePrerenderStartAsync } from 'vike/types'
import { loadAllArticles } from '../../../lib/articles.server'

export { onBeforePrerenderStart }

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
  const categories = [...new Set(loadAllArticles().map((article) => article.category))]
  // 返回未编码 URL，让预渲染产物使用中文目录名，
  // 这样静态服务器（GitHub Pages）按解码后的请求路径能找到文件
  return categories.map((category) => `/page/${category}`)
}
