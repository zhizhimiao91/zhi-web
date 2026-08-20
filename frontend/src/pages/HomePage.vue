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

