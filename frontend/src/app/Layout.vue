<script setup lang="ts">
const base = import.meta.env.BASE_URL
</script>

<template>
  <div class="layout">
    <header class="site-header">
      <a :href="`${base}`" class="site-title">知知喵的博客</a>
      <nav class="site-nav">
        <a :href="`${base}`">首页</a>
      </nav>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} 知知喵</span>
    </footer>
  </div>
</template>

