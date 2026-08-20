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

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 1rem;
}

.site-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.site-title {
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.site-nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #4b5563;
}

.site-nav a:hover {
  color: #111827;
}

.site-main {
  flex: 1;
  padding: 2rem 0;
}

.site-footer {
  padding: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
  color: #9ca3af;
  font-size: 0.875rem;
}
</style>
