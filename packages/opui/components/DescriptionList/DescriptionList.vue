<script setup lang="ts">
import type { Props } from './types'

const { bordered, class: className } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <dl
    :class="[
      'description-list',
      { bordered: bordered, dotted: bordered === 'dotted' },
      className,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </dl>
</template>
