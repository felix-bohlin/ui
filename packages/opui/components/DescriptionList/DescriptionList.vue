<script setup lang="ts">
import type { Props } from './types'

const { bordered } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <dl
    :class="[
      'description-list',
      { bordered: bordered, dotted: bordered === 'dotted' },
      $props.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </dl>
</template>
