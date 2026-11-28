<script setup lang="ts">
import type { TableRowProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tr>
    <slot></slot>
  </tr>
</template>
