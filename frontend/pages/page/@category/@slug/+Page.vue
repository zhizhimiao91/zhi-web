<script setup lang="ts">
import { useData } from 'vike-vue/useData'
import type { Data } from './+data'

const data = useData<Data>()
const article = data.article

const base = import.meta.env.BASE_URL
const categoryHref = `${base}page/${article.category}`
const articleHref = `${base}page/${article.category}/${article.slug}`
</script>

<template>
  <article>
    <header class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>{{ article.date }}</span>
        <span>·</span>
        <a :href="categoryHref">{{ article.categoryName }}</a>
      </div>
    </header>

    <div class="article-content" v-html="article.contentHtml" />

    <footer class="article-footer">
      <a :href="articleHref">
        固定链接
      </a>
    </footer>
  </article>
</template>

<style scoped>
.article-header {
  margin-bottom: 1.5rem;
}

.article-title {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
}

.article-meta {
  color: #9ca3af;
  font-size: 0.875rem;
}

.article-meta a {
  color: #2563eb;
  text-decoration: none;
}

.article-content {
  line-height: 1.75;
  word-wrap: break-word;
}

.article-footer {
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  font-size: 0.875rem;
}

.article-footer a {
  color: #9ca3af;
  text-decoration: none;
}
</style>
