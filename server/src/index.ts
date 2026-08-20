import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { allowedOrigins, HOST, PORT } from './config.js'
import { articlesRouter } from './routes/articles.js'
import { healthRouter } from './routes/health.js'
import { searchRouter } from './routes/search.js'

const app = new Hono()

// CORS 白名单：只放行自己的文章域名
// 未配置 ALLOWED_ORIGINS 时（开发环境）放行所有来源；部署时务必配置。
app.use(
  '/api/*',
  cors({
    origin: (origin) => {
      if (allowedOrigins.length === 0) return origin
      if (origin && allowedOrigins.includes(origin)) return origin
      return null
    },
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.route('/api/articles', articlesRouter)
app.route('/api/search', searchRouter)
app.route('/api/health', healthRouter)

serve({ fetch: app.fetch, port: PORT, hostname: HOST }, (info) => {
  console.log(`[zhi-web] API listening on http://${info.address}:${info.port}`)
})
