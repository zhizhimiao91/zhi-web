import { loadAllArticles } from '../../lib/articles.server'

export { data }
export type Data = Awaited<ReturnType<typeof data>>

async function data() {
  const articles = loadAllArticles()
  const categories = [...new Set(articles.map((article) => article.category))]
  return { articles, categories }
}
