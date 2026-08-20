import { Hono } from 'hono'
import { db } from './db.js'

// API 路由（应用骨架的一部分，随 Foundation 分层）
export const api = new Hono()

// 健康检查
api.get('/health', (c) =>
  c.json({ status: 'ok', time: new Date().toISOString() }),
)

// 文章相关（浏览量等，正文由前端 SSG 从 content/ 生成）
api.get('/articles', (c) => {
  const rows = db
    .prepare('SELECT slug, count AS views FROM views ORDER BY count DESC')
    .all()
  return c.json({ articles: rows })
})

api.get('/articles/:slug', (c) => {
  const { slug } = c.req.param()
  const row = db.prepare('SELECT slug, count FROM views WHERE slug = ?').get(slug)
  return c.json({ slug, views: row?.count ?? 0 })
})

api.post('/articles/:slug/views', (c) => {
  const { slug } = c.req.param()
  db.prepare(
    'INSERT INTO views (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1',
  ).run(slug)
  const row = db.prepare('SELECT count FROM views WHERE slug = ?').get(slug)
  return c.json({ slug, views: row?.count ?? 1 })
})

// 站内搜索（骨架阶段先搜评论，后续可扩展文章正文索引）
api.get('/search', (c) => {
  const q = (c.req.query('q') ?? '').trim()

  if (!q) {
    return c.json({ query: q, results: [] })
  }

  const results = db
    .prepare(
      `SELECT id, slug, author, content, created_at
       FROM comments
       WHERE content LIKE ? OR author LIKE ?
       ORDER BY created_at DESC`,
    )
    .all(`%${q}%`, `%${q}%`)

  return c.json({ query: q, results })
})