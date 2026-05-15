<script setup lang="ts">
import type { Props } from './types'

const {
  as,
  class: className,
  color,
  disabled,
  href,
  size,
  variant,
} = defineProps<Props>()

const Tag = as || (href ? 'a' : 'button')
const isButton = Tag === 'button'
</script>

<template>
  <component
    :is="Tag"
    :class="['button', { disabled: isButton && disabled }, size, variant, color, className]"
    :disabled="isButton ? disabled : undefined"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
