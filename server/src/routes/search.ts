import { Hono } from 'hono'
import { db } from '../db.js'

export const searchRouter = new Hono()

// 站内搜索：骨架阶段搜索评论内容，后续可扩展文章正文索引
searchRouter.get('/', (c) => {
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
