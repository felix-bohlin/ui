<script setup lang="ts">
import type { Props } from './types'

const {
  as,
  class: className,
  color,
  href,
  size,
  variant,
} = defineProps<Props>()

const Tag = as || (href ? 'a' : 'button')
</script>

<template>
  <component
    :is="Tag"
    :class="['icon-button', size, variant, color, className]"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
