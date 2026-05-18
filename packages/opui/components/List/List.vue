<script setup lang="ts">
import type { Props } from './types'

const {
  bordered,
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
      $props.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </ul>
</template>
