<script setup lang="ts">
import type { TableBodyProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tbody>
    <slot></slot>
  </tbody>
</template>
