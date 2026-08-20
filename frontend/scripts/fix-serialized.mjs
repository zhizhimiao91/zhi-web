import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 还原 Vike JSON 序列化器的转义（\u003c -> <，\/ -> /），
// 让构建产物里的内联 JSON / pageContext.json 可读。
// 注意：只作用于 dist/client 下的 .html / .json 文件。

const clientDir = fileURLToPath(new URL('../dist/client', import.meta.url))

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(path)
    } else if (/\.(html|json)$/.test(entry.name)) {
      const original = readFileSync(path, 'utf-8')
      const updated = original
        .replaceAll('\\u003c', '<')
        .replaceAll('\\/', '/')
      if (updated !== original) {
        writeFileSync(path, updated)
      }
    }
  }
}

walk(clientDir)
