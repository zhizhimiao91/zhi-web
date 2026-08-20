import type { PageContextServer } from 'vike/types'
import { render } from 'vike/abort'
import { loadArticlesByCategory } from '../../../lib/articles.server'

export { data }
export type Data = Awaited<ReturnType<typeof data>>

async function data(pageContext: PageContextServer) {
  const category = pageContext.routeParams.category
  const articles = loadArticlesByCategory(category)

  if (articles.length === 0) {
    throw render(404, `分类 "${category}" 不存在`)
  }

  return { category, articles }
}
