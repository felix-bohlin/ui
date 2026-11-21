<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <meter
    :class="[
      'ui-meter',
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </meter>
</template>
