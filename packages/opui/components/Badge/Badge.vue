<script setup lang="ts">
import type { Props } from './types'
import Anchor from '../Anchor/Anchor.vue'

const {
  alignment,
  class: className,
  color,
  dot,
  invisible,
  label,
} = defineProps<Props>()

const positionArea =
  alignment === 'start-start'
    ? 'start start'
    : alignment === 'end-start'
      ? 'end start'
      : alignment === 'end-end'
        ? 'end end'
        : undefined
</script>

<template>
  <Anchor
    :alignment="positionArea"
    :class="[
      'badge',
      {
        dot,
        invisible,
      },
      alignment,
      className,
      color,
    ]"
  >
    <slot></slot>
    <template #anchored>
      <span class="badge-indicator" :aria-label="label?.toString()">{{ dot ? '' : label }}</span>
    </template>
  </Anchor>
</template>
