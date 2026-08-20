import { Hono } from 'hono'
import { db } from '../db.js'

export const articlesRouter = new Hono()

// 文章列表（文章正文由前端 SSG 从 content/ 生成，此处提供 JSON 接口供扩展）
articlesRouter.get('/', (c) => {
  const rows = db
    .prepare('SELECT slug, count AS views FROM views ORDER BY count DESC')
    .all()
  return c.json({ articles: rows })
})

// 单篇文章的附加数据（浏览量）
articlesRouter.get('/:slug', (c) => {
  const { slug } = c.req.param()
  const row = db.prepare('SELECT slug, count FROM views WHERE slug = ?').get(slug)
  return c.json({ slug, views: row?.count ?? 0 })
})

// 阅读计数 +1
articlesRouter.post('/:slug/views', (c) => {
  const { slug } = c.req.param()
  db.prepare(
    'INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1',
  ).run(slug)
  const row = db.prepare('SELECT count FROM views WHERE slug = ?').get(slug)
  return c.json({ slug, views: row?.count ?? 1 })
})
