<script setup lang="ts">
import { defineClientComponent } from "vitepress"
defineProps<{
  ids: string[]
}>()

const BaselineStatus = defineClientComponent(() => {
  return import("baseline-status/baseline-status").then((module) => {
    if (!customElements.get("baseline-status")) {
      customElements.define("baseline-status", module.BaselineStatus)
    }
    return "baseline-status"
  })
})
</script>

<template v-if="ids.length">
  <article class="card outlined not-rich-text">
    <component
      v-for="id in ids"
      :key="id"
      :is="BaselineStatus"
      :featureId="id"
    />
  </article>
</template>

<style scoped>
article {
  margin-block: var(--size-3);
}

baseline-status {
  border-radius: 0;
  padding: var(--size-3) var(--size-3);

  &:nth-child(even) {
    background-color: var(--surface-tonal);
  }
}
</style>
