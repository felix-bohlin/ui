<script setup lang="ts">
import { useId } from "vue"

defineProps<{
  variant?: "elevated" | "tonal" | "outlined"
}>()

const contentId = useId()
const summaryId = useId()
</script>

<template>
  <details class="card" :class="[variant]">
    <summary :id="summaryId" :aria-controls="contentId">
      <slot name="summary"></slot>
      <slot name="arrow"></slot>
    </summary>
    <div
      :id="contentId"
      class="content"
      role="region"
      :aria-labelledby="summaryId"
    >
      <slot></slot>
    </div>
    <div v-if="$slots.actions" class="actions">
      <slot name="actions"></slot>
    </div>
  </details>
</template>
