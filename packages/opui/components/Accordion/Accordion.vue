<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const {
  class: className,
  markerAnimation = "rotate",
  name,
  open,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <details
    :name="name"
    :class="[
      'ui-accordion',
      'ui-card',
      markerAnimation && `ui-marker-${markerAnimation}`,
      variant && `ui-${variant}`,
      className,
    ]"
    :open="open"
  >
    <summary>
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

    <div class="ui-content">
      <slot></slot>
    </div>

    <div v-if="$slots.actions" class="ui-actions">
      <slot name="actions"></slot>
    </div>
  </details>
</template>
