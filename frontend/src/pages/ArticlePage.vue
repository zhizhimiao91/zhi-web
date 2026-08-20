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

