import { marked } from 'marked'

marked.use({
  gfm: true,
  breaks: false,
})

export function renderMarkdown(src: string): string {
  return marked.parse(src, { async: false }) as string
}
