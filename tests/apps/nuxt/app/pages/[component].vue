<script setup lang="ts">
import type { Component } from "vue"

const modules = import.meta.glob<Component>("../examples/*/*.vue", {
  eager: true,
  import: "default",
})

const route = useRoute()
const component = computed(() => String(route.params.component))
const examples = computed(() =>
  Object.entries(modules)
    .map(([path, example]) => {
      const [slug, file] = path.split("/").slice(-2)
      return { example, name: file?.slice(0, -".vue".length), slug }
    })
    .filter(({ slug }) => slug === component.value),
)

if (!examples.value.length) {
  throw createError({ statusCode: 404 })
}
</script>

<template>
  <div
    v-for="{ example, name } in examples"
    :key="name"
    :data-example="`${component}/${name}`"
  >
    <component :is="example" />
  </div>
</template>
