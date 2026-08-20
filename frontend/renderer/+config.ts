import type { Config } from 'vike/types'
import vikeVue from 'vike-vue/config'

export default {
  extends: [vikeVue],

  lang: 'zh-CN',
  title: '知知喵的博客',
  description: '个人知识库与文章站',

  // SSG：构建时爬取所有页面并生成静态 HTML
  prerender: true,
} satisfies Config
