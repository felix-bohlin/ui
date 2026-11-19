<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { color, orientation, overflow, role, size, variant } =
  defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-control-group',
      { 'ui-vertical': orientation === 'vertical' },
      color && `ui-${color}`,
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'transparent' && `ui-${variant}`,
      $props.class,
    ]"
    :role="role ?? 'group'"
  >
    <slot></slot>
  </div>
</template>
