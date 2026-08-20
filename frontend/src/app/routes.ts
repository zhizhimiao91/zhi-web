import { IndexPage, CategoryPage, ArticlePage } from '../pages-manifest'
import {
  loadAllArticles,
  loadArticleBySlug,
  loadArticlesByCategory,
} from '../lib/articles.server'
import type { PageResult } from '../lib/types'
import { matchPath } from './router'

function homePage(): PageResult {
  const articles = loadAllArticles()
  const categoryMap = new Map<string, string>()
  for (const a of articles) categoryMap.set(a.category, a.categoryName)
  const categories = [...categoryMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, name]) => ({ key, name }))

  return {
    component: IndexPage,
    props: { data: { articles, categories } },
    title: '知知喵的博客',
    description: '个人知识库与文章站',
    statusCode: 200,
  }
}

function categoryPage(category: string): PageResult | null {
  const articles = loadArticlesByCategory(category)
  if (articles.length === 0) return null
  return {
    component: CategoryPage,
    props: { data: { category, categoryName: articles[0].categoryName, articles } },
    title: `分类：${articles[0].categoryName} - 知知喵的博客`,
    description: '',
    statusCode: 200,
  }
}

function articlePage(category: string, slug: string): PageResult | null {
  const article = loadArticleBySlug(category, slug)
  if (!article) return null
  return {
    component: ArticlePage,
    props: { data: { article } },
    title: `${article.title} - 知知喵的博客`,
    description: article.summary,
    statusCode: 200,
  }
}

export function matchUrl(pathname: string): PageResult | null {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (matchPath('/', path)) return homePage()
  const cat = matchPath('/page/:category', path)
  if (cat) return categoryPage(cat.category)
  const art = matchPath('/page/:category/:slug', path)
  if (art) return articlePage(art.category, art.slug)
  return null
}

export function getPrerenderUrls(): string[] {
  const urls = ['/']
  const articles = loadAllArticles()
  const categories = [...new Set(articles.map((a) => a.category))]
  for (const c of categories) urls.push(`/page/${c}`)
  for (const a of articles) urls.push(`/page/${a.category}/${a.slug}`)
  return urls
}

