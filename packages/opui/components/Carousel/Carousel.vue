<script setup lang="ts">
import { mergeStyle } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  align,
  aspectRatio,
  buttons,
  itemsPerView,
  markers,
  orientation,
  peek,
  persistentButtons,
  stretch,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ul
    :class="[
      'ui-carousel',
      {
        'ui-persistent-buttons': persistentButtons,
        'ui-peek': peek,
        'ui-stretch': stretch,
        'ui-vertical': orientation === 'vertical',
        'ui-markers': markers,
      },
      align && align !== 'start' && `ui-align-${align}`,
      buttons && buttons !== 'inside' && `ui-buttons-${buttons}`,
      $props.class,
    ]"
    :style="
      mergeStyle(
        {
          '--_items-per-view': itemsPerView,
          '--_media-aspect-ratio': aspectRatio,
        },
        {},
      )
    "
  >
    <slot></slot>
  </ul>
</template>
