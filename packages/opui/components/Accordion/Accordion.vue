<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { markerAnimation = "rotate", variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <details
    :class="[
      'ui-accordion',
      'ui-card',
      markerAnimation && `ui-marker-${markerAnimation}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </details>
</template>
