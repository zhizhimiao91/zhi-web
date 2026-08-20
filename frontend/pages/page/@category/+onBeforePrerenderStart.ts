import type { OnBeforePrerenderStartAsync } from 'vike/types'
import { loadAllArticles } from '../../../lib/articles.server'

export { onBeforePrerenderStart }

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
  const categories = [...new Set(loadAllArticles().map((article) => article.category))]
  return categories.map((category) => `/page/${category}`)
}
