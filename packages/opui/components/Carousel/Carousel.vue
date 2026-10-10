<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  aspectRatio,
  buttons = true,
  label,
  markers,
  orientation,
  peek,
  persistentButtons,
  perView,
  stretch,
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
        'ui-stretch': stretch,
        'ui-vertical': orientation === 'vertical',
        'ui-with-buttons': buttons,
        'ui-with-markers': markers,
      },
      align && align !== 'start' && `ui-align-${align}`,
      $props.class,
    ]"
    :style="
      perView || aspectRatio
        ? { '--_per-view': perView, '--_media-aspect-ratio': aspectRatio }
        : undefined
    "
  >
    <slot></slot>
  </ul>
</template>
