export interface ArticleMeta {
  /** URL slug（英文，文件名） */
  slug: string
  /** URL 分类 key（英文，目录名） */
  category: string
  /** 分类中文显示名 */
  categoryName: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export interface ArticleSummary extends ArticleMeta {}

export interface Article extends ArticleMeta {
  /** Markdown 渲染后的 HTML */
  contentHtml: string
}

interface ParsedFrontmatter {
  meta: Partial<ArticleMeta>
  content: string
}

/**
 * 解析文章 frontmatter（--- 块）。
 * 纯函数，客户端/服务端通用。
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const meta: Partial<ArticleMeta> = {}
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)

  if (!match) {
    return { meta, content: raw }
  }

  const block = match[1]
  const content = raw.slice(match[0].length)

  for (const line of block.split(/\r?\n/)) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    let value = line.slice(sep + 1).trim()

    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    if (isQuoted) {
      value = value.slice(1, -1)
    }

    switch (key) {
      case 'title':
        meta.title = value
        break
      case 'category':
        meta.category = value
        break
      case 'categoryName':
        meta.categoryName = value
        break
      case 'date':
        meta.date = value
        break
      case 'summary':
        meta.summary = value
        break
      case 'tags':
        meta.tags = value
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
        break
    }
  }

  return { meta, content }
}
