import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const template = readFileSync(join(root, 'template.html'), 'utf-8')

const server = await createServer({
  configFile: join(root, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
})

// 开发模式加载全部 CSS（构建时由 SSG 按需注入）
const devCss = [
  '/src/styles/style.css',
  '/src/styles/index.css',
  '/src/styles/page/category/style.css',
  '/src/styles/page/article/style.css',
].map((f) => `<link rel="stylesheet" href="${f}">`).join('\n')

server.middlewares.use(async (req, res, next) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    const pathname = url.pathname

    const { render } = await server.ssrLoadModule('/src/entry-server.ts')
    const { title, description, html, statusCode } = await render(
      pathname.replace(/\/+$/, '') || '/',
    )

    let out = template
      .replace('__TITLE__', title)
      .replace('__DESCRIPTION__', description)
      .replace('__CSS__', devCss)
      .replace('__HTML__', html)
      .replace('__JS__', '')

    out = await server.transformIndexHtml(req.url, out)

    res.statusCode = statusCode
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(out)
  } catch (e) {
    next(e)
  }
})

const port = Number(process.env.PORT ?? 5173)
server.listen(port, () => {
  console.log(`[zhi-web] dev http://localhost:${port}`)
})