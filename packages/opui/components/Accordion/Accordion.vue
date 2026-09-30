<script setup lang="ts">
import { useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  class: className,
  icon = "rotate",
  name,
  open,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()

const summaryId = useId()
const contentId = useId()
</script>

<template>
  <details
    :name="name"
    :class="[
      'ui-accordion',
      'ui-card',
      icon && `ui-icon-${icon}`,
      variant && `ui-${variant}`,
      className,
    ]"
    :open="open"
  >
    <!-- Summary -->
    <summary :id="summaryId" :aria-controls="contentId">
      <slot name="summary"></slot
      ><slot name="marker"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
          ></path></svg
      ></slot>
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
