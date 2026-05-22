<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const {
  as,
  label,
  multiline,
  size,
  variant = "tonal",
  href,
} = defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "div")
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-chip',
      {
        'ui-multiline': multiline,
      },
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
    :href="href"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="ui-text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
