<script setup lang="ts">
import type { TableFootProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tfoot>
    <slot></slot>
  </tfoot>
</template>
