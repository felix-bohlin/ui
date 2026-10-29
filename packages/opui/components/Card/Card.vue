<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { density, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-card',
      density && density !== 'normal' && `ui-${density}`,
      variant && variant !== 'plain' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
