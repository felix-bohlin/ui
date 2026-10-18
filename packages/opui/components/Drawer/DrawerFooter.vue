<script setup lang="ts">
import type { DrawerFooterProps, Slots } from "./types.d.vue"

defineProps<DrawerFooterProps>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-footer', $props.class]">
    <slot></slot>
  </div>
</template>
