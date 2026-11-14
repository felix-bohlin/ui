<script setup lang="ts">
import { counterLabel, cssString, mergeStyle, styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  align,
  aspectRatio,
  buttons,
  itemsPerView,
  markerLabel,
  markers,
  nextLabel,
  orientation,
  peek,
  persistentButtons,
  previousLabel,
  role,
  stretch,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ul
    :class="[
      'ui-carousel',
      {
        'ui-markers': markers,
        'ui-peek': peek,
        'ui-persistent-buttons': persistentButtons,
        'ui-stretch': stretch,
        'ui-vertical': orientation === 'vertical',
      },
      align && align !== 'start' && `ui-align-${align}`,
      buttons && buttons !== 'inside' && `ui-buttons-${buttons}`,
      $props.class,
    ]"
    v-bind="
      styleAttrs(
        mergeStyle(
          {
            '--_button-next-label': nextLabel && cssString(nextLabel),
            '--_button-previous-label':
              previousLabel && cssString(previousLabel),
            '--_items-per-view': itemsPerView,
            '--_marker-label':
              markerLabel && counterLabel(markerLabel, 'ui-carousel-item'),
            '--_media-aspect-ratio': aspectRatio,
          },
          {},
        ),
      )
    "
    :role="role ?? 'list'"
  >
    <slot></slot>
  </ul>
</template>
