import { loadAllArticles } from '../../lib/articles.server'

export { data }
export type Data = Awaited<ReturnType<typeof data>>

async function data() {
  const articles = loadAllArticles()

  // 分类去重：key 用于 URL，name 用于中文显示
  const categoryMap = new Map<string, string>()
  for (const article of articles) {
    categoryMap.set(article.category, article.categoryName)
  }
  const categories = [...categoryMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, name]) => ({ key, name }))

  return { articles, categories }
}
