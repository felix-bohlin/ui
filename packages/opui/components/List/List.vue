<script setup lang="ts">
import type { Props } from './types'

const {
  bordered,
  class: className,
  dense,
  gutterless,
  variant,
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <ul
    :class="[
      'list',
      {
        bordered,
        dense,
        gutterless,
      },
      variant,
      className,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </ul>
</template>
