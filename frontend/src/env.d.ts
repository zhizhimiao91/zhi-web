declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

// 客户端收集组件样式用（阻止 tree-shaking）
declare interface ZhiComponents {
  Layout: unknown
  IndexPage: unknown
  CategoryPage: unknown
  ArticlePage: unknown
}
declare var __ZHI_COMPONENTS: ZhiComponents