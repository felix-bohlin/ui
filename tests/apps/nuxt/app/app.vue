<script setup lang="ts">
import slugs from "./examples/slugs.json"

onMounted(() => {
  document.documentElement.dataset.hydrated = ""
})
</script>

<template>
  <nav>
    <NuxtLink v-for="slug in slugs" :key="slug" :to="`/${slug}`">
      {{ slug }}
    </NuxtLink>
  </nav>
  <main>
    <NuxtPage />
  </main>
</template>
