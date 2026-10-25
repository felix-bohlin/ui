<script setup lang="ts">
import type { TableFootProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tfoot :class="$props.class">
    <slot></slot>
  </tfoot>
</template>
