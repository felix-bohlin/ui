<script setup lang="ts">
import type { Props } from './types'

const {
  as,
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
