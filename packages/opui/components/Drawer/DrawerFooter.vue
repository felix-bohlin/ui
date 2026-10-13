<script setup lang="ts">
import type { DrawerFooterProps, Slots } from "./types.d.vue"

defineProps<DrawerFooterProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['ui-footer', $props.class]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
