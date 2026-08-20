<script setup lang="ts">
defineProps({ data: { type: Object, required: true } })

const base = import.meta.env.BASE_URL

function articleHref(category: string, slug: string) {
  return `${base}page/${category}/${slug}`
}
</script>

<template>
  <section>
    <h1 class="page-title">分类：{{ data.categoryName }}</h1>

    <ul class="article-list">
      <li v-for="article in data.articles" :key="article.slug">
        <a :href="articleHref(article.category, article.slug)">
          <span class="title">{{ article.title }}</span>
          <span class="meta">{{ article.date }}</span>
        </a>
        <p v-if="article.summary" class="summary">{{ article.summary }}</p>
      </li>
    </ul>
  </section>
</template>

