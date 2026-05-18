<script setup lang="ts">
import type { DrawerFooterProps } from './types'

defineProps<DrawerFooterProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['footer', $props.class]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
