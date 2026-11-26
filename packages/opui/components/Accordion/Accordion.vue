<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { markerAnimation, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <details
    :class="[
      'ui-accordion',
      markerAnimation &&
        markerAnimation !== 'rotate' &&
        `ui-marker-animation-${markerAnimation}`,
      variant && variant !== 'plain' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </details>
</template>
