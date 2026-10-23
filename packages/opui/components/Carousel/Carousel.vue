<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const {
  align,
  aspectRatio,
  buttons = true,
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
    :class="[
      'ui-carousel',
      {
        'ui-buttons-outside': buttons === 'outside',
        'ui-persistent-buttons': persistentButtons,
        'ui-peek': peek,
        'ui-stretch': stretch,
        'ui-vertical': orientation === 'vertical',
        'ui-buttons': buttons,
        'ui-markers': markers,
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
