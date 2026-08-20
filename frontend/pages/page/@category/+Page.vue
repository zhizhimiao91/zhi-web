<script setup lang="ts">
import { useData } from 'vike-vue/useData'
import { Head } from 'vike-vue/Head'
import type { Data } from './+data'

const data = useData<Data>()
</script>

<template>
  <section>
    <Head>
      <title>{{ data.category }} - 知知喵的博客</title>
    </Head>

    <h1 class="page-title">分类：{{ data.category }}</h1>

    <ul class="article-list">
      <li v-for="article in data.articles" :key="article.slug">
        <a :href="`/page/${encodeURIComponent(article.category)}/${encodeURIComponent(article.slug)}`">
          <span class="title">{{ article.title }}</span>
          <span class="meta">{{ article.date }}</span>
        </a>
        <p v-if="article.summary" class="summary">{{ article.summary }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.page-title {
  font-size: 1.375rem;
  margin-bottom: 1rem;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-list li {
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.article-list a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.article-list .title {
  font-size: 1.125rem;
  font-weight: 600;
}

.article-list .title:hover {
  color: #2563eb;
}

.article-list .meta {
  color: #9ca3af;
  font-size: 0.875rem;
  white-space: nowrap;
}

.article-list .summary {
  margin: 0.375rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
