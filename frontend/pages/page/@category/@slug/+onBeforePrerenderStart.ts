import type { OnBeforePrerenderStartAsync } from 'vike/types'
import { loadAllArticles } from '../../../../lib/articles.server'

export { onBeforePrerenderStart }

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
  return loadAllArticles().map((article) => `/page/${article.category}/${article.slug}`)
}
