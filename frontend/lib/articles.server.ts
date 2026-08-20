import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Article } from './articles'
import { parseFrontmatter } from './articles'
import { renderMarkdown } from './markdown'

// content/ 目录：约定在 frontend/ 目录下运行 build/dev（cwd = frontend）
const contentDir = join(process.cwd(), '..', 'content')

function buildArticle(category: string, filename: string): Article {
  const slug = filename.replace(/\.md$/, '')
  const raw = readFileSync(join(contentDir, category, filename), 'utf-8')
  const { meta, content } = parseFrontmatter(raw)

  return {
    slug,
    category,
    title: meta.title ?? slug,
    date: meta.date ?? '1970-01-01',
    tags: meta.tags ?? [],
    summary: meta.summary ?? '',
    contentHtml: renderMarkdown(content),
  }
}

function listCategories(): string[] {
  return readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function listArticles(category: string): Article[] {
  return readdirSync(join(contentDir, category))
    .filter((name) => name.endsWith('.md'))
    .map((name) => buildArticle(category, name))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function loadAllArticles(): Article[] {
  return listCategories()
    .flatMap((category) => listArticles(category))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function loadArticlesByCategory(category: string): Article[] {
  return listArticles(category)
}

export function loadArticleBySlug(category: string, slug: string): Article | null {
  const article = listArticles(category).find((item) => item.slug === slug)
  return article ?? null
}
