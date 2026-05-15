<script setup lang="ts">
import type { Props } from './types'

const {
  as,
  class: className,
  label,
  multiline,
  size,
  variant = 'tonal',
  href,
} = defineProps<Props>()

const Tag = as || (href ? 'a' : 'div')
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
      className,
    ]"
    :href="href"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
