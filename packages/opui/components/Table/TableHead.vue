<script setup lang="ts">
import type { TableHeadProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <thead>
    <slot></slot>
  </thead>
</template>
