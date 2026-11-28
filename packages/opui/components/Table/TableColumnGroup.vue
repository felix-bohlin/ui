<script setup lang="ts">
import type { TableColumnGroupProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <colgroup>
    <slot></slot>
  </colgroup>
</template>
