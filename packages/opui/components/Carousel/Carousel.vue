<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  buttons = true,
  label,
  markers,
  orientation,
  peek,
  persistentButtons,
  perView,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ul
    :aria-label="label"
    :class="[
      'ui-carousel',
      {
        'ui-buttons-outside': buttons === 'outside',
        'ui-buttons-persistent': persistentButtons,
        'ui-peek': peek,
        'ui-vertical': orientation === 'vertical',
        'ui-with-buttons': buttons,
        'ui-with-markers': markers,
      },
      align && align !== 'start' && `ui-align-${align}`,
      $props.class,
    ]"
    :style="perView ? { '--_per-view': perView } : undefined"
  >
    <slot></slot>
  </ul>
</template>
