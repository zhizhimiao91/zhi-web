import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 构建后处理：让 dist/client 下的产物 JSON 人类可读。
// - .json 文件：整体 pretty-print（缩进 + 分行）
// - .html 里的 vike_pageContext 内联 JSON：同样 pretty-print
// 说明：字符串值内的换行（\n）是 JSON 规范必须的转义，还原成真换行会破坏 JSON 语法。

const clientDir = fileURLToPath(new URL('../dist/client', import.meta.url))

function prettyJson(text) {
  return JSON.stringify(JSON.parse(text), null, 2)
}

function prettyHtmlInlineJson(html) {
  const re = /(<script id="vike_pageContext"[^>]*>)([\s\S]*?)(<\/script>)/
  return html.replace(re, (match, open, json, close) => {
    try {
      return open + JSON.stringify(JSON.parse(json), null, 2) + close
    } catch {
      return match
    }
  })
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(path)
    } else if (entry.name.endsWith('.json')) {
      try {
        writeFileSync(path, prettyJson(readFileSync(path, 'utf-8')))
      } catch {
        // 非标准 JSON，跳过
      }
    } else if (entry.name.endsWith('.html')) {
      writeFileSync(path, prettyHtmlInlineJson(readFileSync(path, 'utf-8')))
    }
  }
}

walk(clientDir)
