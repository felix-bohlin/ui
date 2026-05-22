<script setup lang="ts">
import type { DrawerFooterProps, DrawerFooterSlots } from "./types.d.vue"

defineProps<DrawerFooterProps>()
defineSlots<DrawerFooterSlots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['footer', $props.class]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
