<script setup lang="ts">
import { type Component, onMounted } from "vue"
import slugs from "./examples/slugs.json"

const modules = import.meta.glob<Component>("./examples/*/*.vue", {
  eager: true,
  import: "default",
})

const component = location.pathname.slice(1)
const examples = Object.entries(modules)
  .map(([path, example]) => {
    const [slug, file] = path.split("/").slice(-2)
    return { example, name: file?.slice(0, -".vue".length), slug }
  })
  .filter(({ slug }) => slug === component)

onMounted(() => {
  document.documentElement.dataset.hydrated = ""
})
</script>

<template>
  <nav>
    <a v-for="slug in slugs" :key="slug" :href="`/${slug}`">{{ slug }}</a>
  </nav>
  <main>
    <div
      v-for="{ example, name } in examples"
      :key="name"
      :data-example="`${component}/${name}`"
    >
      <component :is="example" />
    </div>
  </main>
</template>
