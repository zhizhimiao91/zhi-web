import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const configFile = join(root, 'vite.config.ts')
const template = readFileSync(join(root, 'template.html'), 'utf-8')
const base = process.env.BASE_URL ?? '/'

// 1. 构建客户端（产出资源 + manifest）
console.log('[ssg] building client bundle...')
await build({ configFile })

// 2. 构建 SSR bundle
console.log('[ssg] building SSR bundle...')
await build({
  configFile,
  build: {
    ssr: join(root, 'src/entry-server.ts'),
    outDir: join(root, 'dist/server'),
    emptyOutDir: false,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
})

// 3. 加载 SSR 入口
const { render, getPrerenderUrls } = await import(
  pathToFileURL(join(root, 'dist/server/entry-server.mjs'))
)

// 4. 读取 manifest 获取资源路径
const clientOut = join(root, 'dist/client')
const manifest = JSON.parse(
  readFileSync(join(clientOut, '.vite/manifest.json'), 'utf-8'),
)

function buildPageAssets(entryKey, extraEntryKey) {
  const mainEntry = manifest[entryKey]
  const extraEntry = extraEntryKey ? manifest[extraEntryKey] : null
  const cssFiles = [...(mainEntry.css ?? []), ...(extraEntry?.css ?? [])]
  const cssLinks = cssFiles
    .map((f) => `<link rel="stylesheet" href="${base}${f}">`)
    .join('\n')
  const jsScript = `<script type="module" src="${base}${mainEntry.file}"></script>`
  return { cssLinks, jsScript }
}

// 5. 渲染每个页面
function fillTemplate(title, description, html, cssLinks, jsScript) {
  return template
    .replace('__TITLE__', title)
    .replace('__DESCRIPTION__', description)
    .replace('__CSS__', cssLinks)
    .replace('__HTML__', html)
    .replace('__JS__', jsScript)
}

const urls = getPrerenderUrls()
console.log(`[ssg] prerendering ${urls.length} pages...`)
for (const url of urls) {
  const { title, description, html } = await render(url)

  // 按路由类型选择对应 CSS
  const assets =
    url === '/'
      ? buildPageAssets('src/entry-client.ts', 'src/entry-client-home.ts')
      : url.startsWith('/page/') && url.split('/').length === 4
        ? buildPageAssets('src/entry-client.ts', 'src/entry-client-article.ts')
        : url.startsWith('/page/')
          ? buildPageAssets('src/entry-client.ts', 'src/entry-client-category.ts')
          : buildPageAssets('src/entry-client.ts')

  const outFile =
    url === '/' ? join(clientOut, 'index.html') : join(clientOut, url, 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, fillTemplate(title, description, html, assets.cssLinks, assets.jsScript))
  console.log(`  ${url}`)
}

// 6. 404 页
const notFound = await render('/this-page-does-not-exist')
writeFileSync(
  join(clientOut, '404.html'),
  fillTemplate(notFound.title, notFound.description, notFound.html, '', ''),
)
console.log('  404.html')

console.log('[ssg] done')