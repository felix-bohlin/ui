<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const {
  as: Tag = "div",
  color,
  density,
  orientation,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-card',
      color && `ui-${color}`,
      density && density !== 'normal' && `ui-${density}`,
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      variant && variant !== 'plain' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </component>
</template>
