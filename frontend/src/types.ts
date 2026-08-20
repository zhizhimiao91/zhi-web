import type { Component } from 'vue'
import type { Article, ArticleMeta } from '../lib/articles'

export interface CategoryInfo {
  key: string
  name: string
}
export interface HomeData {
  articles: ArticleMeta[]
  categories: CategoryInfo[]
}
export interface CategoryData {
  category: string
  categoryName: string
  articles: ArticleMeta[]
}
export interface ArticleData {
  article: Article
}

export interface PageResult {
  component: Component
  props: Record<string, unknown>
  title: string
  description: string
  statusCode: number
}