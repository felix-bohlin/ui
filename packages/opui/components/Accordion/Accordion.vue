<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { class: className, name, open, variant } = defineProps<Props>()
defineSlots<Slots>()

const summaryId = useId()
const contentId = useId()
</script>

<template>
  <details
    :name="name"
    :class="['ui-accordion', 'ui-card', variant && `ui-${variant}`, className]"
    :open="open"
  >
    <!-- Summary -->
    <summary :id="summaryId" :aria-controls="contentId">
      <slot name="summary"></slot><slot name="marker"></slot>
    </summary>

    <!-- Content -->
    <div
      :id="contentId"
      class="ui-content"
      role="region"
      :aria-labelledby="summaryId"
    >
      <slot></slot>
    </div>

    <!-- Actions -->
    <div v-if="$slots.actions" class="ui-actions">
      <slot name="actions"></slot>
    </div>
  </details>
</template>
