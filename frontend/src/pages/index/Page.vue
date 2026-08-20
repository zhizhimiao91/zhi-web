<script setup lang="ts">
const props = defineProps({ data: { type: Object, required: true } })

const base = import.meta.env.BASE_URL

function categoryHref(category: string) {
  return `${base}page/${category}`
}

function articleHref(category: string, slug: string) {
  return `${base}page/${category}/${slug}`
}
</script>

<template>
  <section>
    <nav class="categories" v-if="data.categories.length > 0">
      <span>分类：</span>
      <a
        v-for="category in data.categories"
        :key="category.key"
        :href="categoryHref(category.key)"
      >
        {{ category.name }}
      </a>
    </nav>

    <ul class="article-list">
      <li v-for="article in data.articles" :key="article.slug">
        <a :href="articleHref(article.category, article.slug)">
          <span class="title">{{ article.title }}</span>
          <span class="meta">{{ article.date }} · {{ article.categoryName }}</span>
        </a>
        <p v-if="article.summary" class="summary">{{ article.summary }}</p>
      </li>
    </ul>

    <p v-if="data.articles.length === 0" class="empty">暂无文章</p>
  </section>
</template>

<style scoped>
.categories {
  margin-bottom: 1.5rem;
}
.categories a {
  margin-right: 0.75rem;
  color: #2563eb;
  text-decoration: none;
}
.categories a:hover {
  text-decoration: underline;
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
.empty {
  color: #9ca3af;
}
</style>