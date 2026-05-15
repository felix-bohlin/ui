<script setup lang="ts">
import type { Props } from './types'

const {
  alt,
  as,
  class: className,
  href,
  isGroup,
  spacing,
  src,
  variant,
} = defineProps<Props>()

const Tag = as || (href ? 'a' : 'div')
</script>

<template>
  <component
    :is="Tag"
    :class="[
      { avatar: !isGroup },
      !isGroup && variant,
      {
        'gap-small': isGroup && spacing === 'small',
        'gap-x-small': isGroup && spacing === 'x-small',
      },
      className,
    ]"
    :href="href"
    :role="isGroup ? 'group' : undefined"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <slot v-else></slot>
  </component>
</template>
