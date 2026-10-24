<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { color, orientation, overflow, size, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-button-group',
      {
        'ui-vertical': orientation === 'vertical',
      },
      color && `ui-${color}`,
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'transparent' && `ui-${variant}`,
      $props.class,
    ]"
    role="group"
  >
    <slot></slot>
  </div>
</template>
