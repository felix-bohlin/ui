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
    <slot></slot>
  </details>
</template>
