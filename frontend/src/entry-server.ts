import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Layout from './Layout.vue'
import { getPrerenderUrls, matchUrl } from './app/routes'

export { getPrerenderUrls }

export interface RenderResult {
  title: string
  description: string
  html: string
  statusCode: number
}

export async function render(pathname: string): Promise<RenderResult> {
  const page = matchUrl(pathname)

  if (!page) {
    return {
      title: '页面不存在 - 知知喵的博客',
      description: '',
      html: '<section><p>页面不存在</p></section>',
      statusCode: 404,
    }
  }

  const App = {
    render() {
      return h(Layout, null, { default: () => h(page.component, page.props) })
    },
  }

  const app = createSSRApp(App)
  const html = await renderToString(app)

  return {
    title: page.title,
    description: page.description,
    html,
    statusCode: page.statusCode,
  }
}