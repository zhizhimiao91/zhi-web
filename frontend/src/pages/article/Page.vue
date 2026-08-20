<script setup lang="ts">
const props = defineProps({ data: { type: Object, required: true } })

const base = import.meta.env.BASE_URL
const article = props.data.article
</script>

<template>
  <article>
    <header class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>{{ article.date }}</span>
        <span>·</span>
        <a :href="`${base}page/${article.category}`">{{ article.categoryName }}</a>
      </div>
    </header>

    <div class="article-content" v-html="article.contentHtml" />

    <footer class="article-footer">
      <a :href="`${base}page/${article.category}/${article.slug}`">
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