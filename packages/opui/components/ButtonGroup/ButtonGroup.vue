<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { color, orientation, scrollable, shrink, size, variant } =
  defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-button-group',
      {
        'ui-scrollable': scrollable,
        'ui-shrink': shrink,
        'ui-vertical': orientation === 'vertical',
      },
      color && `ui-${color}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'transparent' && `ui-${variant}`,
      $props.class,
    ]"
    role="group"
  >
    <slot></slot>
  </div>
</template>
