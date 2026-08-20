import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { allowedOrigins, HOST, PORT } from './app/Foundation/config.js'
import { api } from './app/Foundation/api.js'

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

app.route('/api', api)

serve({ fetch: app.fetch, port: PORT, hostname: HOST }, (info) => {
  console.log(`[zhi-web] API listening on http://${info.address}:${info.port}`)
})
