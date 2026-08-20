import type { PageContextServer } from 'vike/types'
import { render } from 'vike/abort'
import { loadArticleBySlug } from '../../../../lib/articles.server'

export { data }
export type Data = Awaited<ReturnType<typeof data>>

async function data(pageContext: PageContextServer) {
  const { category, slug } = pageContext.routeParams
  const article = loadArticleBySlug(category, slug)

  if (!article) {
    throw render(404, `文章不存在：${slug}`)
  }

  return { article }
}
