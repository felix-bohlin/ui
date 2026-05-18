<script setup lang="ts">
import type { DrawerFooterProps } from './types'

const { class: className } = defineProps<DrawerFooterProps>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['footer', className]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
