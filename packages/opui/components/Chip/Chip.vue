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
      'chip',
      {
        multiline,
      },
      size,
      variant,
      $props.class,
    ]"
    :href="href"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
